### Android Studio配置
- [SDK国内镜像,推荐使用国内的](https://blog.csdn.net/boonya/article/details/38752647)
- [gradle设置阿里镜像,项目级&全局](https://www.jianshu.com/p/b038bd95444b)



#### Project structure
- app
  - build 编译时文件,自动生成,不需关心
  - libs 第三方jar包,手动引入,会自动添加到构建路径上
  - androidTest 测试用例
  - src
    - main
        - java 主要文件目录
        - res: 
           - drawable图片,
           - layout布局,
           - values字符串文件等资源
             - strings
               - 代码中通过R.string.xxx_xxx来获取该字段的引用
               - xml文件中通过@string/xxx_xxx 来获取
        - AndroidManifest.xml 项目配置文件
          - 四大组件在此注册
          - 给应用程序添加权限声明
  - build.gradle
    - app目录下的gradle构建脚本,指定构建的相关配置
    - 指定当前项目的所有依赖关系
      - 本地依赖
      - 库依赖
      - 远程依赖
  - proguard-rules.pro 混淆规则配置
- settings.gradle
  - 指定项目中所有引入的模块,一开始只有app一个模块
  - 通常自动完成,少数情况下需要手动修改


### Log 工具(Android.util.Log)
- Log.v: 最琐碎的,意义最小的日志信息,日志级别最低  verbose
- Log.d: 调试信息  debug
- Log.i: 用于分析用户行为的信息, info
- Log.w: 警告信息 warn
- Log.e: 错误信息, 日志级别最高


## 常用组件
  - MenuInflater对象
    - inflate()方法来给当前活动创建菜单


### Intent: 
  - 介绍
    - 组件之间进行交互的重要方式,用于启动活动,启动服务,发送广播等
    - 隐式Intent
      - 给Intent传参action和category,由系统去分析这个Intent,并启动对应的活动
    - 显式Intent
      - 直接通过Activity.class 传入目标活动
  - 构造函数
    - `Intent(Context packageContext, Class<?> cls)`:
      - 第一个参数: 启动活动的上下文, 通过**FirstActivity.this**可以拿到该上下文
      - 第二个参数class: 指定想要启动的目标活动,通过**SecondActivity.class**拿到活动
    - ` Intent("com.example.activity.ACTION_START")` 直接打开一个活动的action
    - `Intent(Intent.ACTION_VIEW)` 打开浏览器,使用setData传递参数
  - 方法
    - intent.setData()
       -  可以在<intent-filter>中配置<data android:xxxx>来精确指定当前活动能够响应什么类型的数据
       -  只有<data>标签和setData传参完全一致时,当前活动才会响应该Intent
       -  一般不会在<data>中指定过多内容,一般指定个android:schema=https,表示响应所有https请求

  - 向目标活动传递数据
    - intent.putExtra(String name, Object obj);
      - 把要传递的数据暂存到intent中
    - getIntent() // 原生方法,获取启动当前活动的Intent
      - getStringExtra() // 获取传递过来的字符串
      - getIntExtra()
      - getBooleanExtra()
      - ... // 传递过来数据是什么类型,就用获取不同数据类型的方法
  - 返回数据给上一个活动
    - `startActivityForResult(intent, requestCode) // requestCode请求码`
    - `requestCode` 是我们在startActivityForResult 里面定义的
    - `setResult(RESULT_OK, intent);` //在下一个活动中,必须用intent保存数据,并调用setResult方法


### 活动的生存期
  - onCreate() 第一次被创建的时候加载
  - onStart()  活动由*不可见变为可见*
  - onResume() 活动准备好与用户进行交互的时候调用,此时互动一定位于返回栈顶端,并且处于运行状态
  - onPause()  系统准备去启动或者恢复另一个活动的时候调用
  - onStop()   当前活动完全不可见的时候调用; 如果启动的新活动是一个对话框形式,则会立即执行onPause,而onStop不会执行
  - onDestroy() 方法销毁钱,调用会活动变为销毁状态
  - onRestart() 活动从*停止*状态变为运行状态之前被调用

### 保存活动数据,防止活动被销毁临时数据丢失
  - `onSaveInstanceState`方法,
    - 它有一个Bundle类型的参数,改Bundle提供了一系列方法吧奥村数据
      - putInt(key, data), 
      - putString
      - ...
    - 使用方式: 
      - 将数据保存到Bundle对象中,然后把Bundle存到Intent里
      - 使用时: 从Intent中取出Bundle,再从Bundle里一一取出数据


### 活动的启动模式,: activity设置 android: launchMode 属性来设置
  - standard(默认模式)
    - 系统不会在乎当前活动是否已经存在于返回栈, 每次启动都会创建该活动的一个*新的实例*
  - singleTop
    - 若当前活动在栈顶, 则不新建实例; 只要不在栈顶,就新建一个,原来的不取消
  - singleTask
    - 检查*栈中*是否有已存在的活动,有则直接使用当前实例,*并把这个活动上的所有活动统统出栈*. 没有则新建
  - singleInstance
    - 会启用一个新的返回栈来管理这个活动
    - 多个应用程序共享同一个活动的实例,不管哪个应用访问这个活动,都共用同一个返回栈
    - 假设跳转逻辑如下: 
      - 桌面 -> 1starndard -> singleInstalce2 -> 3standard
      - 则返回逻辑为 3 -> 1 -> 2 -> 桌面

### 当前界面活动 & 随时随地退出程序
  - 参看BaseActivity例子
  - 注意public onCreate() 有两个参数, protected onCreate() 只能有一个参数
  - 杀掉当前进程:
    - 在销毁所有活动的代码后面加上杀掉当前进程的代码
      - `android.os.Process.killProcess(android.os.Process.myPid())`
      - myPid获取当前程序的进程id
      - killProcess()只能杀掉当前程序的进程,不能杀死其他程序


### 启动活动的最佳写法
  - 给每个活动添加类似的*启动方法*,明确需要传递的数据





## UI样式
  - android:gravity 指定文字对齐样式
    - 可选值: top bottom left right center 等
    - 用 | 指定多个值,例如 `top | left`
    - ```
        android:gravity="center"
        android:textSize="24sp"
        android:textColor="#00ff00"
        ```
  - 可见性 `android: visibility`
    - visable 
    - invisible  不可见,但是仍然占据原来的位置和大小; 可以理解为透明了
    - gone 控件不可见,也不占任何屏幕控件.
    - setVisibility(value)
      - value取值  View.VISIBLE, View.INVISIBLE, View.GONE 
    - progressBar.getVisibility() // 查看当前可见性


### 常用控件
  - Button
  - TextView
  - EditText  `getText().toString() 获取输入`
  - ImageView
    - 创建drawable-xhdpi目录,存放图片
    - drawable没有指定分辨率,一般不会用来存放图片
    - 设置图片的方式
      - `android:src="@drawable/imag_1"`
      - `imageView.setImageResource(R.drawable.img_2)`
  - ProgressBar 进度条
    - ` style="?android:progressBarStyleHorizontal"
        android:max="100" ` 修改样式
    - int progressBar.getProcess() 获取进度
    - void progressBar.setProgress(int) 设置进度
  - AlertDialog
  - ProgressDialog 用法和上面类似,不过可以添加显示一个带有进度条的dialog
    - setCancelable(true), 如果设置为false,则无法通过Back键关闭,需要手动关闭
    - progressDialg.dismiss() 关闭对话框


### 布局
  - LinearLayout 线性布局
    - orientation: 
      - vertical(竖直), 
      - horizontal(水平方向, 默认)
    - layout_gravity 空间在布局中的对其方式
    - layout_weight 使用比例的方式指定空间的阿晓
      - 使用weight需要把使用者的layout_width="0dp",*dp单位不能丢!*不然会有一个默认最小宽度
  - RelativeLayout 相对布局
    - 相对于*父元素*布局
      - layout_alignParentLeft
      - layout_alignParentRight
      - layout_alignParentTop
      - layout_alignParentBottom
      - layout_alignCenterInParent
    - 相对于*特定控件*布局
      - layout_above / layout_below
        - layout_toLeftOf
        - layout_toRightOf
      - layout_alignRight 一个控件的右边缘对其另一个控件的右边缘
      - layout_alignBottom="@id/xxxx"
      - layout_alignLeft
      - layout_alignRight
    - 帧布局 FrameLayout 应用场景少,碎片的时候会用
    - 百分比布局

### 自定义控件
  - 只引入布局
    - 可以直接通过include引入
  - 通过集成LinearLayout或者其他控件的 Inflater实现
    - 引入
        ```
        <com.example.uiwidgettest.TitleLayout
         android:layout_width="match_parent"
         android:layout_height="wrap_content"/>`

         
### ListView

  
        
