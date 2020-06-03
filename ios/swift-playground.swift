import UIKit

var str = "Hello, playground"

let d: Double = 70 // 70.0
let f = 70         // 70
let fl: Float = 70 // 70.0

//print(d, f, fl)

// 值永远不会被隐式转换为其他类型。如果你需要把一个值转换成其他类型，请显式转换。
let label = "the width is "
let width = 34
let withLabel = label + String(width)
let wl2 = label + "\(width)"
//print(wl2)

// 使用[]来创建数组和字典
var shoppingList = ["catfish", "water", "tulips", "blue paint"]
var occupations = [
    "Malcolm": "Captain",
    "Kaylee": "Mechanic",
]


// 空数组或者字典，使用初始化语法。()表示初始化
let emptyArray = [String]()
let empayDictionary = [String: Float]()

// for in 遍历字典
//for key in shoppingList {
//    print(key)
//}
for(key,value) in occupations {
    //    print(key, value)
}

// 条件&循环
let individualScores = [75, 43, 103, 87, 12]
var teamScore = 0
for score in individualScores {
    if score > 50 {
        teamScore += 3
    } else {
        teamScore += 1
    }
}
//print(teamScore)

// 使用while循环

//var n = 2
//while n < 100 {
//    n = n * 2
//}
//print(n)


//..< 来标识范围,也可以使用传统写法
for i in 0..<4{
    //    print(i)
}



// 可选值: 某个变量的值可能是具体的,或者 nil
// 在类型后面加上一个问号(?)来标记该变量的值是可选的
var optionalString: String? = "Hello"
//print(optionalString == nil)

var optionalName: String? = "John Appleseed"
var mightNil: String? = nil//"nice"

if let name = mightNil {
    // 通过let来处理值缺失的情况
    // 如果mightNil == nil,大括号内的内容就不会执行
    print("Hello, \(name)")
}

// 函数和闭包 func
func greet(name:String, day:String) -> String {
    return "Hello \(name), today is\(day)"
}
greet(name:"boo", day: "Saturday")

// 使用元组: 让一个函数返回多个值,改元组的元素可以用名称或者数字来表示

func calcuteStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int){
    var min = scores[0],max=scores[0],sum=0
    for s in scores{
        if min > s {
            min = s
        }
        if(max < s){
            max = s
        }
        sum += s
    }
    return (min,max,sum)
}
let scores = [116,252,53,64,35,776,57,998]
let res = calcuteStatistics(scores: scores)
//print(res.min,res.max,res.sum)

// 函数可以带有 **可变个数** 的参数
func sum0(numbers: Int...) -> Int{
    var sum = 0
    for n in numbers{
        sum += n
    }
    return sum
}

// {} 创建一个匿名闭包,使用 in 关键字将参数和返回值乐行声明与包函数体进行分离
let sm = scores.map({
    (number: Int) -> Int in
    let res = 3 * number
    if(number % 2 == 1) {
        return 0
    } else {
        return res
    }
})
//print(sm)

// 对象和类
// 对象声明
class Shape {
    var n = 0;
    var name: String
    
    // 使用init来当构造函数
    init(name: String) {
        self.name = name
    }
    
    // 在删除对象之前进行一些清理工作,可以使用deinit创建一个析构函数。
    
    func description() -> String {
        return "A shape calld \(name) with \(n) sides"
    }
}
// 实例
let sp = Shape(name:"四边形")
sp.n = 4
//print(sp.description())


// 子类, 通过override来重写父类方法
class RoundShape:Shape{
    var radio:Int
    
    init(radio:Int, name:String){
        self.radio = radio
        super.init(name:name) // 父类构造器在最后
    }
    override
    func description() -> String {
        print("我是\(name),我的半径是\(radio)")
        return "round"
    }
    
    var perimeter: Double{
        get {
            return Double(radio * 2)
        }
        set {
            // newValue 是新值
            radio = Int(newValue / 2)
        }
    }
    
    
}
//let rspe = RoundShape(radio:22, name:"圆形")
//rspe.description()
//
//print(rspe.perimeter) // 44.0
//rspe.perimeter = 10
//print(rspe.radio) // 5

// 枚举和结构体

struct Human {
    var name = ""
    var age = 0
    var height = 0
    
    func introduce() {
        print("\(name)的年龄是\(age)岁, 身高为\(height)厘米")
    }
}

var tonyStark =  Human(name: "Iron Man", age: 58, height: 188)
//tonyStark.introduce()


// 协议和扩展

protocol flyable {
    func takeOff(speed: Int)
}

extension Human: flyable {
    func takeOff(speed: Int) {
        print("\(name) is flying at \(speed)")
    }
}

tonyStark.takeOff(speed: 800)






// 泛型

