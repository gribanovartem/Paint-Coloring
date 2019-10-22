function PaintModel() {
    var myView = null;
    
    this.currentBrush = {
        color: '#000000',
        radius: 8,
        coloring: false
      };
    
    this.start = function(view) {
      myView = view;
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
}