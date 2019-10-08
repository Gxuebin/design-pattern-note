// 适配器模式
class Adaptee {
    do() {
        return '原始插头';
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee();
    }
    do() {
        const info = this.adaptee.do();
        return `可用插头（转换${info}）`
    }
}

const target = new Target();
console.log(target.do());