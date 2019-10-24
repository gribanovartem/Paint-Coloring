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
var imgStorage = new LocStorage('img');
function toClean() {
    var URLHash = window.location.hash;
    var containerElem = document.getElementById('Canvas');
    if (URLHash === '#Paint') {
        paintView.start(paint, containerElem);
    } else {
        paintView.start(paint, containerElem, selectImg);
    }
}
function getImgName(src) {
    return src.split('\\').pop().split('/').pop();
}
function savePicture() {
    unsaved = false;
    var text = document.getElementsByClassName('text')[0];
    if (text.value) {
        var canvas = document.getElementById('Canvas');
        var dataURL = canvas.toDataURL("image/jpeg");
        var link = document.createElement("a");
        document.body.appendChild(link); // Firefox requires the link to be in the body :(
        link.href = dataURL;
        link.download = text.value + ".jpg";
        link.click();
        document.body.removeChild(link);
        
    } else {
        alert('Введите имя файла');
    }
    setInVisible();
}
function setVisible() {
    document.getElementsByClassName('saveWindow')[0].style.top = '15%';
    document.getElementsByClassName('bgLayer')[0].style.display = 'block';
}
function setInVisible() {
    document.getElementsByClassName('saveWindow')[0].style.top = '-999px';
    document.getElementsByClassName('bgLayer')[0].style.display = 'none';
}
function unloadPage(){ 
    if(unsaved){
        console.log('sadg');
        return ("У вас имеются несохраненные данные, вы уверены что хотите уйти?");
    }
}