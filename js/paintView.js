function PaintView() {
    var myModel = null; 
    var myField = null;
    var DrawContext = null;
    var DrawCanvas = null;
    this.start=function(model,field) {
        myModel=model;
        myField = field;
        DrawCanvas=field;
        DrawCanvas.width = DrawCanvas.offsetWidth;
        DrawCanvas.height = DrawCanvas.offsetHeight;
        DrawContext = DrawCanvas.getContext('2d');

    };
    this.brushBegin = function(CoordsH) {
        console.log(myModel.currentBrush);
        DrawContext.lineCap = 'round';
        DrawContext.lineJoin = 'round';
        DrawContext.lineWidth = myModel.currentBrush.radius * 2;
        DrawContext.strokeStyle = myModel.currentBrush.color;
        DrawContext.beginPath();
        DrawContext.moveTo(CoordsH.X, CoordsH.Y);
        DrawContext.lineTo(CoordsH.X + 0.001, CoordsH.Y);
        DrawContext.stroke();
    };
    this.brushEnd = function(CoordsH) {
        DrawContext.stroke();
    };
    this.brushMove = function(CoordsH) {
        DrawContext.lineTo(CoordsH.X, CoordsH.Y);
        DrawContext.stroke();
    };

}