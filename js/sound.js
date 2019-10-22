function SoundModel() {
    var self = this;
    var myView = null;
    var mySrc = null;
    this.sound = null;
    this.start = function(view,src) {
        myView = view;
        mySrc = src;
    };
    this.updateView=function() {
        if ( myView )
        myView.update(mySrc);
    };
    this.play = function() {
        self.sound.cloneNode(true).play();
    };

}
function SoundView() {
    var myModel = null;
    this.start = function(model) {
        myModel = model;
        myModel.updateView();
    };
    this.update = function(src) {
        myModel.sound = new Audio();
        myModel.sound.src = src;
    };
}
function SoundController() {
    var myModel = null;
    var myField = null;
    this.start = function(model, field) {
        myModel = model;
        myField = field;
        for(let i=0; i<myField.length; i++) {
            myField[i].addEventListener('click', myModel.play, false);
        }
    };
}