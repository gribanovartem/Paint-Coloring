function SliderModel() {
    var myView = null;
    var mySrc = null;
    this.imgArr = null;
    var initialPoint = null;
    var finalPoint = null;
    this.start = function (view, arr) {
        myView = view;
        this.imgArr = arr;
    };
    this.updateView = function (EO) {
        if (myView)
            myView.update(EO);
    };
    this.updateViewSlideStart = function (EO) {
        initialPoint = EO.changedTouches[0];
    };
    this.updateViewSlideEnd = function (EO) {
        finalPoint = EO.changedTouches[0];
        myView.updateSlide(initialPoint, finalPoint);
    };
    this.updatePage = function (EO) {
        if (EO.target.src) {
            selectImg = EO.target.src;
            var key = getImgName(EO.target.src);
            imgStorage.addValue(key,EO.target.src);
            switchToPaintImgPage(key);
        }
    };
}
function SliderView() {
    var myModel = null;
    var myField = null;
    var mainElement = null, // основный элемент блока
        sliderWrapper = null, // обертка для .slider-item
        sliderItems = null, // элементы (.slider-item)
        sliderControls = null, // элементы управления
        sliderControlLeft = null, // кнопка "LEFT"
        sliderControlRight = null, // кнопка "RIGHT"
        wrapperWidth = null, // ширина обёртки
        itemWidth = null, // ширина одного элемента    
        positionLeftItem = null, // позиция левого активного элемента
        transform = null, // значение транфсофрмации .slider_wrapper
        step = null, // величина шага (для трансформации)
        items = null, // массив элементов
        interval = null,
        html = null;
    this.start = function (model, field, slider) {
        myModel = model;
        myField = field;
        var self = this;
        var sliderWidth = slider.offsetWidth;
        var sliderHeight = slider.offsetHeight;
        for (let i = 0; i < myModel.imgArr.length; i++) {
            let slideItem = document.createElement('div');
            slideItem.classList.add('slider__item');
            myField.appendChild(slideItem);
            let img = document.createElement('img');
            img.src = myModel.imgArr[i];
            img.addEventListener('load', drawImg, false);
            function drawImg(EO) {
                var prop = EO.target.height / EO.target.width;
                if (sliderWidth > sliderHeight) {
                    EO.target.height = sliderHeight;
                    EO.target.width = EO.target.height / prop;
                } else {
                    EO.target.width = sliderWidth;
                    EO.target.height = EO.target.width * prop;
                }
                slideItem.appendChild(img);
            }
        }
        mainElement = document.getElementById('Slider'); // основный элемент блока
        sliderWrapper = mainElement.querySelector('.slider__wrapper'); // обертка для .slider-item
        sliderItems = mainElement.querySelectorAll('.slider__item'); // элементы (.slider-item)
        sliderControls = mainElement.querySelectorAll('.slider__control'); // элементы управления
        sliderControlLeft = mainElement.querySelector('.slider__control_left'); // кнопка "LEFT"
        sliderControlRight = mainElement.querySelector('.slider__control_right'); // кнопка "RIGHT"
        wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width); // ширина обёртки
        itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width); // ширина одного элемента    
        positionLeftItem = 0; // позиция левого активного элемента
        transform = 0; // значение транфсофрмации .slider_wrapper
        step = itemWidth / wrapperWidth * 100; // величина шага (для трансформации)
        items = []; // массив элементов
        interval = 0;
        html = mainElement.innerHTML;
        sliderItems.forEach(function (item, index) {
            items.push({ item: item, position: index, transform: 0 });
        });
    };
    this.update = function (EO) {
        if (EO.target.classList.contains('slider__control')) {
            EO.preventDefault();
            var direction = EO.target.classList.contains('slider__control_right') ? 'right' : 'left';
            self.transformItem(direction);
        }
    };
    self.position = {
        getItemMin: function () {
            var indexItem = 0;
            items.forEach(function (item, index) {
                if (item.position < items[indexItem].position) {
                    indexItem = index;
                }
            });
            return indexItem;
        },
        getItemMax: function () {
            var indexItem = 0;
            items.forEach(function (item, index) {
                if (item.position > items[indexItem].position) {
                    indexItem = index;
                }
            });
            return indexItem;
        },
        getMin: function () {
            return items[position.getItemMin()].position;
        },
        getMax: function () {
            return items[position.getItemMax()].position;
        }
    };
    self.transformItem = function (direction) {
        var nextItem;
        if (direction === 'right') {
            positionLeftItem++;
            if ((positionLeftItem + wrapperWidth / itemWidth - 1) > self.position.getMax()) {
                nextItem = position.getItemMin();
                items[nextItem].position = position.getMax() + 1;
                items[nextItem].transform += items.length * 100;
                items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%) translateZ(0)';
            }
            transform -= step;
        }
        if (direction === 'left') {
            positionLeftItem--;
            if (positionLeftItem < position.getMin()) {
                nextItem = position.getItemMax();
                items[nextItem].position = position.getMin() - 1;
                items[nextItem].transform -= items.length * 100;
                items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%) translateZ(0)';
            }
            transform += step;
        }
        sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    };
    this.updateSlide = function (initialPoint, finalPoint) {
        var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
        var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
        if (xAbs > 20 || yAbs > 20) {
            if (xAbs > yAbs) {
                if (finalPoint.pageX < initialPoint.pageX) {
                    self.transformItem('right');
                }
                else {
                    self.transformItem('left');
                }
            }
        }
    };
}
function SliderController() {
    var myModel = null;
    var mainElement = null;
    this.start = function (model, field) {
        myModel = model;
        mainElement = field;
        var controlButtons = document.getElementsByClassName('slider__control');
        controlButtons[0].addEventListener('click', myModel.updateView, false);
        controlButtons[1].addEventListener('click', myModel.updateView, false);
        mainElement.addEventListener('touchstart', myModel.updateViewSlideStart, false);
        mainElement.addEventListener('touchend', myModel.updateViewSlideEnd, false);
        mainElement.addEventListener('click', myModel.updatePage, false);
    };
}