function PaintController() {
    var myModel = null;
    var myField = null;
    var self = this;
    var DrawCanvas = null;
    this.start = function (model, field) {
        myModel = model;
        myField = field;
        //Добавляем обработчики событий для панелей
        var allBrushes = document.getElementsByClassName('brush');
        var brushControl = document.getElementsByClassName('brushElem')[0];
        var coloringControl = document.getElementsByClassName('coloring')[0];
        var bottomPanel = document.getElementsByClassName('bottomPanel')[0];
        var rightPanel = document.getElementsByClassName('rightPanel')[0];
        var radiusControl = document.getElementById('InputId');
        for (let i = 0; i < allBrushes.length; i++) {
            allBrushes[i].addEventListener('click', changeColor, false);
        }
        brushControl.addEventListener('click', changeControlToBrush, false);
        coloringControl.addEventListener('click', changeControlToColoring, false);
        radiusControl.addEventListener('mouseup', changeRadius, false);
        radiusControl.addEventListener('touchend', changeRadius, false);
        function changeColor(EO) {
            let elemDeleteClass = bottomPanel.getElementsByClassName('selected');
            if (elemDeleteClass[0]) {
                elemDeleteClass[0].classList.remove('selected');
            }
            let Elem = EO.target;
            let elemColor = Elem.getAttribute('data-color');
            Elem.classList.add('selected');
            myModel.updateColor(elemColor);
            if ("vibrate" in navigator) {
                window.navigator.vibrate(100);
            }
        }
        function changeControlToBrush(EO) {
            let Elem = EO.target;
            let elemDeleteClass = rightPanel.getElementsByClassName('selected');
            if (elemDeleteClass[0]) {
                elemDeleteClass[0].classList.remove('selected');
            }
            Elem.classList.add('selected');
            myModel.updateBrush(false);
            DrawCanvas.removeEventListener('click', Coloring, false);
            DrawCanvas.addEventListener('mousedown', BrushMouseBegin, false);
            container.addEventListener('mouseup', BrushMouseEnd, false);
            DrawCanvas.addEventListener('touchstart', BrushTouchBegin, false);
            DrawCanvas.addEventListener('touchend', BrushTouchEnd, false);
            if ("vibrate" in navigator) {
                window.navigator.vibrate(100);
            }
        }
        function changeControlToColoring(EO) {
            let Elem = EO.target;
            let elemDeleteClass = rightPanel.getElementsByClassName('selected');
            if (elemDeleteClass[0]) {
                elemDeleteClass[0].classList.remove('selected');
            }
            Elem.classList.add('selected');
            myModel.updateBrush(true);
            removeEventToBrush();
            addEventToColoring();
            if ("vibrate" in navigator) {
                window.navigator.vibrate(100);
            }
        }
        function changeRadius(EO) {
            let Elem = EO.target;
            let value = +Elem.value;
            myModel.updateRadius(value);
        }
        function EventToDrawCoords(CoordsH) {
            var PercX = (CoordsH.X - DrawCanvas.offsetLeft - DrawCanvas.offsetParent.offsetLeft) / DrawCanvas.offsetWidth;
            var PercY = (CoordsH.Y - DrawCanvas.offsetTop - DrawCanvas.offsetParent.offsetTop) / DrawCanvas.offsetHeight;
            var DrawX = DrawCanvas.width * PercX;
            var DrawY = DrawCanvas.height * PercY;
            return { X: DrawX, Y: DrawY };
        }
    
    //Добавляем обработчики событий для холста для рисования
    DrawCanvas = document.getElementById('Canvas');
    var container = document.getElementsByClassName('container')[0];
    DrawCanvas.addEventListener('mousedown', BrushMouseBegin, false);
    container.addEventListener('mouseup', BrushMouseEnd, false);
    function BrushMouseBegin(EO) {
        EO.preventDefault();
        var DrawCoordsH = EventToDrawCoords({ X: EO.pageX, Y: EO.pageY });
        DrawCanvas.addEventListener('mousemove', BrushMouseMove, false);
        myModel.brushBegin(DrawCoordsH);
        ToBrushSoundModel.play();
    }
    function BrushMouseMove(EO) {
        EO.preventDefault();
        var DrawCoordsH = EventToDrawCoords({ X: EO.pageX, Y: EO.pageY });
        myModel.brushMove(DrawCoordsH);
    }
    function BrushMouseEnd(EO) {
        EO.preventDefault();
        var DrawCoordsH = EventToDrawCoords({ X: EO.pageX, Y: EO.pageY });
        myModel.brushEnd(DrawCoordsH);

        DrawCanvas.removeEventListener('mousemove', BrushMouseMove, false);
    }
    //Добавляем тач-обработчики событий для холста ждя рисования
    DrawCanvas.addEventListener('touchstart', BrushTouchBegin, false);
    DrawCanvas.addEventListener('touchend', BrushTouchEnd, false);
    function BrushTouchBegin(EO) {
        EO.preventDefault();
        var Touch = EO.changedTouches[0];
        var DrawCoordsH = EventToDrawCoords({ X: Touch.pageX, Y: Touch.pageY });
        myModel.brushBegin(DrawCoordsH);
        ToBrushSoundModel.play();
        DrawCanvas.addEventListener('touchmove', BrushTouchMove, false);
    }
    function BrushTouchMove(EO) {
        EO.preventDefault();
        var Touch = EO.changedTouches[0];
        var DrawCoordsH = EventToDrawCoords({ X: Touch.pageX, Y: Touch.pageY });
        myModel.brushMove(DrawCoordsH);
    }
    function BrushTouchEnd(EO) {
        EO.preventDefault();
        var Touch = EO.changedTouches[0];
        var DrawCoordsH = EventToDrawCoords({ X: Touch.pageX, Y: Touch.pageY });
        myModel.brushEnd(DrawCoordsH);
        DrawCanvas.removeEventListener('touchmove', BrushTouchMove, false);
    }
    function addEventToColoring() {
        DrawCanvas.addEventListener('click', Coloring, false);
    }
    function Coloring(EO) {
        EO.preventDefault();
        var DrawCoordsH = EventToDrawCoords({ X: EO.pageX, Y: EO.pageY });
        myModel.coloring(DrawCoordsH);
        ColoringSoundModel.play();
        if ("vibrate" in navigator) {
            window.navigator.vibrate(100);
        }
    }
    function removeEventToBrush () {
        DrawCanvas.removeEventListener('mousedown', BrushMouseBegin, false);
        container.removeEventListener('mouseup', BrushMouseEnd, false);
        DrawCanvas.removeEventListener('touchstart', BrushTouchBegin, false);
        DrawCanvas.removeEventListener('touchend', BrushTouchEnd, false);
    };
    };
}

