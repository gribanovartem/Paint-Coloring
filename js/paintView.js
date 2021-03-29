function PaintView() {
    var myModel = null;
    var myField = null;
    var DrawContext = null;
    var DrawCanvas = null;
    var DrawCanvasWidth = null;
    var DrawCanvasHeight = null;
    var stepArr = [];
    var step = 0;
    var toggle = false;
    var coloringPoint = null;

    this.start = function (model, field, src) {
        myModel = model;
        myField = field;
        stepArr = [];

        step = 0;
        DrawCanvas = field;
        DrawCanvasWidth = DrawCanvas.offsetWidth;
        DrawCanvasHeight = DrawCanvas.offsetHeight;
        DrawCanvas.width = DrawCanvasWidth;
        DrawCanvas.height = DrawCanvasHeight;
        // DrawCanvas = document.getElementById('Canvas');
        DrawContext = DrawCanvas.getContext('2d');
        DrawContext.fillStyle = "rgba(255,255,255,255)";
        DrawContext.fillRect(0, 0, DrawCanvasWidth, DrawCanvasHeight);
        if (src) {

            var img = document.createElement('img');
            img.src = src;
            DrawCanvas.classList.remove('canv');
            DrawCanvas.classList.add('canv1');
            img.addEventListener('load', drawImg, false);
            function drawImg() {
                var prop = img.height / img.width;
                var can = document.getElementsByClassName('canvas');
                if (can[0].offsetWidth > can[0].offsetHeight) {
                    img.height = can[0].offsetHeight;
                    img.width = img.height / prop;
                } else {
                    img.width = can[0].offsetWidth;
                    img.height = img.width * prop;
                }
                DrawContext.drawImage(img, can[0].offsetWidth / 2 - img.width / 2, can[0].offsetHeight / 2 - img.height / 2, img.width, img.height);
            }
        }
        stepArr.push(DrawContext.getImageData(0, 0, DrawCanvasWidth, DrawCanvasHeight));
    };
    this.brushBegin = function (CoordsH) {
        unsaved = true;
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
        if (CoordsH.X < DrawCanvasWidth && CoordsH.X > 0 && CoordsH.Y < DrawCanvasHeight && CoordsH.Y > 0) {
            stepArr.push(DrawContext.getImageData(0, 0, DrawCanvasWidth, DrawCanvasHeight));
            step++;
        }
    };
    this.brushMove = function (CoordsH) {
        DrawContext.lineTo(CoordsH.X, CoordsH.Y);
        DrawContext.stroke();
    };
    this.coloring = function (CoordsH) {
        unsaved = true;
        var x = CoordsH.X;
        var y = CoordsH.Y;
        DrawCanvas = document.getElementById('Canvas');
        DrawContext = DrawCanvas.getContext('2d');
        var imageData = DrawContext.getImageData(0, 0, DrawCanvasWidth, DrawCanvasHeight);
        var width = imageData.width;
        var height = imageData.height;
        coloringPoint = {};
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
                point = Math.round(pixel[1] * 4 * width + pixel[0] * 4);
                if (imageData.data[point] == imageData.data[point + 1] && imageData.data[point + 1] == imageData.data[point + 2] && imageData.data[point] < 100) {
                    continue;
                }
                if(String(imageData.data[point])+String(imageData.data[point + 1])+String(imageData.data[point + 2]) in coloringPoint) {
                    continue;
                }
                // Если это не рамка и ещё не закрасили
                if (imageData.data[point] == firstPixel[0] && imageData.data[point + 1] == firstPixel[1] && imageData.data[point + 2] == firstPixel[2]) {
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
                if (antialiasing) {
                    if (imageData.data[point] !== paintColor[0] && imageData.data[point + 1] !== paintColor[1] && imageData.data[point + 2] !== paintColor[2]) {
                        var percent = imageData.data[point] / 255;
                        var percent2 = imageData.data[point+1] / 255;
                        var percent3 = imageData.data[point+2] / 255;
                        var percent1 = 1 - percent;
                        imageData.data[point] = Math.round(paintColor[0] * percent + 0 * percent1);
                        imageData.data[point + 1] = Math.round(paintColor[1] * percent2 + 0 * percent1);
                        imageData.data[point + 2] = Math.round(paintColor[2] * percent3 + 0 * percent1);
                        coloringPoint[String(imageData.data[point])+String(imageData.data[point + 1])+String(imageData.data[point + 2])] = true;
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
            }
            DrawContext.putImageData(imageData, 0, 0);
            coloringPoint = null;
            stepArr.push(DrawContext.getImageData(0, 0, DrawCanvasWidth, DrawCanvasHeight));
            step++;
        }

    };
    this.prevStep = function () {
        if (toggle && step != stepArr.length - 1) step--;
        toggle = false;
        if (step > 1) {
            step--;
            DrawContext.putImageData(stepArr[step], 0, 0);

        } else if (step === 1) {
            DrawContext.putImageData(stepArr[step - 1], 0, 0);
            step--;
        }
    };
    this.nextStep = function () {
        if (!toggle) step++;
        toggle = true;
        if (step === 1) {
            DrawContext.putImageData(stepArr[step], 0, 0);
            step++;
        }
        else {
            DrawContext.putImageData(stepArr[step], 0, 0);
            step++;
            if (step == stepArr.length) {
                step--;
            }
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