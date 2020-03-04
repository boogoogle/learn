### Android Studio配置
- [SDK国内镜像,推荐使用国内的](https://blog.csdn.net/boonya/article/details/38752647)
- [gradle设置阿里镜像,项目级&全局](https://www.jianshu.com/p/b038bd95444b)
- [Android Studio官方文档(包括gradle等)](https://developer.android.google.cn/studio/build/gradle-tips?hl=zh-cn)
- [Android文档](https://developer.android.google.cn/docs?hl=zh-cn)


#### Project structure
- app
  - build 编译时文件,自动生成,不需关心
  - libs 第三方jar包,手动引入,会自动添加到构建路径上
  - androidTest 测试用例
  - src
    - main
        - java 主要文件目录
        - raw 存放各种原生资源(音频，视频，一些XML文件等)，我们可以通过openRawResource(int id)来获得资源的二进制流！其实和Assets差不多，不过这里面的资源会在R文件那里生成一个资源id而已
        - res: 该文件夹下的资源文件都会在R.java文件下生成对应的资源id
           - drawable: 图标有固定的尺寸，不需要更改
           - layout布局,
           - mipmap-xxx 存放不同尺寸的图片文件,或者有动画则放在这下面
           - values字符串文件等资源,可以参考[这篇博客](https://blog.csdn.net/wjrong_1/article/details/20918759)
             - strings.xml
               - 代码中通过R.string.xxx_xxx来获取该字段的引用
               - xml文件中通过@string/xxx_xxx 来获取
             - styles.xml: 风格样式设置,
             - dimen.xml 存放尺寸标准, 可以使用Resources.getDimension()获得这些资源
             - attrs.xml 通常运来存放自定义控件的新属性(不一定非得叫attrs.xml,可以是xyz.xml只要里面的标签定义了,就能通过R.stylable.xxx 来获取)
        - AndroidManifest.xml 项目配置文件
          - 四大组件在此注册
          - 给应用程序添加权限声明
          - theme
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
    - ConstraintLayout
      - [ConstraintLayout性能优势](https://mp.weixin.qq.com/s/gGR2itbY7hh9fo61SxaMQQ)
      - [ConstraintLayout使用](https://blog.csdn.net/guolin_blog/article/details/53122387)


### 自定义控件
  - 只引入布局
    
    - 可以直接通过include引入
  - 通过集成LinearLayout或者其他控件的 Inflater实现
    - 引入
        ```
        <com.example.uiwidgettest.TitleLayout
         android:layout_width="match_parent"
         android:layout_height="wrap_content"/>`
        ```


### ListView
  - 数组中的数据无法直接传递给ListView,需要使用适配器
  - ArrayAdapter: 
    - 通过泛型来指定要适配的数据类型,然后在构造函数中把要适配的数据传入
    - 它有多个构造函数的重载,注意根据实际情况选择使用
  - `android.R.layout.support_simple_spinner_dropdown_item` 是安卓的内置布局文件,只有一个TextView
  - 最后调用ListView 的setAdapter()方法,将构件号的适配器对象传入
  - 问题
    - 每次有新的item进入视野,getView方法都会被调用,从而调用布局文件并渲染,快速滚动时,会影响性能
    - 解决: convertView用于将之前加载好的布局进行缓存,可以重用布局

### RecyclerView





### Android Adapter
  - BaseAdapter
  - ArrayAdapter





### 常用API
  - `LayoutInflater.from(context).inflate(resourceId, parent, false);`
    - LayoutInflater的from方法构建一个LayoutInflater对象,
    - 然后调用inflate方法动态静态一个布局文件
    - 第二个参数是给加载好的布局再添加一个父布局
    - 第三个参数false的意思是: 不为新View添加父布局(但是第二个参数必须写?)
    - inflater 充气者,增压泵, inflation膨胀,通货膨胀 
  - View
    - `setTag()`
    - `getTag()`
  - Toast
    - `Toast.makeText(LayoutActivity.this, "bbbbb", Toast.LENGTH_SHORT)                  .show();`


### 注意问题
  - androidx 是对过去 support包的一层封装  [参考:你好,androidX！再见,android.support](https://www.jianshu.com/p/41de8689615d)



### Nine-Patch 图片




## 第四章, 手机平板兼容 -- 探索碎片
  - 暂时用不到,以后再看

## 第五章 广播机智
### 简介
  - 类型:
    - 标准广播(Normal broadcasts) 
      - 完全异步执行,
      - 广播发出后,所有接收器都会在同一时刻接受,没有先后顺序可言
    - 有序广播
      - 同步执行
      - 同一时刻只能有一个广播接收器收到这条广播消息.依次传递
  - 




## 第九章: 使用网络技术
  - OkHttp

  - 问题
    - 0. 首先要开启权限 `<uses-permission android:name=“android.permission.INTERNET”/>`
    - 1. 需要使用本地电脑的局域网ip,不能用localhost or 127.0.0.1
    - 2. *不允许在主线程*中访问网络,不然会报错`
      - at android.os.StrictMode$AndroidBlockGuardPolicy.onNetwork`
    - 





## ViewModel
  - ViewModel不会丢失,即使activity被销毁
  - 应用被杀死后再打开,ViewModel的数据会重建
  - implementation 'androidx.lifecycle:lifecycle-viewmodel-savedstate:1.0.0-rc03'
    - 应用进入后台呗系统杀死时保存部分数据,手动退出或杀死不会保留
  - AndroidViewModel 这里面可以直接通过getApplication访问全局作用域
  - ViewModelProviders





### Android View $ xml 相关
  - `android:id="@+id/my_button"`
    - @ 符号指示 XML 解析器应解析并展开 ID 字符串的其余部分，并将其标识为 ID 资源
    - 加号 (+) 表示这是一个新的资源名称，必须创建该名称并将其添加到我们的资源（在 R.java 文件中）内
    - 引用 Android 资源 ID 时，不需要加号，但必须添加 android 软件包命名空间，如下所示: `android:id="@android:id/empty" ` 



### TIPS
- onSaveInstanceState: 应用进入后台呗系统杀死时保存部分数据,手动退出或杀死不会保留
- Application 继承自 Context
  - context -> getApplicationContext()
  - application -> getApplication()
- Now that you're using LiveData from mSavedState, the MutableLiveData name isn't used anymore and can be removed.
- statusBarColor: res -> style.xml中配置
- <action android:name="android.intent.action.MAIN"></action>  进入应用默认打开的activity 
- <category android:name="android.intent.category.LAUNCHER" /> 
- res -> values -> dimen.xml 存放尺寸标准
- 长度单位 sp ,dp分别是啥?
- AttributeSet 使用布局的时候,传入的属性,都能通过这个AttributeSet获取到

### 第三方库
  -  RecyclerView
  -  CircleImageView
  -  AndroidUtilCode
  -  Glide // 加载完网络图片
  -  Glide-Transformations // 结合glide处理图片
  -  Realm 数据库操作(相对于sqllite更简单,更快)


### 视图and组件复用
  - include 方式
  - 自定义View 方式
  - 在style中配置分割线的样式,通过View style=@style/xxx 来设置 






## AndroidUtilCode

## Activity 过度动画
  - 打开Activity
  - 关闭Activity

## 任务和返回栈