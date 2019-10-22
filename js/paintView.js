function PaintView() {
    var myModel = null;
    var myField = null;
    var DrawContext = null;
    var DrawCanvas = null;
    var DrawBackCanvas = null;
    var DrawBackContext = null;
    var DrawCanvasWidth = null;
    var DrawCanvasHeight = null;

    this.start = function (model, field) {
        myModel = model;
        myField = field;
        DrawCanvas = field;
        DrawCanvasWidth = DrawCanvas.offsetWidth;
        DrawCanvasHeight = DrawCanvas.offsetHeight;
        DrawCanvas.width = DrawCanvasWidth;
        DrawCanvas.height = DrawCanvasHeight;
        DrawContext = DrawCanvas.getContext('2d');
        DrawCanvas = document.getElementById('Canvas');
        DrawContext = DrawCanvas.getContext('2d');
        DrawBackCanvas = document.getElementById('Canvas1');
        DrawBackCanvas.width = DrawCanvas.width;
        DrawBackCanvas.height = DrawCanvas.height;
        DrawBackContext = DrawBackCanvas.getContext('2d');
    };
    this.brushBegin = function (CoordsH) {
        DrawContext.lineCap = 'round';
        DrawContext.lineJoin = 'round';
        DrawContext.lineWidth = myModel.currentBrush.radius * 2;
        DrawContext.strokeStyle = myModel.currentBrush.color;
        DrawContext.beginPath();
        DrawContext.moveTo(CoordsH.X, CoordsH.Y);
        DrawContext.lineTo(CoordsH.X + 0.001, CoordsH.Y);
        DrawContext.stroke();
    };
    this.brushEnd = function (CoordsH) {
        DrawContext.stroke();
        // DrawBackContext.drawImage(DrawCanvas, 0, 0);
        // DrawBackContext.globalAlpha = 1;
        // DrawContext.globalCompositeOperation = 'destination-out';
        // DrawContext.fillStyle = "rgba(0,0,0,1)";
        // DrawContext.fillRect(0, 0, DrawCanvas.width, DrawCanvas.height);
        // DrawContext.globalCompositeOperation = 'source-over';
    };
    this.brushMove = function (CoordsH) {
        DrawContext.lineTo(CoordsH.X, CoordsH.Y);
        DrawContext.stroke();
    };
    this.coloring = function (CoordsH) {
        // DrawCanvas = document.getElementById('Canvas');
        // DrawContext = DrawCanvas.getContext('2d');
        console.time();
        var x = CoordsH.X;
        var y = CoordsH.Y;
        var imageData = DrawContext.getImageData(0, 0, DrawCanvasWidth, DrawCanvasHeight);
        var width = imageData.width;
        var height = imageData.height;
        var stack = [[x, y]];
        var pixel;
        var point = 0;
        var firstPixel = DrawContext.getImageData(x, y, 1, 1).data;
        var paintColor = hex2rgb(myModel.currentBrush.color, myModel.currentBrush.opacity);
        if (paintColor[0] !== firstPixel[0] || paintColor[1] !== firstPixel[1] || paintColor[2] !== firstPixel[2]) {
            while (stack.length > 0) {
                //извлекаем последний элемент массива(из массива его удаляем)
                pixel = stack.pop();
                if (pixel[0] < 0 || pixel[0] >= width)
                    continue;
                if (pixel[1] < 0 || pixel[1] >= height)
                    continue;
                // Alpha
                point = pixel[1] * 4 * width + pixel[0] * 4;

                // Если это не рамка и ещё не закрасили
                if (imageData.data[point] == firstPixel[0] && imageData.data[point + 1] == firstPixel[1] && imageData.data[point + 2] == firstPixel[2] && imageData.data[point + 3] == firstPixel[3]) {

                    // Закрашиваем

                    imageData.data[point] = paintColor[0];
                    imageData.data[point + 1] = paintColor[1];
                    imageData.data[point + 2] = paintColor[2];
                    imageData.data[point + 3] = paintColor[3];
                    // Ставим соседей в стек на проверку
                    stack.push([
                        pixel[0] - 1,
                        pixel[1]
                    ]);
                    stack.push([
                        pixel[0] + 1,
                        pixel[1]
                    ]);
                    stack.push([
                        pixel[0],
                        pixel[1] - 1
                    ]);
                    stack.push([
                        pixel[0],
                        pixel[1] + 1
                    ]);
                }
            }
            DrawContext.putImageData(imageData, 0, 0);
            console.timeEnd();
        }
    };
    function hex2rgb(hex, opacity) {
        var h = hex.replace('#', '');
        h = h.match(new RegExp('(.{' + h.length / 3 + '})', 'g'));
        for (var i = 0; i < h.length; i++)
            h[i] = parseInt(h[i].length == 1 ? h[i] + h[i] : h[i], 16);
        if (typeof opacity != 'undefined') h.push(opacity * 255);
        return h;
    }

}