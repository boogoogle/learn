// 初始化空数组
var arr1 = []
var arr2 = Array<Int>() // 括号表示初始化,没有括号仅表示声明,没有值
var arr3 = [Int]()

// 初始化具有默认值的数组
var arr5 = [Int](repeating: 2, count: 5)


// 添加元素
arr1.append(1)
arr1 += [2,3,4] // +运算符后面的元素类型必须一致


// 插入元素
arr1.insert(6, at:1)


/*** 删除元素 ***/
//删除第一个元素
arr.removeFirst()

//删除最后一个元素
//保证数组非空
arr.removeLast()
//空数组时返回nil
arr.popLast()

//根据元素索引删除元素
arr.remove(at: 1)

//删除数组区间的元素
arr.removeSubrange(Range.init(NSMakeRange(1, 2))!)

//删除所有元素
arr.removeAll()

/*** 遍历数组 ***/
//删除第一个元素
arr.removeFirst()

//删除最后一个元素
//保证数组非空
arr.removeLast()
//空数组时返回nil
arr.popLast()

//根据元素索引删除元素
arr.remove(at: 1)

//删除数组区间的元素
arr.removeSubrange(Range.init(NSMakeRange(1, 2))!)

//删除所有元素
arr.removeAll()


/** 查找某一个元素的索引 **/
items.firstIndex(of: item)
