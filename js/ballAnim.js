function BallAnim() {
    var myView = null;
    this.start = function(view) {
        myView = view;
        requestAnimationFrame( ()=> { 
            this.updateView(); });
    };
    this.updateView=function() {
        if ( myView )
        myView.update();
    };

}
function BallView() {
    var myModel = null;
    var myImg = null;
    var count =0;
    var operator = '+' ;
    this.start = function(model, img) {
        myModel = model;
        myImg = img;
    };
    this.update = function() {
        myImg.style.transformOrigin = '50% 100%';
        myImg.style.transform = 'rotate(' + count + 'deg) translateZ(0)';
        if(operator =='+') {
            count += 0.1;
        }
        if(operator =='-') {
            count -= 0.1;
        }
        if(count>30) {
            operator = '-';
        } 
        if(count<-30) {
            operator = '+';
        }
        requestAnimationFrame( ()=> { 
            this.update(); });
    };
}
var ball1 = new BallAnim();
var ball2 = new BallAnim();
var ballView1 = new BallView();
var ballView2 = new BallView();
var ballImg1 = document.getElementById('ball1');
var ballImg2 = document.getElementById('ball2');
ball1.start(ballView1);
ballView1.start(ball1, ballImg1);
ball2.start(ballView2);
ballView2.start(ball2, ballImg2);