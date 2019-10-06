let Singleton = (function () {
    let instance
    return function (name) {
        if (!instance) {
            this.name = name;
            return instance = this;
        }
        return instance;
    }
})();

Singleton.prototype.show = function () {
    console.log(this.name);
}

// 实例
let s3 = new Singleton('展示3');
s3.show();
let s4 = new Singleton('展示4');
s4.show();
console.log(s3 === s4); // false