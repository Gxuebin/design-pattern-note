class AMap {
    show() {
        console.log('渲染高德地图');
    }
};
class BaiduMap {
    display() {
        console.log('渲染百度地图');
    }
};

// 对外都使用 show 方法，建立百度地图适配
class BaiduMapAdapter extends BaiduMap {
    constructor() {
        super();
    }
    show() {
        this.display();
    }
};

// 外部调用，统一接口调用
const renderMap = map => {
    map.show();
};

renderMap(new AMap());
renderMap(new BaiduMapAdapter());