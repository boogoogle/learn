Servlet 容器为JavaWeb应用提供**运行时环境**

Tomcat 是Servlet容器



## Tomcat, 开源的servlet容器

- 启动: `./bin/startup.sh`
  - 可能没有权限执行`:chmod u+x *.sh`
  - `lsof -i:8080` 或者  `netstat`
- 默认打开localhost:8080
- conf/server.xml 中可以修改默认端口号
- 关闭 `./bin/shutdown`

### tomcat的目录结构
  - lib  依赖jar包
  - logs 日志文件,监控/调试tomcat
  - webapps 存放web项目
  - work 存放运行时数据

### web项目部署
  - 将项目直接放到webapps目录下面,项目的访问路径 --> 虚拟目录
    - 简化部署: 将项目打包成war包,然后将war包放到weapps目录下, war包会自动解压缩
  - 配置 conf/server.xml 中配置
    - 缺点: 必须重启tomcat服务
  - 在conf/Catalina/localhost创建任意名称的xml文件,在文件中编写`<Context docBase="" />` 
    - 虚拟目录就是.xml文件的名称
    - 特性: 这是一种热部署方式

### 静态目录和动态目录
  - 目录结构
    - java动态项目的目录结构
      - 项目根目录
        - WEB-INF目录
          - web.xml: web项目的核心配置文件
          - classes目录: 放置字节码文件
          - lib目录: 放置依赖的jar包

### tomcat集成到IDEA,并且创建javaEE,部署
  - 通过run > edit configuration 来修改配置



### Servlet: server applet
  - 概念: 运行在服务端的小程序
    - servlet就是一个接口,定义了Java类呗浏览器访问到(tomcat识别)的规则
    - 将来我们定义一个雷,实现servlet接口,复写方法
    - tomcat是servlet容器
  - servlet快速入门
    1. 创建JavaEE项目
    2. 定义一个类,实现servlet接口 
  - 执行原理
    - 1) 服务器接收到浏览器请求后,解析请求url路径,获取访问的Servlet的资源路径
    - 2) 查找web.xml文件,是否有对应的<url-pattern>标签内容
    - 3) 如果有,则找到对应的<servlet-class>对象名 
    - 4) tomcat会将字节码文件加载进内存,并且创建其对象
    - 5) 调用相应方法

#### Servlet生命周期
  - init
    - 只执行一次,所以是单例的
      - 问题: 多个用户同时访问时,可能存在线程安全问题
      - 解决:  尽量不要在Servlet中定义成员变量.即使定义了成员变量,也不要修改它.
  - service 
  - destroy
    - 只有服务器*正常关闭*时,才会执行

#### Servlet3.0
  - 好处: 
    - 支持注解配置,可以不需要web.xml了
    - 在类上进行注解`@WebServlet("/demo")` "/demo"是资源路径 

#### Servlet体系结构
    Servlet -- 接口
      |
    GenericServlet  --  抽象类
      |
    HttpServlet -- 抽象类

  - GenericServlet: 将Servlet接口中其他方法做了默认实现,只将service()方法作为抽象
    - 将来定义Servlet类时,可以继承GenericServlet,只实现service方法即可
  - HttpServlet
    - doGet, doPost
#### Servlet相关配置
  - urlpattern: Servlet访问路径
    - 一个servlet可以定义多个访问路径: `@WebServlet({"/dd", "/dd1", "/ddd2"})`
    - 路径定义规则:
      - `/xxx`
      - `/aaa/bbb``/xxx/*` 目录结构
      - `*.do`, 不能使用 `/*.do`

### HTTP
  - 请求消息数据格式
    - 请求行
      - POST /login.html    HTTP/1.1
    - 请求头
      - User-Agent
      - Referer: 可用来防盗链 & 统计; 直接在浏览器里打开的链接,referer是null, 必须是从当前页面访问另一个接口或者跳到另一个页面才可以有
    - 请求空行
      - 用于分割POST请求的请求头和请求体
    - 请求体
      - 正文: POST的的请求体

#### Request对象
    ServletRequest  -- 接口
        | 继承
    HttpServletRequest  -- 接口
        |
    org.apache.catalina.connector.RequestFacade 类(tomcat实现的,它实现了HttpServletRequest接口)
  - 功能
    1. 获取请求方式: `String getMethod()`   
    2. 获取虚拟目录: `String getContextPath()`  ※
    3. 获取Servlet路径 `String getServletPath()`
    4. 获取get请求参数 `String getQueryString()`
    5. 获取请求URI
       - `String getRequestURI()   // /day14/demo1`  
       - `String getRequestURL()   // http://localhost:8080/day14/demo1` 
    6. 获取协议和版本  `String getProtocol()   // HTTP/1.1`
    7. 获取客户端IP地址 `String getRemoteAddr()`
  - 获取请求头
    - 1. `String getHeader(String name)`       获取某一个header
    - 2. `Enumeration<String> getHeaderNames()`  获取所有的请求头名称; 迭代器模式
  - 获取请求体
    - 步骤: 
      - 1. 获取流对象
          - `BufferedReader getReader()` ;获取字符输入流,只能操作字符数据
          - `ServletInputStream getInputStream()` ; 获取字节输入流,可以获取所有类型的数据
      - 2. 从流对象中获取数据
  - 其他功能
    - 1. 获取请求参数通用方法 (不管get/post都可以用)
      - 常用 `String getParameter(String name)` 根据参数名称获取参数值, 例如 getParameter("username")
      - `String getParameterValues(String name)` 根据参数名称获取参数值的数组 例如hobby=xx&happy=game
      - `Enumeration<String> getParameterNames()` 获取所有请求参数的名称的枚举
      - 常用 `Map<String, String[]> getParamaterMap` 获取所有参数的集合
    - 中文乱码问题
      - 1. get请求, tomcat已经处理了
      - 2. post请求, 在取参数前 添加 `request.setCharacterEncoding("utf-8)`

  - 请求转发
    - 步骤
      - 1. 通过request对象获取请求转发器对象, RequestDispatcher getRequestDispatcher(String path);
      - 2. 使用RequestDispatcher对象进行转发  forward(ServletRequest request, ServletResponse response);
    - 特点
      - 浏览器地址栏路径不会发生改变
      - 只能转发到当前服务器内部资源中
      - 转发是一次请求
  - 共享数据
    - 域对象: 一个有作用范围的对象,可以在范围内共享数据
    - request域,代表一次请求的范围,一般用于请求转发的多个资源中共享数据
    - 方法
      - `void setAttribute(String name, Object obj)` 存储数据
      - `Object getAttribute(String name, Object obj)` 获取数据
      - `void removeAttribute(String name, Object obj)` 移除数据
  - 获取ServletContext
    - `req.getServletContext()`



=========== p702停止了,回去看数据库相关

  









### Java基础


#### 常量
1. 字符串常量, 双引号引起来的, "hello",  "Hello World", ""
2. 整数常量, 没有小数点的,23,-23
3. 浮点数常量 2.5
4. 字符常量,单引号引起来的, 'A', 'a' ,'中文'(和字符串常量的区别,且内部有且只能有一个字符,可以是空,但是不能直接连着两个单引号即:'', 'AB' 这种写法都是错误的)
5. 布尔常量, true false  (可以打印)
6. 空常量, null, 代表没有任何数据; (println(null)打印会报错)


### 基本数据类型  
- 整数型 byte short int(默认) long(8个字节,范围比float小)
- 浮点型 float(4个字节,范围更大) double(默认)
- 字符型 char
- 布尔型 boolean

#### 注意事项
1. 字符串不是基本类型,而是引用类型
2. 浮点型可能只是一个近似值,并非精确的值
3. 数据范围和字节数不一定相关, 例如float数据范围比long更加广泛,但是float是4字节,long是8字节
4. 浮点数默认类型是double,如果一定要使用float类型,需要加上后缀F
    如果是正式,默认int类型,如果一定要使用long类型,则加上后缀L

5. [作用域] 从定义变量的一行开始,一直到直接所属的大括号结束为止
6. 变量需要先定义并赋值,然后才能使用,否则会报错

### 引用数据类型
字符串, 数组, 类,接口, Lambla


### 类型转换
- 自动转换 (略)
- 强制转换 (一般不推荐使用,因为可能发生精度损失,数据溢出)
  - `int num = (int) 100F`

- 对于byte/short/char 三种类型来说,如果右侧赋值的数值没有超过类型范围


### 
- +
- -
- *
- /
- % (取模,取余数,只对整数型数据运算来说)

### 不同数据类型的运算,自动转换成数据范围大的类型
- int + double  => double + double
- char类型相加会转换成int, 值为ascii中字符对应的数值
- String类型, + 可以做字符串链接
  - `"hello" + "world"`
  - `"hello" + 20 + 30 // "hello2030"`

### 方法
- 方法的定义不能产生嵌套包含关系
- 重载(overload),方法名称相同,但是参数列表不同,会根据传参不同自动调用不同的处理逻辑
    ```
    public static int sum(int a, int b)
    public static int sum(int a, int b, int c)
    public static int sum(int a, int b, int c, int d)
    
    ```

```
public static void functionName(){
    // function body
}


```

### 项目结构
- project
  - module
    - package1
    - package2

- "包名"是包含文件夹层级的命名,


### idea intell J 常用  快捷键
1. cmd + y 删除一行
2. cmd + d 复制当前行到下一行
3. cmd + option + l // 格式化
4. option + shift + 上下箭头, 移动当前行
5. 5.fori会自动补全for循环,for(int i=0; i<5; i++){...}
6. shift + enter 下一行开始输入
7. shift + cmd + enter 自动补全分号;
8. ^ + n, generator代码


### 其他
1. print  (输出不换行), println(输出并换行)


### 类
1. int, char, String等成员都有默认值


### 局部变量和成员变量
1. 定义位置不一样
   - 局部变量: 在方法内部定义
   - 成员变量: 在方法的外部,直接写在**类**当中
2. 作用范围:
   - 局部: 只有方法内部可以使用
   - 成员: 整个类内部都可以使用
3. 默认值不一样
   - 局部变量: 没有默认值,必须先赋值(不然会报错),后使用;
     - 注意: 对于传递进来的参数,因为方法必然会被调用一次,所以形参的使用在编译器里是不会报错的
   - 成员变量: 有默认值,规则和数组一样
4. 内存位置不一样
   - 局部:栈内存
   - 成员: 对内存
5. 生命周期不一样
   - 局部: 随着方法进栈而诞生,随着方法出栈而消失
   - 成员: 随着对象创建而诞生,随着对象被垃圾回收而消失


### 面向对象三大特征: 封装,继承,多态
- 封装
  1. 方法就是一种封装(例如: 把找出数组当中最大值的代码封装进getMax方法中,使用的时候直接使用getMax(arr))
  2. 关键字private也是一种封装:
     - 定义Person的年龄时,无法阻止不合理的数值被设置进来,
     - 解决方案: 用private关键字将需要保护的成员变量进行修饰 


### 构造方法
  - 名称必须和所在类名称完全一样(包括大小写)
  - 构造方法不要写返回值类型,连void都不写
  - 如果没有手动编写构造方法, 编译器会默认给一个构造方法,没有参数,方法体内也不会做任何事情;若手动写了,编译器就不会增加了
  - 构造方法可以有多个,并且是可以重载(名称相同,参数不同))的

### 一个标准的java类
- 
  1. 所有的成员变量都要使用**private**关键字修饰
  2. 为**每一个成员变量**编写一对 Getter/Setter方法
      - 注意: 若基本类型boolean,需要用isXXX形式,而不是getXXX,同时setXXX不变))
      - Code > Generator 可以生成
  3. 编写一个**无参数**的构造方法
  4. 编写一个**全参数**的构造方法
- 这样标准的类也叫做 Java Bean


### 匿名对象
- 创建对象的标准格式  类名称 对象名 = new 类名称()
- 匿名对象 ``` new Person().name = "小王" ```
- 使用场景: 某个对象只会使用唯一的一次
- 可以作为传参,也可以作为返回值


### 常用的类
  - Scanner 实现键盘输入
  - Random 生成随机数字


### 数组 & 对象数组
  - 数组一旦创建,程序运行期间长度不可以发生改变

### ArrayList类
  - 集合长度可改变
  - 直接打印得到的不是地址值, 而是内容; 如果内容是空,得到的是中括号
  - 泛型只能是引用类型,不能是基本类型
  - 如果要向ArrayList总添加基本类型,必须使用基本类型的"包装类"

  - 常用方法
    - `public boolean add(E e)` 添加 E是泛型标记; 对于ArrayList,添加操作一定成功,其他集合就不一定了
    - `public E get(int index)` 读取
    - `public E remove(int index)` 删除
    - `public int size()` 获取集合长度

  - 包装类
    - byte    Byte
    - short   Short
    - int     Integer   [特殊]
    - long    Long
    - float   Float
    - double  Double
    - char    Character [特殊]
    - boolean Boolean


### 字符串
  - 字符串内容永不可变[重点]
  - 正是因为字符串内容不可改变,所以字符串是可以共享使用的
  - 字符串效果上相当于char[]字符数组,但是底层原理是byte字节数组
  - String.equals来进行字符串的内容比较
    - equals具有对称性
### 字符串的构造方法和直接创建


### 字符串的常量池(在堆heap里)
  - 程序中直接写的双**引号字符串**,就在字符串常量池中
  - 对于基本类型来说, == 是进行数值的比较
  - 对于引用类型来说, == 是进行数值的比较


## String
  - 字符串是常量,值再创建后不能更改
  - 字符串的底层是一个被final修饰的数组,不能改变,是一个常量`private final byte[] value`
### StringBuilder类
  - 背景: 普通的字符串相加,比如"a" + "b" => "ab", 最终会占用3块内存
  - 字符串缓冲区,可以提高字符串的操作效率
  - 底层也是一个*数组*,但是没有被fanal修饰,可以改变长度
  - 如果超出了StringBuilder的长度,会自动扩容

### 字符串常用方法
  1. equals, equalsIgonreCase
  2. public int length()
  3. public String concat(String str)
  4. public char charAt(index) 获取指定索引位置的单个字符(索引从0开始)
  5. public int indexOf(String char) 获取字符(串)首次出现的位置,若没有匹配则返回-1
  6. 截取 (不会改变原字符串)
     -  public String subString(int index); 从参数位置开始,一直到字符串末尾
     -  public String subString(int begin, int end) 左闭右开截取[begin,end)
  7. 转换
     - public char[] toCharArray()  转换成**字符数组**作为返回值
     - public byte[] getBytes()   获取底层的字节数组 
     - public String replace(CharSequence oldString, CharSequence newString), 将所有出现的老字符串替换成新的, 返回替换后的新字符串(注意!!! CharSequence 这里理解成String就行)
  8. 分割
     1. public String[] split(String regex) 按照参数规格,切割成若干部分
        1. (注意!!! regex是正则表达式)
### 创建一个字符串的方法
  1. String str = "abc" //会保存在 pool中
  2. String str = new String(byte[] bytes, int offset, int length)  // 不会保存在pool中






### static 含义
  1. 只在类中保存唯一一份, 那所有本类的对象都共享同一份
  2. 对于成员变量怎么用 , 学号,教室
  3. 对应成员方法: 
     1. static修饰的静态方法,不属于对象,只属于类
     2. *使用*: 类名称.静态方法名
     3. 对于本类中的静态方法,可以直接使用,不用写类名称
     4. *静态方法只能访问静态变量&静态方法*,成员方法二者都可(因为在内存中是[先]有的静态内容,[后]有的非静态内容)
     5. 静态方法中不能使用this关键字
  4. 静态方法&静态属性和对象无关,只和类有关
  5. 静态代码块: 
     1. 当第一次使用本类时, 静态代码块执行唯一的一次
     2. 静态内容优先于非静态,所以静态代码总是比构造方法先执行
     3. 典型用途: 用来一次性的对**静态成员变量**进行赋值


### Arrays类, 一个与数组相关的工具类,提供了大量的静态方法,用与常见的数组操作
  1. public static String toString(数组)  转换成字符串输出, **不会改变原数组** Arrays.toString(array)
  2. public static void sort(数组)  升序排序, **会改变原数组** Arrays.sort(array)
     1. 如果是数值,默认按照数值从小到大排序
     2. 如果是字符串,默认按照字母升序
     3. 如果是自定义类型,那么这个自定义类需要有Comparable或者Comparator接口的支持


### Math类
  - 4个方法


### 继承
  - 父类,也叫基类,超类
  - 子类,也叫派生类
  - super.num 访问父类的成员变量
  - this.num 访问本类的成员变量
  - @override 
    - 覆盖重写,这个注解不是必须的,只要子类中对方法的名称参数相同就可以实现覆盖效果.但是*建议写*
    - 子类方法的返回值必须*小于等于*父类方法的返回值范围
    - java.lang.Object类是所有类的最终父类
    - 子类变量|方法的权限必须**大于等于**父类变量|方法的权限
  - 继承关系中,父子类构造方法的访问特点
    - 1. 子类的构造方法当有有一个默认隐含的`super()`调用, 所以一定是先执行父类的无参构造方法,再调用子类构造方法
    - 2. 子类可以通过super调用父类的重载构造(就是那些人为写的,有参数的父类构造函数)
    - 3. 只有子类构造方法,才能调用父类构造方法,并且super()必须是第一个语句
  - super的三种用法
    - 在子类的成员方法中,super.xxx 访问父类的成员变量
    - 在子类的成员方法中,super.method() 访问父类的成员方法
    - 在子类的**构造方法中**, 访问父类的构造方法



### 抽象
  - 抽象方法
  - 如果父类之中的方法不确定如何进行{}的方法实现, 那么这就是一个**抽象方法**
  - 抽象类: 抽象方法所在的类,必须是抽象类才行, 在class之前写上 abstract即可
  - 一个抽象类不一定拥有抽象方法
  ```  
  public abstract class Animal {
    public abstract void eat(); // 注意!!! 抽象方法后面没有大括号

    public void sleep(){}; // 普通方法,有大括号
  }
  
  ```
  - 使用
    - 1. 不能直接new 抽象类
    - 2. 必须用一个子类来继承父类 `public Cat extends Animal{}`
    - 3. 子类必须覆盖重写(也叫做实现)父类中的抽象类, 若不能全部重写父类中的抽象类,则此子类也必须是一个抽象类(用abstract修饰定义)
    - 4. 创建子类对象进行使用


### 接口和多态
  - 接口是一种 **公共的规范标准**
  - 接口是一种引用数据类型,最重要的内容是其中的 *抽象方法*
  - `public interface 接口名称 {}`
  - 具体看代码里

### 多态
  - extends继承或者implements实现, 是多态性的前提
  - 人 -> 学生 -> 小明 小明既是学生,也是人,他拥有学生的特性,也有人的特性.这就叫"多态性"
  - 定义: `父类名称 对象名 = new 子类名称()`  `People xiaoming = new Student()` 小明是Student的实例,那么必然是一个People

### 对象的向上转型 
  - 父类名称 对象名 = new 子类名称()
  - 例子: Animal animal = new Cat()  创建了一只猫,当做动物看待
  - 注意事项: 向上转型一定是安全的; 
  - 问题: 对象向上转型,就没法使用子类的方法了, 例如上面  animal.catEat()就会报错,

### 对象的乡下转型
  - 将父类对象,[还原]为本来的子类对象
  - 格式: 子类名称 对象名 = (子类名称)父类对象
  - 例子: Cat cat = (Cat)animal; 把上面的animal还原成cat. 
  - 注意: 还原对象必须是原来创建的类, 否则报错  ClassCastException

### instanceof 判断类
  - son instanceof father

### final 关键字
  - 标识最终的,不可改变的
  - 修饰类,方法,局部变量
  - 用法
    - 修饰类: `public final class 类名称{}` 不能有任何子类
    - 修饰方法:`public final void methodFinal(){//}` , 最终方法,不能被子类覆盖重写
    - 修饰局部变量: `final int num = 10`  只能被赋值一次,不能被修改,可以先定义,不赋值`final int num`
    - 修饰成员变量: `private final String className="三年级一班"` 成员变量必须被赋值,*或者*通过构造方法赋值

#### 什么叫不可变
  - 对于基本数据类型, 不可变指变量中的数据不可改变
  - 对于引用数据类型, 不可变指变量中的**地址**不可改变
  - final定义的变量和方法就是不可变的


### 四种权限修饰符
  - public
  - protected 自身,子类以及同一个包中类可以访问
  - (default)并不是关键字, 而是根本什么都不写
  - private    只能在类中,或者通过实例可以访问

### 内部类
  - 成员内部类 Body$Heart.class, 和成员方法/成员变量定义在同一个层级下
    - 使用: 
      - 1. 间接使用: 通过外部类对象,调用外部类的方法,在方法里面间接使用内部类方法
      - 2. 直接使用: 对象名 = new 类名称(); 外部类名称.内部类名称 对象名 = new 外部类名称().new 内部类名称()
  - 局部内部类(包含匿名内部类)
    - 定义在方法内部: 只能在当前方法中使用



### Object类
  - toString(), 默认打印内存地址, 可以重写
  - equals() 
    - getClass(o)使用反射技术判断o是否是Person类型,等效于(o instanceof Person))
    - Objects.equals

### Date类, 精确到毫秒
  - new Date()  // Mon Oct 14 15:31:36 CST 2019
  - new Date(Long date)  // 传入毫秒值
  - Long getTime(date) 返回毫秒值
  - DateFormat类
  - Date相关的方法使用的时候再看吧

### Calendar


### System 类
  - System.currentTimeMillis()  // 获取机器时间戳(毫秒值), 用来测试程序效率
  - System.arraycopy(src, srcPos, destPos, length)


====================================
>++++++++ 以上是基础,到p226 +++++++++<
====================================




====================================
>++++++++  以下从p241开始  +++++++++<
====================================

### 泛型
  - E e: Element元素
  - T t: Type类型
  - 通配符: <?>

### 常用类
  - Collection
    - static void shuffle(List<?> list, Random rnd) 使用指定的随机源对指定列表进行置换
      - 会随机打款集合中元素的顺序








  




### 字节和编码
- utf-8中3个字节是一个中文,gbk中两个字节是一个中文



## 属性集
### Properties类
- java.util.Properties类,继承自HashTable,标识一个持久的属性集
- 唯一和io流结合的集合,可以保存在流中加载
  - load
  - store

- 获取src路径下的文件的方式 --> ClassLoader 类加载器
- 
            ClassLoader cl = JDBCUtils.class.getClassLoader();  // 当前的类加载器
            URL res = cl.getResource("jdbc.properties");        // 当前类下面某个文件的资源定位
            String path = ((URL) res).getPath();   // 拿到path,是绝对路径           
            System.out.println(path);





********************
p395开始网络编程

### 通信
- 通过IO对象(IO对象是字节流对象))
  


### IO
  - I Input 输入(读取),把硬盘中的数据读取到内存中使用
  - O Output 输出(写入), 把内存中的数据,写入到硬盘里保存 vice versa
  - 流 数据(字符、字节) 1字符=2字节, 1字节=8二进制位
    - 1 字符流 Reader Writer
    - 2 字节流 InputStream OutputStream

  - 文件读取阻塞问题

### 对象的序列化和反序列化
  - 把对象以字节的形式写入到文件
  - 把以字节形式保存的文件读取出来成对象


### ServerSocket


### BS 服务器分析
  - p409 ,p410



### 函数式接口
  - java中指: 有且只有一个抽象方法的接口
  - 函数式接口,即适用于函数式变成场景的接口. java中的函数式变成体现就是Lambda,所以函数式接口就是可以适用于Lambda使用的接口.
  - 只有确保接口中**有且只有**一个抽象方法,java中的Lambda才能顺利进行推导.

```
修饰符 interface 接口名称 {
  public abstract 返回值类型 方法名称(可选参数值) {

  }
  // 其他非抽象方法内容
}
```
`public abstract` 可以省略,所以定义一个函数式接口很简单

```
public interface MyFunctionalInterface {
  void myMethod()
}
```





### MAVEN 
  - 安装: 
    - [下载](https://maven.apache.org/download.cgi)
    - 添加到.zshrc

  - pom.xml
    - 项目自身信息
    - 项目依赖jar包信息
    - 项目运行环境信息jdk,tomcat 等
  - idea maven配置
    - `-DarchetypeCatalog=internal` 配置不从远程服务器获取catalog

  - maven项目标准目录结构
    - src/main/java 核心代码
    - src/main/resources 配置文件
    - src/main/webapp 页面资源js/css/html
    - src/test/java 测试代码
    - src/test/recources 测试配置文件
    - src/conf/settings.xml 修改相关配置

  - 命令
    - `mvn clean`
    - `mvn compile`
    - `mvn test`
    - `mvn package`
    - `mvn install`
    - `mvn deploy`








### JSP
  - 本质是一个Servlet
#### 脚本
  - `<% 代码 %>`  定义java代码,在service方法中. service方法中可以定义什么,该脚本中就可以定义什么 
	- `<%! 代码 %>`             在jsp转换后的java类的成员变量(用的非常少)
	- `<%= 代码 %>` 定义的java代码会输出的页面上

#### JSP内置对象
  - 在JSP页面中不需要获取和创建,就可以直接使用的对象
    - request
    - response
    - out: 字符输出流对象,将数据输出的页面上,类似response.getWriter()类似
      - 区别: tomcat在真正在客户端响应之前,会先找response的缓冲区数据并发送,然后找out的缓冲区数据
        - response.getWriter()先与out输出; 
        - out会根据语句的定义先后输出

### Session
  - 概念: 服务端会话技术,再一次会话的多次请求间共享数据,将数据保存在服务器端的对象中. HttpSession
  - 快速入门:
    - 获取: req.getSession();
    - Object getAttribute(String name)
    - void setAttribute(String name, Object value)
  - 原理: Session实现是依赖于Cookie的,存储一个字符串,这个字符串指向后台的一块内存,类似`org.apache.catalina.session.StandardSessionFacade@3efd2db8`
  - 细节
    1. 当客户端关闭后,服务器不关闭,两次取到的session是否为同一个
       - 默认情况下,不是
       - 如果需要相同,可以服务端创建cookie, 键为JSESSION,设置max-age,让cookie持久化存储
         ```
         // 客户端关闭后,session也能相同
          Cookie ck = new Cookie("JSESSION", session.getId());
          ck.setMaxAge(60*60);
          resp.addCookie(ck);

         ```
    2. 客户端不关闭,服务器关闭后,两次获取的session可能一样吗
       - 不会,因为上一次session的地址值在服务器关闭后就销毁了 
       - session的钝化
         - 在服务器正常关闭之前,将session对象序列化到硬盘上
       - session的活化
         - 服务器打开后,tomcat会把session还原到内存中,但是idea中会失效,因为work目录每次重启都会被新建一次
    3. session失效 
       1. 服务器关闭
       2. session对象invalidate(); 自杀
       3. 默认时间是30分钟,可以在tomcat中配置 session-config
  特点
    - 用于存储一次会话的多次请求间的数据,存在服务器端
    - session可以存储任意大小的数据 
	



























### 其他问题
-  maven3.6.2有问题,降级为3.6.1
-  jdk1.8对应java8,与之对应的tomcat9.x
-  maven3.6.1中默认的tomcat是6.x,对于java8的版本不匹配,会报一些莫名的错误
