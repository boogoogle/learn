# SwiftUI


UIViewRepresentable: 


### 结构体struct


### 有些协议
  - Hashable: 只有遵循了Hashable 协议 才能被添加到 Set 中 或者用作 Dictionary 的 key 值
  - Identifiable 
    - protocol Identifiable
    - 需要对应的实现有一个id属性
  - Decodable



@Binding 和 @State 啥区别,场景是?,[官方文档](https://developer.apple.com/documentation/swiftui/state_and_data_flow)
  - @State
    - When the state updates, the view invalidates its appearance and updates itself.
    - You can also connect animations to the state to animate how the view portrays the change.
  - @Binding
    - Create bindings from members of your state to connect to **individual views**. 
    - Bindings offer two-way connections, so that onscreen controls can mutate the state
    - Bindings also have transactions to pass values between views.

Observable Object for Storage
  - An observable object is a custom object for your data that be bound to a view form storage in SwiftUI's environment
  - SwiftUI watch for any changes to observable objects that could affect a view
  - and displays the correct version of the view after a change.
  - @Published
    -  An observable object needs to publish any changes to its data, so that its subscribers can pick up the change.


@EnvironmentObject
  -    

### 组件
  - [Image](https://github.com/fzhlee/SwiftUI-Guide#14Image-Basic)
  - 通过dystemName可以指定图标



### 项目结构
  - [参考来自](https://www.jianshu.com/p/a74920a47e4a)
  - info.plist 是一个特殊值的集合，它向系统描述你的应用程序是如何工作的——它是哪个版本，你支持哪个设备方向，等等。不是代码但仍然是很重要的东西。
  - Assets.xclassets 是一个资源目录——一个您希望在您的应用程序中使用的图片集合。您还可以在这里添加颜色，以及应用程序图标、iMessage贴纸等。
  - SceneDelegate.swift 包含在应用程序中启动一个窗口的代码。这在iPhone上没有多大作用，但在iPad上，这一点很重要，iPad用户可以同时打开你的应用程序的多个实例。

### api
  - rotation3DEffect(_:axis:anchor:anchorZ:perspective:)
    - Rotates this view’s rendered output in three dimensions around the given axis of rotation.



### 硬件信息
  - 屏幕宽度 UIScreen.main.bounds.width


# Swift语言

## 核心
  - 变量和函数

  - 常量: 在编译的时候,并不需要明确的值,但是**只能赋值一次**
    - let 声明常量:
    - 常量声明时可以同时声明数据类型
      - 如果没有声明,编译器会自动推断
  - 变量: 
    - var 声明变量
    - 变量声明可以同时声明数据类型
      - 如果没有声明,编译器会自动推断
  - 值永远不会被隐式转换为其他类型.
    - 如果没有声明,编译器会自动推断
    - 有一种更简单的把值转换成字符串的方法：把值写到括号中，并且在括号之前写一个反斜杠 "\(int variable)"
      - `let widthLabel = label + "\(int width)"`

  - ..< 来标识范围,也可以使用传统写法


### 可选项(Optional Type)
  - `let possibleNumber: Int?`
    - 表示变量可能是Int类型,也可能是没有值
      - 因为上面的语句没有给变量possibleNumber赋值, swift编译器自动给它设置成了nil
      - 注意: 
        - 在oc中nil是是一个**指向不存在对象**的**指针**
        - 在swift中,nil不是指针,它是**值缺失**的一种**特殊类型**
  - 常量/变量声明的时候类型后面带有 **?** 或者 **!** 为可选类型(optional type，即可选项)
  - 叹号 ! -- 隐式展开可选项
    - 主要用在swift类的初始化过程中
    - 我们可以对一个可选项类型(Optional Type)使用后缀操作符!来强制拆包(force unwrap)访问这个值，来继续后面的操作。

### 运算符
  - ?? 对于可选类型使用
  - 例如


```
var a: Int?
a = nil
var b = a ?? 22 // 22

a = 11
b // 11

```



### 基本数据类型
  - Int 整型
  - Double Float 浮点型
  - Bool 
  - String
  - 集合类型
    - Array
    - Set
    - Dictionary


### 协议(Protocol)
  - 定义完成某种任务或功能所必须的方法和属性
  - 实际上并不提供功能或者任务的具体实现(Implementation)


### 有些关键字
  - some
    - 修饰在一个protocol前面
    - 默认场景下 protocol 是没有具体类型信息的，
    - 但是用 some 修饰后，编译器会让 protocol 的实例类型对外透明。


### 一些疑问
  - ForEach 和 List 的区别?
    - To combine static and dynamic views in a list, or to combine two or more different groups of dynamic views, use the ForEach type instead of passing your collection of data to List.






## [ARC](https://www.cnswift.org/automatic-reference-counting#spl-5)
// ARC
```
class Person {
    var name: String
    
    init(name:String){
        self.name = name
        print("\(name) is being initialized")
    }
    deinit {
        print("\(name) is being deinitialized")
    }
}

// 创建3个引用,但是由于可选类型的变量会被自动初始化为一个nil值,
// 所以 目前还不会引用到Person类的实例
var ref1: Person?
var ref2: Person?
var ref3: Person?

ref1 = Person(name: "Person-1") // 创建了一个强引用

ref1 = nil // 引用计数归零, 类的deinit方法被调用
```

### 循环强引用
  - 类的属性相互强引用
```


// 循环强引用

class Person {
    let name: String  // let声明常量,只能被赋值一次
    init(name: String) { self.name = name; print("\(name) init")}
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}

// john 和 unit4A都被赋值为nil
var john: Person?
var unit4A: Apartment?

john = Person(name: "John")
unit4A = Apartment(unit: "4A")

john!.apartment = unit4A
// 必须先给john拆包,不然会报下面的错误
// Value of optional type 'Person?' must be unwrapped to refer to member 'apartment' of wrapped base type 'Person'

/**
  这样和上面用 var john: Person? 定义 的使用场景是啥?
 var john: Person
 var unit4A: Apartment
 
 john = Person(name: "John")
 unit4A = Apartment(unit: "4A")
 
 john.apartment = unit4A
 */
 ```

 ### 弱引用 weak 
 ```

// 弱引用

class Person {
    let name: String
    init(name: String) { self.name = name }
    var apartment: Apartment?
    deinit { print("\(name) is being deinitialized") }
}

class Apartment {
    let unit: String
    init(unit: String) { self.unit = unit }
    weak var tenant: Person?
    deinit { print("Apartment \(unit) is being deinitialized") }
}

var john: Person?
var unit4A: Apartment?



john = Person(name: "John Appleseed")
unit4A = Apartment(unit: "4A")
john!.apartment = unit4A
unit4A!.tenant = john

john
unit4A

john = nil
// 因为unit4A对john是weak引用,
// 所以john实例销毁,它的deinit就被触发了
```