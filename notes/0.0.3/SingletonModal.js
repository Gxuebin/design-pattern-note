class Modal {
    constructor() {
        this.display = 'hide';
    }
    show() {
        if (this.display === 'show') {
            console.log('不可重复展示');
            return
        }
        this.display = 'show';
        console.log('成功展示');
    }
    hide() {
        if (this.display === 'hide') {
            console.log('不可重复隐藏');
            return
        }
        this.display = 'hide';
        console.log('成功隐藏');
    }
}

Modal.getInstance = (function () {
    let instance = null
    return function () {
        if (instance === null) {
            instance = new Modal();
        }
        return instance;
    }
})();

// 实例
let m1 = Modal.getInstance();
let m2 = Modal.getInstance();
m1.show();
m2.show();

m1.hide();
m2.hide();
console.log(m1 === m2);