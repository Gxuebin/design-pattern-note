class Singleton {
    constructor(name) {
        this.name = name;
        this.instance = null;
    }
    show() {
        console.log(this.name);
    }
}

Singleton.getInstance = function (name) {
    if (this.instance) {
        return this.instance;
    }
    return this.instance = new Singleton(name);
}

// 实例
// 只能使用静态函数 getInstance，不能使用 new Singleton()，但是只能文档约束
let s1 = Singleton.getInstance('展示1');
s1.show();
let s2 = Singleton.getInstance('展示2');
s2.show();
console.log(s1 === s2); // true


let s3 = new Singleton('展示3');
s3.show();
let s4 = new Singleton('展示4');
s4.show();
console.log(s3 === s4); // false