var ColoringSoundModel = new SoundModel();
var ColoringSoundView = new SoundView();
var ToBrushSoundModel = new SoundModel();
var ToBrushgSoundView = new SoundView();
var paint = new PaintModel();
var paintView = new PaintView();
var paintController = new PaintController();
var BrushSoundModel = new SoundModel();
var BrushSoundView = new SoundView();
var BrushSoundController = new SoundController();
var MenuSoundModel = new SoundModel();
var MenuSoundView = new SoundView();
var MenuSoundController = new SoundController();
var sliderModel = new SliderModel();
var sliderView = new SliderView();
var sliderController = new SliderController();
function toClean() {
    var URLHash=window.location.hash;
    console.log(URLHash);
    var containerElem = document.getElementById('Canvas');
    if(URLHash === '#Paint') {
        paintView.start(paint, containerElem);
    } else {
        paintView.start(paint, containerElem,selectImg);
    }
}