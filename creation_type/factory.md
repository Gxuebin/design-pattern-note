# 为什么使用工厂模式

解答问题前，了解什么是工厂模式我觉得更重要些。
工厂模式其实也称创建模式，是用于创建对象的一种方式。可以说就是用来代替 new 实例化对象，决定了实例化哪一个类，从而解决解耦问题。

举个例子：
- 编程中，在一个 A 类中通过 new 的方式实例化了类 B，那么 A 类和 B 类之间就存在关联（耦合）;
- 后期因为需要修改了 B 类的代码和使用方式，比如构造函数中传入参数，那么 A 类也要跟着修改，一个类的依赖可能影响不大，但若有多个类依赖了 B 类，那么这个工作量将会相当的大，容易出现修改错误，也会产生很多的重复代码，这无疑是件非常痛苦的事；
- 这种情况下，就需要将创建实例的工作从调用方（A类）中分离，与调用方**解耦**，也就是使用工厂方法创建实例的工作封装起来（**减少代码重复**），由工厂管理对象的创建逻辑，调用方不需要知道具体的创建过程，只管使用，**降低调用者因为创建逻辑导致的错误**；



# 拟物化解读
![](../assets/0.0.2/factory01.jpg)

一个工厂接到一笔订单（传参），然后根据这个订单类型（参数）来安排产品线（实例化哪个类），当然客户可以要求一些产品的工艺属性（抽象工厂）。这其中厂长（工厂模式）值负责调度，即安排产品零件流水线。你应该知道的是，工厂有个特点就是产出体量大、相似度高的产品。如果你要做单一定制化的产品，那这笔订单给工厂就不适用了。


# 作用
- 解耦，通过使用工程方法而不是 `new` 关键字；
- 将所有实例化的代码集中在一个位置减少代码重复，降低出错；

# 具体实现
- 分步创建一个复杂的对象，解耦封装过程和具体创建组件（分解为零件流水线）；
- 无需关心组件如何组装（厂长在调度）；
- 不暴露创建对象的具体逻辑，将逻辑封装在一个函数中（客户只需要告诉工厂做什么和提一些要求）；

# 适用场景
- 遇到 new，可以考虑是否需要使用工厂模式；
- 处理大量具有相同属性的小对象；
- 对象的构建十分复杂，需要依赖具体环境创建不同实例；

# 分类（抽象程度）
不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。

![抽象程度](../assets/0.0.2/factory.png)

## 简单工厂模式
也可以叫静态工厂模式，用一个工厂对象创建同一类对象类的实例。现实生活中，用户在平台还是分等级的，角色不同，权限也不同。

![](../assets/0.0.2/sample.factory.png)

1.ES5 实现

```javascript
// 0.0.2/es5.sample.factory.js
function Role(options){
    this.role = options.role;
    this.permissions = options.permissions;
}
Role.prototype.show = function (){
    var str = '是一个' + this.role + ', 权限：' + this.permissions.join(', ');
    console.log(str)
}

function sampleFactory(role){
    switch(role) {
        case 'admin':
            return new Role({ 
                role: '管理员', 
                permissions: ['设置', '删除', '新增', '创建', '开发', '推送', '提问', '评论']
            });
            break;
        case 'developer':
            return new Role({ 
                role: '开发者', 
                permissions: ['开发', '推送', '提问', '评论']
            });
            break;
        default:
            throw new Error('参数只能为 admin 或 developer');
    }
}

// 实例
const xm = sampleFactory('admin');
xm.show();

const xh = sampleFactory('developer');
xh.show();

const xl = sampleFactory('guest');
xl.show();
```

2.ES6 实现

```javascript
// 0.0.2/sample.factory.js
class SampleFactory {
    constructor(opt) {
        this.role = opt.role;
        this.permissions = opt.permissions;
    }

    // 静态方法
    static create(role) {
        switch (role) {
            case 'admin':
                return new SampleFactory({
                    role: '管理员',
                    permissions: ['设置', '删除', '新增', '创建', '开发', '推送', '提问', '评论']
                });
                break;
            case 'developer':
                return new SampleFactory({
                    role: '开发者',
                    permissions: ['开发', '推送', '提问', '评论']
                });
                break;
            default:
                throw new Error('参数只能为 admin 或 developer');
        }
    }

    show() {
        const str = `是一个${this.role}, 权限：${this.permissions.join(', ')}`;
        console.log(str);
    }

}

// 实例
const xm = SampleFactory.create('admin');
xm.show();

const xh = SampleFactory.create('developer');
xh.show();

const xl = SampleFactory.create('guest');
xl.show();
```
或

```javascript
// 0.0.2/sample.factory1.js
class Role {
    constructor(options) {
        this.role = options.role;
        this.permissions = options.permissions;
    }
    show() {
        const str = `是一个${this.role}, 权限：${this.permissions.join(', ')}`;
        console.log(str);
    }
}
class SampleFactory {
    constructor(role) {
        this.role = role;
    }

    // 静态方法
    static create(role) {
        switch (role) {
            case 'admin':
                return new Role({
                    role: '管理员',
                    permissions: ['设置', '删除', '新增', '创建', '开发', '推送', '提问', '评论']
                });
                break;
            case 'developer':
                return new Role({
                    role: '开发者',
                    permissions: ['开发', '推送', '提问', '评论']
                });
                break;
            default:
                throw new Error('参数只能为 admin 或 developer');
        }
    }
}

// 实例
const xm = SampleFactory.create('admin');
xm.show();

const xh = SampleFactory.create('developer');
xh.show();

const xl = SampleFactory.create('guest');
xl.show();
```
或

```javascript
// 0.0.2/sample.factory2.js
class Role {
    constructor(options) {
        this.role = options.role;
        this.permissions = options.permissions;
    }
    show() {
        const str = `是一个${this.role}, 权限：${this.permissions.join(', ')}`;
        console.log(str);
    }
}

class SampleFactory {
    constructor(role) {
        if(typeof this[role] !== 'function') {
            throw new Error('参数只能为 admin 或 developer');
        }
        return this[role]();
    }

    admin() {
        return new Role({
            role: '管理员',
            permissions: ['设置', '删除', '新增', '创建', '开发', '推送', '提问', '评论']
        });
    }
    developer() {
        return new Role({
            role: '开发者',
            permissions: ['开发', '推送', '提问', '评论']
        });
    }
}


// 实例
const xm = new SampleFactory('admin');
xm.show();

const xh = new SampleFactory('developer');
xh.show();

const xl = new SampleFactory('guest');
xl.show();
```

上例中，`sampleFactory` 就是一个简单工厂，2个实例对应不同的权限，调用工厂函数时，只需传递 `admin` 或 `developer` 就可获取对应的实例对象。


1.简单工厂函数适用场景
- 正确传参，就可以获取所需要的对象，无需知道内部实现细节；
- 内部逻辑（工厂函数）通过传入参数判断实例化还是使用哪些类；
- 创建对象数量少（稳定），对象的创建逻辑不复杂；

2.简单工厂函数不适用场景
- 当需要添加新的类时，就需要修改工厂方法，这违背了开放封闭原则（OCP, 对扩展开放、对源码修改封闭）。正所谓成也萧何败也萧何。函数 `create` 内包含了所有创建对象（构造函数）的判断逻辑代码，如果要增加新的构造函数还需要修改函数 `create`（判断逻辑代码），当可选参数 `role` 变得更多时，那函数 `create` 的判断逻辑代码就变得臃肿起来，难以维护。
- 不适用创建多类对象；

## 工厂方法模式
将实际创建对象工作推迟到子类当中，核心类就成了抽象类。这样添加新的类时就无需修改工厂方法，只需要将子类注册进工厂方法的原型对象中即可。

![](../assets/0.0.2/function.factory.png)

1.安全模式类，可以屏蔽使用类的错误造成的错误
```javascript
// 0.0.2/secure.function.factory.js
function Factory(){
    if(!(this instanceof Factory)) {
        return new Factory();
    }
}
Factory.prototype.show = function(){
    console.log('factory show');
}
var f = new Factory();
f.show();
```

2.ES5 实现，ES5 没有像传统创建类的方式那样创建抽象类，所以工厂方法模式只需参考其核心思想即可。可将工厂方法看做一个实例化对象工厂类（采用安全模式类），将创建对象的基类放在工厂方法类的原型中即可。当需要添加新类时，只需挂载在 `FunctionFactory.prototype` 上，无需修改工厂方法，也实现了 OCP 原则。

```javascript
// 0.0.2/es5.function.factory.js
function FunctionFactory(role) {
    if(!(['admin', 'developer'].indexOf(role) > -1)){
        throw new Error('参数只能为 admin 或 developer');
    }
    
    // 安全的工厂方法
    if (this instanceof FunctionFactory) {
        return this[role]();
    }
    return new FunctionFactory(role);
}
FunctionFactory.prototype.show = function () {
    var str = '是一个' + this.role + ', 权限：' + this.permissions.join(', ');
    console.log(str)
}
FunctionFactory.prototype.admin = function (permissions) {
    this.role = '管理员';
    this.permissions = ['设置', '删除', '新增', '创建', '开发', '推送', '提问', '评论'];
}
FunctionFactory.prototype.developer = function (permissions) {
    this.role = '开发者';
    this.permissions = ['开发', '推送', '提问', '评论'];
}

var xm = FunctionFactory('admin');
xm.show();

var xh = new FunctionFactory('developer');
xh.show();

var xl = new FunctionFactory('guest');
xl.show();
```

3.ES6 实现，由于 ES6 中还没有 `abstract`，就用 `new.target` 来模拟出抽象类（`new.target` 指向被 `new` 执行的构造函数），判断 `new.target` 是否指向了抽象类，如果是就报错。

```javascript
// 0.0.2/function.factory.js
class FunctionFactoryBase { // 抽象类
    constructor(role) {
        if (new.target === FunctionFactoryBase) {
            throw new Error('抽象类不能实例');
        }
        this.role = role;
    }
}

class FunctionFactory extends FunctionFactoryBase { // 子类
    constructor(role) {
        super(role);
    }

    static create(role) {
        switch (role) {
            case 'admin':
                return new FunctionFactory({
                    role: '管理员',
                    permissions: ['设置', '删除', '新增', '创建', '开发', '推送', '提问', '评论']
                });
                break;
            case 'developer':
                return new FunctionFactory({
                    role: '开发者',
                    permissions: ['开发', '推送', '提问', '评论']
                });
                break;
            default:
                throw new Error('参数只能为 admin 或 developer');
        }
    }

    show() {
        const { role, permissions } = this.role;
        const str = `是一个${role}, 权限：${permissions.join(', ')}`;
        console.log(str)
    }
}

// let xl = new FunctionFactoryBase(); // 此行会报错，注释后方可正常执行后面

let xm = FunctionFactory.create('admin');
xm.show()

let xh = FunctionFactory.create('developer');
xh.show()

let xl = FunctionFactory.create('guest');
xl.show()
```



## 抽象工厂模式
抽象工厂只留对外的口子，不做事，留给外界覆盖（子类重写接口方法以便创建的时候指定自己的对象类型）。主要用于对**产品类簇**的创建，不直接生成实例（简单工厂模式和工厂方法模式都是生成实例）。

- 抽象类是一种声明但不能使用的类，子类必须先实现其方法才能调用;
- 可以在抽象类中定义一套规范，供子类去继承实现;

```javascript
// 0.0.2/abstract.factory.js
// 抽象工厂
function AbstractFactory(subType, superType) {
    if (typeof AbstractFactory[superType] === 'function') {
        //缓存类
        function F() { }
        //继承父类属性和方法
        F.prototype = new AbstractFactory[superType]();
        //将子类 constructor 指向子类（自己）
        subType.prototype.constructor = subType;
        //子类原型继承缓存类（父类）
        subType.prototype = new F();
    } else {
        //不存在该抽象类抛出错误
        throw new Error('抽象类不存在')
    }
}

// 抽象类
AbstractFactory.Phone = function () {
    this.type = 'Phone';
}
AbstractFactory.Phone.prototype = {
    showType: function () {
        return new Error('Phone 抽象方法 showType 不能调用');
    },
    showPrice: function () {
        return new Error('Phone 抽象方法 showPrice 不能调用');
    },
    showColor: function () {
        return new Error('Phone 抽象方法 showColor 不能调用');
    }
}

AbstractFactory.Pad = function () {
    this.type = 'Pad';
}
AbstractFactory.Pad.prototype = {
    showType: function () {
        return new Error('Pad 抽象方法 showType 不能调用');
    },
    showPrice: function () {
        return new Error('Pad 抽象方法 showPrice 不能调用');
    },
    showColor: function () {
        return new Error('Pad 抽象方法 showColor 不能调用');
    }
}

// 抽象工厂实现对抽象类的继承
function Iphone(type, price, color) {
    this.type = type;
    this.price = price;
    this.color = color;
}

//抽象工厂实现对 Phone 抽象类的继承
AbstractFactory(Iphone, 'Phone');
Iphone.prototype.showType = function () {
    return this.type;
}
Iphone.prototype.showPrice = function () {
    return this.price;
}
Iphone.prototype.showColor = function () {
    return this.color;
}

function Ipad(type, price, color) {
    this.type = type;
    this.price = price;
    this.color = color;
}
AbstractFactory(Ipad, 'Pad');
Ipad.prototype.showType = function () {
    return this.type;
}
Ipad.prototype.showPrice = function () {
    return this.price;
}
Ipad.prototype.showColor = function () {
    return this.color;
}

// 实例
var iphone5s = new Iphone('iphone 5s', 3000, '白色');
console.log('今天刚买了' + iphone5s.showType() + '，价格是' + iphone5s.showPrice() + '，' + iphone5s.showColor())

var iphone8s = new Iphone('iphone 8s', 8000, '白色');
console.log('今天刚买了' + iphone8s.showType() + '，价格是' + iphone8s.showPrice() + '，' + iphone8s.showColor())

var ipad = new Ipad('ipad air', 2000, '骚红色');
console.log('今天刚买了' + ipad.showType() + '，价格是' + ipad.showPrice() + '，' + ipad.showColor())
```

# 实战示例
1.jQuery源码-工厂模式
```javascript
// 0.0.2/jquery.factory.js
// 工厂模式
class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice;
    let dom = slice.call(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len
    this.selector = selector || ''
  }
  addClass(name) {
    console.log(name)
  }
  html(data) {

  }
  // 省略多个 API
}

// 工厂模式
window.$ = function(selector) {
  return new jQuery(selector);
}

// 实例
const $li = $('li') 
$li.addClass('item');
```

2.`React.createElement` 实现
```javascript
// jsx
var profile = (
  <div>
    <img src='https://raw.githubusercontent.com/ruizhengyun/images/master/cover/ruizhengyun.cn_.png' className="profile" />
    <h3>{[user.firstName, user.lastName].join(' ')}</h3>
  </div>
);

// 实现
var profile = React.createElement('div', null, 
  React.createElement('img', { src: 'https://raw.githubusercontent.com/ruizhengyun/images/master/cover/ruizhengyun.cn_.png', className: 'profile' }),
  React.createElement('h3', null, [user.firstName, user.lastName].join(' '))
);

// 源码
class Vnode(tag, attrs, children) {
  // ...
}

React.createElement = function(tag, attrs, children) {
  return new Vnode(tag, attrs, children);
}
```

# 设计原则验证
- 构造函数与创建者分离
- 符合开放封闭原则


# 阅读源码（lib）意义
- 学习如何实现功能（基本应用）
- 学习设计思路（进阶）
- 刻意模拟学习
- 写出愉悦的代码


[本次代码 Github](https://github.com/ruizhengyun/design-pattern-note/tree/feature_v0.0.2_20190723)

# 你可以...

[上一篇：Javascript 设计模式之设计原则](./rule.html)

[下一篇：Javascript 设计模式之单例模式](./single.html)