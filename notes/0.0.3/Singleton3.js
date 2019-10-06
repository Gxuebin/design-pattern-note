let SingletonProxy = (function () {
    let instance
    function main(name) {
        if (!instance) {
            return instance = new Singleton(name);
        }
        return instance;
    }
    return main
})();

let Singleton = function (name) {
    this.name = name;
}
Singleton.prototype.show = function () {
    console.log(this.name);
}

// 实例
const p1 = new SingletonProxy('代理1');
p1.show(); // 代理1
const p2 = new SingletonProxy('代理2');
p2.show(); // 代理1
console.log(p1 === p2); // true