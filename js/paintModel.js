function PaintModel() {
    var myView = null;
    
    this.currentBrush = {
        color: '#000000',
        radius: 5,
        coloring: false,
        opacity: 1
      };
    
    this.start = function(view) {
      myView = view;
      this.currentBrush = {
        color: '#000000',
        radius: 5,
        coloring: false,
        opacity: 1
      };
    };
    this.updateColor = function(color) {
      this.currentBrush.color = color;
    };
    this.updateBrush = function(state) {
      this.currentBrush.coloring = state;
    };
    this.updateRadius = function(radius) {
      this.currentBrush.radius = radius;
    };
    this.brushBegin = function (CoordsH) {
      myView.brushBegin(CoordsH);
    };
    this.brushEnd = function (CoordsH) {
      myView.brushEnd(CoordsH);
    };
    this.brushMove = function (CoordsH) {
      myView.brushMove(CoordsH);
    };
    this.coloring = function(CoordsH) {
      myView.coloring(CoordsH);
    };
}