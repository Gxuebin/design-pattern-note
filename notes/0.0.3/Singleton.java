public class SingleObject {
    // 私有化构造函数，即外部不能使用 new SingleObject()，外部不能使用new!!
    private SingleObject(){}
    // 内部 new
    private SingleObject instance = null;
    // 对外接口
    public SingleObject getInstance() {
        if(instance === null) {
            // 保证只会 new 一次
            instance = new SingleObject();
        }
        return instance;
    }
    
    //对象方法
    public void show(name, pwd) {
        System.out.printIn('展示');
    }
}

public class SingleObjectDemo {
    public static void main(String[] args) {
        // 不合法
        SingleObject object = new SingleObject();

        // 正确使用，唯一可用可用对象
        SingleObject object = SingleObject.getInstance();
        object.show();
    }
}