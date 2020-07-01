# SwiftUI

  - edgesIgnoringSafeArea(.all)
    - 不要在正式组件中使用, 仅仅在用作背景的组件上使用
  - Color(color Literal), 然后双击色块,会弹出调色盘(color picker)

UIViewRepresentable: 

  - UIHostingController
    - A UIHostingController is a UIViewController subclass that represents a SwiftUI view within UIKit contexts.
  - [UIPageViewController](https://www.jianshu.com/p/f3d1cb8ce2d3)
    - 管理内容页之间导航的容器控制器(container view controller)，其中每个子页面由子视图控制器管理。
    - 内容页间导航可以由用户手势触发，也可以由代码控制
    - UIPageViewController可以实现图片轮播效果和翻书效果.
  - UIApplication
    - [参考1](https://cloud.tencent.com/developer/article/1336362) 
    - [参考2](https://www.jianshu.com/p/597b9d108f39)
    - 处理用户的触摸事件
      - 把事件放入队列,逐个处理
      - 分发action message到它拥有的合适的目标控件上
    - 该对象维持一个打开的窗口列表,通过这个列表可以检索应用程序的任何UIView对象
    - 赋予一个代理对象UIApplicationDelegate, 以处理应用程序的生命周期/系统事件(来电,记事日程等)
  - UIResponder 事件响应类: 响应屏幕事件,并维护一个响应链的机制
    - 为需要响应并处理事件的对象定义了一组接口,这些事件分为两类
      - 触摸事件
      - 运动事件
    - 在UIKit中，UIApplication、UIView、UIViewController这几个类都是直接继承自UIResponder类
    - #selector: 通过方法名拿到某个方法
      - [参考](https://www.jianshu.com/p/3be8d223528a)
    - 日常工作中我们主要用到：
      - 响应链及其管理
      - 第一响应对象
        - : 处理和屏幕位置无关的事件,例如摇动, 键盘输入等
        - 苹果官方文档的说法是：第一响应对象是窗口中，应用程序认为最适合处理事件的对象
          - UITextField当上第一响应对象的时候，就会调出一块小键盘。
          - 通过resignFirstResponder取消当前的第一响应对象
      - 响应触摸事件
      - 验证命令(Menu菜单)
      - 管理输入视图（自定义键盘）
      - 等等。




### 结构体struct
  - SwiftUI使用struct而不是class来描述view
  - 同时, 把UIView 和 UIViewController统一到View协议中



### swift中的方法
  - 例子`func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int)`
  - 第二个参数有两个名字:
    - numberOfRowsInSection在调用这个方法的时候使用. 我们称之为参数的"外部名称"
    - section: 是参数的"内部名称"
  - 在swift中,**参数的外部名称**是方法全名的一部分
  - 下面是三个不同的方法
    - tableView(numberOfRowsInSection)
    - tableView(cellForRowAt)
    - tableView(didSelectRowAt)
  - tableView.dequeueReusableCell(withIdentifier: String)// 获取一个prototype cell 的拷贝
    - [Cell有四种,看这里](https://www.jianshu.com/p/dfce5b274d97)

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
    - `1..<5`  表示 `1...4`

### 字符串操作
  - ` String(format: "%.8f",location.coordinate.latitude) `
  - 占位符: "%.8f"
    - 占位符一定是由一个百分号%开始
    - 常见的: 
      - %d 用于整数，
      - %f 用于浮点数，
        - %.8f 作用和%f一样,**.8**表示保留8位小数
      - %@ 用于任意对象。

### 可选项(Optional Type)
  - [参考这里理解](https://blog.csdn.net/humiaor/article/details/67632572)
  - [and这里](https://www.jianshu.com/p/d01a0f4a2988)
  - swift的变量或者常量必须有一个值,
    - 在其他编程语言中可能会使用nil或者null来表示一个变量没有值,但是swift不允许
    - 当一个变量突然编程nil时,app会挂掉,出现“null pointer dereference（空指针运算）”
    - swift通过禁止使用nil来避免这一情况
    - 除非声明变量为**可选型**
      - 只有**可选型变量才能拥有nil**这个值
  - `let possibleNumber: Int?`
    - 表示变量可能是Int类型,也可能是没有值
      - 因为上面的语句没有给变量possibleNumber赋值, swift编译器自动给它设置成了nil
      - 注意: 
        - 在oc中nil是是一个**指向不存在对象**的**指针**
        - 在swift中,nil不是指针,它是**值缺失**的一种**特殊类型**
  - 常量/变量声明的时候类型后面带有 **?** 或者 **!** 为可选类型(optional type，即可选项)
  - 叹号 ! -- 隐式展开可选项
    - 主要用在swift类的初始化过程中
    - 对于可选项类型(Optional Type), 必须使用后缀操作符!来**强制拆包(force unwrap)**才能访问这个值，继而执行后面的操作。
      - 强制拆包标识你**担保这个变量的值一定不是nil**
  - 对于可选型变量的使用
      ```
      if let temporaryConstant = optionalVariable {
        // temporaryConstant now contains the unwrapped value
        // of the optional variable
      }

      ```
    - 因为可选型变量有可能为nil,所以需要使用这种特殊的语法来进行**解包**

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
    - `var d = 3.14` swift会自动判断类型为 Double,而不是Float
  - Character 仅仅存放一个字符
  - Bool 
  - String
    - a.localizedStandardCompare(b) 按照字母表顺序排序,**忽略大小写**
      - 结果可能是: 
        - .orderedDescending
        - .orderedAscending
        - .orderedSame
  - 集合类型
    - Array
      - `[value1, value2, ....]`
    - Set
      - `var setExample = Set<String>()`
      - `setExample.insert("aaa")`
      - 方法
        - 单个集合的方法
          - insert
          - remove
          - removeAll
          - isEmpty
          - count
          - contains
        - 两个集合操作
          - intersect 取两个集合的交集,同时存在a&b中,返回一个新集合
          - a.exclusiveOr(b) 只存在a和只存在b中的元素,返回一个新集合. 和intersect正好互补
          - union 取两个集合的并集, 返回一个新的集合
          - a.subtract(b)  取在a, 不在b集合的值创建一个新的集合
      - Set和Array不同的是，Set是无序的，可以通过调用sort()方法来进行排序。
      - 判断
        - == 判断两个集合是否包含全部相同的值
        - isSubsetOf 判断 一个集合中的值是否也被包含在另外一个集合中
        - isSupersetOf 判断 一个集合中包含的值是否含有另一个集合中所有的值
        - isStrictSubsetOf or isStrictSupersetOf 判断一个集合是否是另外一个集合的子集合或者父集合并且和特定集合不相等。
        - isDisjointWith(_:)方法来判断两个集合是否不含有相同的值
    - Dictionary
      - `[key1: value1, key2: value2,....]`
  - 枚举类型 enumeration 简写为enum
    - 由一系列符号和对应的值的列表组成
    - 一般用点号开头
    - 类似: .none .default .alert .sound 等等
    - 上面的都是**枚举符号**
  - 值类型和引用类型
    - **引用类型**
      - 使用class关键字定义的都是 
    - **值类型**
      - struct或者enum 定义的对象
      - Int String Array
### 数组
  - 初始化空数组
  - 获取某个元素的索引 items.firstIndex(of: item)
    - 1. 不能再任意对象上使用该数组方法, 只能在**相同的对象**上使用它
    - 怎么处理呢?
      - 1. 在数组元素的类上声明 NSObject

### 类
  - `requiredi nit?(coder)`
    - 前面的关键字是required。required关键字用于**强制每个子类**总是执行某个特定的init方法。
### 对象
  - 将功能和数据结合在一起的可重用单元，都是对象。
  - 属性
    - 存储属性
    - 计算属性
### 协议(Protocol)
  - 一个协议就是一组方法名称的列表
  - 定义完成某种任务或功能所必须的方法和属性
  - 实际上并不提供功能或者任务的具体实现(Implementation)


### 有些关键字
  - some
    - 修饰在一个protocol前面
    - 默认场景下 protocol 是没有具体类型信息的，
    - 但是用 some 修饰后，编译器会让 protocol 的实例类型对外透明。

### 三个概念
  - delegation（委托）：用一个对象代表另一个对象做一些事情；
  - target-action（动作目标）：连接事件—例如点击按钮，到一个action method（动作方法）。
  - MVC
    - 数据模型之间执行的运算通常被称为“业务逻辑”或者“域逻辑”

### 类方法和实例方法（Class methods & instance methods）
  - 类方法
    - ``class func nextChecklistItemID()``
    - class关键字意味着你可以在不引用DataModel的前提下，调用这个方法。


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
   - @IBOutlets也通常使用weak关键字。这里并不是为了避免循环引用，而是为了清晰的表明**视图控制器并不真正的拥有输出的视图**。
   - 还有一种引用类型叫做“无主的unowned”，它和weak类似，也可以用于委托，区别在于weak变量允许为nil
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



### 常用框架和他们的api
  - 不同控件提供不同的专用功能
    - UIKit 提供用户接口控件,管理视图控制器, User Interface
    - Foundation: 提供基础功能模块
    - Core Graphics 绘图
    - AVFoundation 音视频
    - iOS的完整框架体系被统称为：Cocoa Touch。


  - IBAction: Interface Builder Action
    - 跟story上的控件进行连线
  - IBOutlet
    - 只有声明为IBOutlet的属性，才能跟storyboard中的控件进行连线
    - 属性要想能够连线必须在数据类型前面加上IBOutlet

  - UIAlertController
    - 方法
      - addAction()
  - present() 是所有View Controller 共有的方法
  - 动作方法和普通方法
    - 类似@IBAction这样的方法,界面构造器(Interface Builder)能够使用这些方法
    - 普通方法不会在界面上调用
  - 竖屏模式 Portrait（肖像画）因为肖像画总是竖着的，
  - 横屏模式: landscape（风景画）因为风景画多半是横着的。
  - Navigation Controller
  - Tab Bar Controller
  - TextField
    - textField.becomeFirstResponder() // 自动激活文本框,弹出键盘
    - Auto-enable Return Key。 没有输入的时候不匀速按回车键
  - NSString与String
    - NSString是Object-C语言中用于存储文本的对象
    - 通过声明某个变量 as NSString,可以使用NSString的方法
  - date picker 的高是216



### 数字操作:
  - lround(Double) 四舍五入
  - acr4random_uniform(100) 生成0~99之间的随机整数
  - abs()


### ViewController        
  - self: ViewContoller 允许使用self访问自己的实例
  - dismiss(animated: true, completion: nil) 关闭当前view
  - present() 是所有View Controller 共有的方法,实例化一个ViewController
  - 内建属性
    - title; 在View Controller 中直接修改title的值,导航控制器就会自动改变导航栏名称
    - navigationController 内建的导航控制器属性,
      - 可以使用navigationController?.delegate读取它，因为它是个可选型，所以你要使用一个问号。
  - storyboard
    - 每个ViewController都有一个storyboard属性
    - storyboard用来引用这个ViewController是从哪个股市模板中读取来的 
    - 因为ViewController并不总是从故事模板中获取,所以它是可选型 storyboard!

### UINavigationController
  - 有一个topViewController属性,标识正在显示中的界面

### Info.plist
  - plist - Property List
  - Info.plist是应用程序包中的一份配置文件，它负责告诉iOS这个app应该作何表现。它也包含某些不能放在其他地方的关于app的一些具体特征，比如app的版本号。
  - 在早期版本的Xcode中，你必须手工配置Info.plist，但是在Xcode 8中已经不需要这样做了。你可以直接在Project Setting中设置大多数内容。

### NS对象
  - NextStep的缩写
  - 已NS为前缀的对象都是由 Foundation框架提供的

### NSCoder: 
  - 可以使对象存储他们的数据到一个格式化的文件中

### AutoLayout
  - storyboard中的相对布局,constraint布局等
  - Label标签的设置比较特殊
    - 1. 选中lalbe控件  
    - 2. Xcode菜单 Editor → Size to Fit Content
### 本地通知(UserNotifications)
  - iOS的消息通知,只在App未使用时才生效
  - 如果你正在使用app，你当然不需要关于这个app的提醒。


### launch screen
  - 启动app时，往往需要花一点时间。从点击app的图标，到真正可以使用app之间的这点时间内，你可以使用launch screen做个无缝衔接。launch screen会占用屏幕，直到app被完全加载。
  - 如果没有launch screen占用屏幕，那么在app被加载出来前，iPhone屏幕会空白一片，这不是非常好的选择。
  - 也可以使用一种叫做XIB的storyboard文件，也叫“nib”，来代替图片，这是一种和storyboard很像的东西，只是它只能包含一个单屏幕的设计。
  - app的launch screen在默认生成的LaunchScreen.storyboard文件中设置, 我们可以删除它

### delegate
  - UIKit uses a design pattern called **delegation** to decide where work happens. 
### Bundle对象
  - 

### 存储

### UITableView
  - 有两种模式
    - plain : 容纳相同事物的列表，比如通讯录，或是地址薄，每一行上面都是一个人名或者地址。
    - grouped: 经常被作来容纳不同事物的列表，比如通信录中的多种属性，姓、名、座机号码、手机号码等。
  - cell: cell是一种视图(view)
    - 它在某一行可见时可以展现一行数据。如果你的屏幕大小只能同时容纳10行，那么你就只有10个cell，那怕你一共有数千行数据
    - indexPath是一个指向表中具体某一行的一个简单的对象。
    - row : 来获取当前的行号 , 索引从0开始
    - section : 索引从0开始
  - tatiSc Cells 和 Dynamic Prototypes
    - 如果表格中的节数和行数是确定的且不会发生变化的情况,你就可以使用静态单元（static cells）。这种情况多数用于给用户提供输入数据的界面
  - TableView对象有多个init方法,分别是:
    - init?(coder) 用于从story模板中自动加载视图控制器
    - init(nibName, bundle)手工从视图控制器中加载nib(nib文件和story一样,只是仅包含一个视图控制器)
    - init(style)用于你想要创建没有故事模板或者nib时的table view controller 
  - cellForRowAt 一般用于**有数据源**的静态cell,
    - 如果用不不存在数据源的cell, 需要格外小心.

### prepare（for：sender：）
  - 该方法会在一个界面将要向另一个界面转场时被UIKit调用。
  - 可以使你在新的视图控制器展现前向它发送数据，通常会在这一时刻对新界面进行各种配置。
    -  segue.destination 指向新的视图控制器
    -  sender: 包含一个控制转场的引用,
       -  很多时候: 它是你刚点击的按钮,或者某一个View

# 委托和协议是手拉手出现的，这是Swift语言的一个重要特色。
  - 委托方法通常以第一个参数来指代它们的属主。
    - 这样做不是必须的，但是是更好的。
### AppDelegate


### NSObject


### FileManager
  - FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)

### Core Location
  -  GPS
     - 真实的iPhone设备有三种获取位置信息的方式，基站三角测量，Wifi和GPS
       - 基站三角测量只要手机有信号就工作，但是精度不是非常高。
       - Wifi会稍微好一些，但是仅仅在你周围有Wifi时才能工作。原理是使用一个包含无线网络设备位置信息的一个大数据库。
       - GPS的测量精度是最高的，但是由于它是和卫星通讯，所以是三种方法中最慢的，并且时常在室内会失灵。
     - Core Location把这些多种渠道读取位置信息并且转换为数字的复杂工作自己做完了。Core Location不会一直等待从GPS获取数据，而是把能优先获取到的数据先展示出来，然后再慢慢的提高精度。
  - CLError
    - CLError.locationUnknown 目前的位置信息未知，但是Core Location还在努力搜索。
    - CLError.denied：用户拒绝了app访问位置信息。 
    - CLError.network：找不到可用的网络。

### UserDefault
  - 保存一些小东西,比如设置类, 屏幕浏览记录, 类似于浏览器中的cookie
  - -1 表示没有值
  - UserDefault.standard.integer(forKey)方法找不到键对应的值时,默认返回0
    - 可以通过UserDefaults.standard.register(defaults: dictionary) 设置这个默认值

### dismiss 和 navigationController?.popViewController(animated: true)的适用场景
  - dismiss 只适用于 present modally
  - 使用popViewController是因为 show转场把View放到了导航堆栈中

### **let _ = **你告诉了Xcode不需要关心popViewController()的返回结果

### tint color
  - UIKit用来表示某种东西可以交互的一个颜色系统
  - 修改label的颜色为tintColor 
    - label.textColor = view.tintColor



### 等号
  - === 检查两个变量是否引用了同一个对象,即内存地址相同
  - == 检查两个变量的值是否相等,用于枚举,结构体,字符串 等值引用类型
  - 对于视图控制器而言，你使用两个等号它也会去比较引用而不是值，就像三个等号一样，但是技术上讲使用三个等号显得更加专业。


### Error
  - Error Domain=kCLErrorDomain Code=1
    - domain是kCLErrorDomain,意思是这个错误是来自Core Location（CL）
    - code为1，代表CLError.denied，意思是用户没有授权这个app可以获得位置信息。
    - **k- 前缀**经常被iOS框架用来表示某个名称是**常量**

### static 和class 定义类方法
  - 在方法的func关键字之前加上关键字static或者class都可以用于指定类方法.
  - 不同的是用class关键字指定的类方法可以被子类重写, 如下: 
    override class func work() {
      print("Teacher: University Teacher")
  }

  - 但是用static关键字指定的类方法是不能被子类重写的, 根据报错信息: Class method overrides a 'final' class method. 
  - 我们可以知道被static指定的类方法包含final关键字的特性--防止被重写. 

##[swift类型转换](https://www.cnswift.org/type-casting)
  - **向下转型**请参考上文链接
### as as! as?
  - as 
    - 从派生类转换为基类,向上转型(upcasts)
    - 消除二义性, 数值类型转换
    - switch中进行模式匹配
  - as!
    - 向下转型(Downcasting)
    - 使用as!表示你**确定这此转型一定会成功**
    - 由于是强制类型转换,所以转换失败runtime会报错
  - as?
    - 向下转型(Downcasting)
    - 转换不**成功会返回nil**
    - 成功的话**返回可选值类型*


### try try! try?
  - [参考](https://www.cnswift.org/error-handling)
  - try! 
    - 使用try! 表示你坚定的知道 后面的语句不会抛出错误!
    - 如果不想处理异常,而且不想让异常继续传播下去,可以使用try!.这有点儿类似NSAssert().但是一旦使用try!后,在可能抛出异常的方法中抛出了异常,那么程序会立刻停止.
  - try?
    - 用 try?通过将错误**转换为可选项**来处理一个错误
    - 如果一个错误在 try?表达式中抛出，则表达式的值为 nil

### is   
  - 进行类型判断, 
  - 也可以用来判断某个类是否遵循了某个协议


### 关键字
  - mutating
    - 和C语言不同, swift中,我们可以给enum和struct添加方法
    - 在struct 和 enum中, 通过mutating func xxx(){} 修改结构体或者枚举类型本身的值
      ```
      // 结构体使用
      struct Point {
          var x = 0, y = 0
          // 不添加 mutating 关键字，不能在实例方法中修改属性值
          mutating func moveXBy(x: Int, yBy y: Int) {
              self.x += x
              self.y += y
          }
      }


      // 枚举中使用
      enum ChangeStateSwitch {
      
          case Off, Low, High
      
          // 不添加 mutating 关键字，不能在实例方法中修改属性值
          mutating func next() {
              switch self {
              case .Off:
                  self = .Low
              case .Low:
                  self = .High
              case .High:
                  self = .Off
              }
          }
      }

      ```
    - 可以给 protocol中的方法声明 添加mutating, 在对应的struct实现改protocol的时候,同样需要对相应的方法添加mutating关键字
    - 举例
        ```
          // 在protocol中声明

        protocol MyProtocol {
            mutating func change()
        }

        // 结构体继承接口并实现对应方法

        struct MyCar: MyProtocol {
            var price = 3459234.23
        
            // 看这里
            mutating func change() {
                price = 56783.2
            }
        }
        ```