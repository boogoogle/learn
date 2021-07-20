
### 注意
  - mac 默认安装python2.7, pip install xxx 也是把包安装在2.7的目录下
  - brew 安装python3 后, 需要使用 pip3 install xxx 才能把包安装在3.x版本下,
  - 注意: 可能需要sudo权限

### 数据类型
  - 整数:
    - 处理任意大小的整数,包括正数负数
    - 也可以用进制数,比如十六进制: Oxff00
  - 浮点数, 也叫做小数
    - 数学写法，如1.23，3.14，-9.01
    - 科学计数法 1.23x109就是1.23e9
  - 字符串,用单引号或者双引号包裹, 参考[字符串和编码](https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896)
    - bytes类型的数据用带b前缀的单引号或双引号表示：`x = b'ABC'`
    - 包括转移字符 \n, \t, \\等
    - 如果有很多字符都需要转义,允许用r''表示,''内部的字符串默认不转义
       ```
          >>> print('\\\t\\')
          \       \
          >>> print(r'\\\t\\')
          \\\t\\
       ```
  - 布尔类型 True False (注意大小写)
  - 空值 
    - None不能理解为0，因为0是有意义的，而None是一个特殊的空值。
  - 变量
  - list
    - 有序集合
    - len() 获取长度
    - 使用索引访问list元素, 索引超出了范围时，Python会报一个IndexError错误，
    - 还可以用-1做索引，直接获取最后一个元素 list[-1]
    - append('sth') 追加元素到末尾
    - insert(index, 'sth') 插入元素到指定位置
    - pop() 删除列表末尾元素
    - pop(index) 删除指定索引处的元素
  - tuple(元组)
    - 定义 t = (1, 2)
    - tuple和list非常类似，但是tuple一旦初始化就不能修改
    - 因为tuple一旦被初始化就不能更改,所以没有insert等方法
    - 因为tuple不可变，所以代码更安全。如果可能，能用tuple代替list就尽量用tuple。
    - 定义tuple时有一些陷阱,特别是定义一个元素的tuple时,
      ```
      t1=(1) #这不是一个元组，等同于t1=1
      t2=(1,)#这是一个元组，等同于t2=1,

      # 创建元组可以省略小括号
      t3=1,2 # 等于t3=(1,2)
      t4,t5=t3 #  元组拆解 t4=1，t5=2

      # 那么可以这样实现两个变量交换
      t4,t5=t5,t4 # 后面t5,t4先组成元组(2,1)，然后再进行拆解重新赋值，最后t4=2，t5=1  
      ```

### 运算符
  - and or not
  - / 精确除法, // 地板除法

### 条件判断
  ```
    if: 
      case1;
    elif:
      case2;
    else:
      casex;
  ```
### 循环
  - 是for...in循环，依次把list或tuple中的每个元素迭代出来
  - while
  - break 结束循环
  - continue 停止这一步,转到下一步
  
### dict和set
  - dict 以key-value 形式保存数据,相当于其他语言中的额map
    - 定义:  d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
    - 取值 d['Bob']
    - key不存在，dict就会报错：``
      - 通过in判断dict中是否有key  ` 'Thomas' in d `
      - 通过get()方法获取数据,无则返回None,或者自己指定的value
        - ` d.get('Dan', -1) // -1 `
        - ` d.get('Dan') // None`
    - pop(key)方法,删除对应的键值对
  - set 
    - set和dict类似，也是一组key的集合，但不存储value。由于key不能重复，所以，在set中，没有重复的key。
    - s = set([1, 2, 3])
      - s.add(4), 可以重复添加，但不会有效果：
      - s.remove(4) remove(key)删除元素

### 编码
  - Python 3版本中，字符串是以Unicode编码
  - 关于python编码的知识,[看这里](https://www.liaoxuefeng.com/wiki/1016959663602400/1017075323632896)

### 函数
  - 空函数:什么都不做,可以作为占位函数
    ```
      def nop():
        pass // 缺少了pass,代码执行时会报错
    ```
  - 返回多个值
    - 返回值是一个tuple
    - 在语法上，返回一个tuple可以省略括号，而多个变量可以同时接收一个tuple，按位置赋给对应的值，
### math
  - math.sqrt(v) 开方
  - math.pow(b,2) 求幂,b是数字,2是幂指数

### 切片
  - 取一个list或tuple的部分元素是非常常见的操作
  - L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
  - `L[0:3]` 1取list的第0,1,2个元素
  - `L[:10]` 取前10个元素
  - 倒数切片  L[-2:] , 倒数第一个元素的索引是-1。
  - `L[:10:2]` 前10个数，每两个取一个
  - 甚至什么都不写，只写[:]就可以原样复制一个list：`L[:]`
  - 字符串'xxx'也可以看成是一种list，每个元素就是一个字符, 所以字符串也能用切片方法
### 可迭代对象
  - 判断一个对象是可迭代对象
    ```
      >>> from collections import Iterable
      >>> isinstance('abc', Iterable) # str是否可迭代
      True
      >>> isinstance([1,2,3], Iterable) # list是否可迭代
      True
      >>> isinstance(123, Iterable) # 整数是否可迭代
       False
    ```
  - for循环里引用多个变量
      ```
      for x, y in [(1, 1), (2, 4), (3, 9)]:
        print(x, y)

      ```

  - 迭代示例请参考 findMinAndMax.py

### 列表生成式
  - 要生成要生成list [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]有两种方式
    - list(range(1, 11))
  - 如果要生成[1x1, 2x2, 3x3],一是用append
    - for i in range(1, 11):
      - L.append(x * x)
  - 用列表生成式
    - `[x * x for x in range(1, 11)]`
### 字符串方法
  - strip() 去除首尾空格
  - str.replace()
    - a.replace('a', 'A') 返回一个新的字符串,原字符串a不会改变

### 模块
  - 
### 特殊函数
  - range()函数，可以生成一个整数序列,
    - 可以和list结合使用生成整数数组  list(range(5))
  
  - abs(num) 求绝对值
  - max(1,-1,2,4) 接受多个参数,返回最大值
  - 数据类型转换
    - int(v)
    - float(v)
    - str(v)
    - boolean(v)
  - isinstance 判断函数类型
    - `isinstance(x, (int, float))`
  - raise 报错
    - raise TypeError('bad operand type')

### IO编程
  - 打开文件, open(文件路径, 标识符)
    - `f = open('/Users/michael/test.txt', 'r')`
    - f.read()  #  读取
    - f.close() # 关闭
    - 用with打开文件可以自动调用close()
    - read() 一次性读取文件所有内容
    - 反复调用read(size),最多读取size大小内容,来读取大文件
    - readline() 每次读取一行
    - readlines() 一次读取所有内容并**返回list**
    - file-like Object
      - 除file外，还可以是内存的字节流，网络流，自定义流
      - StringIO就是在内存中创建的file-like Object，常用作临时缓冲。
    - 二进制文件
    - 要读取二进制文件，比如图片、视频等等，用'rb'模式打开文件即可：
    - `f = open(filepath, "rb")`
    - 以特定字符编码读取文件
      - f = open(filepath, 'r', encoding='gbk', errors='ignore') #忽略错误编码
  - 写文件
    - `f.open(filepath, 'w') # w会直接覆盖已存在文件
    - 'a' 参数会以追加的形式写入文件
    - f.write() 以string的形式写入文件,不能是bytes
  - BytesIO
    - f = BytesIO()
    - f.write('中文'.encode('utf-8')) # 注意写入的不是字符串,而是utf-8编码的bytes


### requests库使用小炒
  - r.encoding 获取编码, 
    - r.encoding="xxx"  修改编码
  - r.content 获取响应体
  - r.json() 可以把响应内容解释为json
  - 使用 r.raise_for_status() 或者检查 r.status_code 是否和你的期望相同。


### [virtualenv](https://www.liaoxuefeng.com/wiki/1016959663602400/1019273143120480)
  - mac下默认安装有py2.7, 要使用py3的venv,需要使用以下命令
  - ` python3 -m venv venv `
  - ` source venv/bin/activate ` // 激活局部环境

### 安装依赖
`pip3 install gunicorn`
or `python3 -m pip install gunicorn`

### pipenv
  - pipenv是唯一靠谱实用的python依赖管理工具
  - mac 安装
    - ` sudo pip3 install pipenv`
    - ` pipenv insatll` //将当前目录设置为虚拟环境
  - 参考自[这儿](https://blog.csdn.net/Hanniel/article/details/94294155)




### Tips
  - 替换pip3源为阿里云,不要用清华的,那个更新不及时
    - `pip3 config set global.index-url https://mirrors.aliyun.com/pypi/simple`
  - 有时候更新不及时,用默认源
    - `pip3 install tensorflow-gpu -i https://pypi.org/simple`