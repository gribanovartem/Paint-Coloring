function PaintModel() {
    this.currentBrush = {
        color: '#000000',
        radius: 8,
        coloring: false
      };
    
    this.start = function(view) {

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
}