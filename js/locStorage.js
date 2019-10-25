function LocStorage(name) {
    var self = this;
    self.storage = {};
    self.storage.name = [];
    // if (localStorage.getItem(name)) {
    //     self.storage.name = JSON.parse(localStorage.getItem(name));
    // }
    self.addValue = function (key, value) {
        console.log('ghsh');
        
        self.storage.name.push({ [key]: value });
        localStorage.setItem(name, JSON.stringify(self.storage.name));
    };
    self.getValue = function (key) {
        let arr = JSON.parse(localStorage.getItem(name));
        for (let i = 0; i < arr.length; i++) {
            if (key in arr[i]) {
                return arr[i][key];
            }
        }
    };
}
