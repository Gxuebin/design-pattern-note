const on = (target, event, callbacl) => {
    if (target.addEventListener) {
        // 标准事件监听
        target.addEventListener(event, callback);
    } else if (target.attachEvent) {
        // IE低版本事件监听
        target.attachEvent(event, callback);
    } else {
        // 低版本浏览器事件监听
        target[`on${event}`] = callback;
    }
}