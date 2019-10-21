function PaintController() {
    var myModel = null;
    var myField = null;
    this.start = function(model,field) {
        myModel=model;
        myField=field;
        //Добавляем обработчики событий
        var allBrushes = document.getElementsByClassName('brush');
        var brushControl = document.getElementsByClassName('brushElem')[0];
        var coloringControl = document.getElementsByClassName('coloring')[0];
        var bottomPanel = document.getElementsByClassName('bottomPanel')[0];
        var rightPanel = document.getElementsByClassName('rightPanel')[0];
        var radiusControl = document.getElementById('InputId');
        for(let i=0; i<allBrushes.length; i++) {
            allBrushes[i].addEventListener('click', changeColor);
        }
        brushControl.addEventListener('click', changeControlToBrush);
        coloringControl.addEventListener('click', changeControlToColoring);
        radiusControl.addEventListener('mouseup', changeRadius);

        function changeColor(EO) {
            let elemDeleteClass = bottomPanel.getElementsByClassName('selected');
            if(elemDeleteClass[0]) {
                elemDeleteClass[0].classList.remove('selected');
            }
            let Elem = EO.target;
            let elemColor = Elem.getAttribute('data-color');
            Elem.classList.add('selected');
            myModel.updateColor(elemColor);
        }
        function changeControlToBrush(EO) {
            let Elem = EO.target;
            let elemDeleteClass = rightPanel.getElementsByClassName('selected');
            if(elemDeleteClass[0]) {
                elemDeleteClass[0].classList.remove('selected');
            }
            Elem.classList.add('selected');
            myModel.updateBrush(false);
        }
        function changeControlToColoring(EO) {
            let Elem = EO.target;
            let elemDeleteClass = rightPanel.getElementsByClassName('selected');
            if(elemDeleteClass[0]) {
                elemDeleteClass[0].classList.remove('selected');
            }
            Elem.classList.add('selected');
            myModel.updateBrush(true);
        }
        function changeRadius(EO) {
            let Elem = EO.target;
            let value = Elem.value;
            myModel.updateRadius(value);
        }
    };
}