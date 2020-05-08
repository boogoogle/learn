# SwiftUI


UIViewRepresentable: 


### 结构体struct


### 有些协议
  - Hashable: 只有遵循了Hashable 协议 才能被添加到 Set 中 或者用作 Dictionary 的 key 值
  - Identifiable 
    - protocol Identifiable
    - 需要对应的实现有一个id属性



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



# Swift语言

## 核心
  - 变量和函数

常量: 在编译的时候,并不需要明确的值,但是**只能赋值一次**
  - let 声明常量:
  - 常量声明时可以同时声明数据类型
    - 如果没有声明,编译器会自动推断
变量: 
  - var 声明变量
  - 变量声明可以同时声明数据类型
    - 如果没有声明,编译器会自动推断
值永远不会被隐式转换为其他类型.
  - 如果没有声明,编译器会自动推断
  - 有一种更简单的把值转换成字符串的方法：把值写到括号中，并且在括号之前写一个反斜杠 "\(int variable)"
    - `let widthLabel = label + "\(int width)"`

..< 来标识范围,也可以使用传统写法


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