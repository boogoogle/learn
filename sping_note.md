[b站视频笔记](https://www.bilibili.com/video/av47953244/?spm_id_from=333.788.videocard.0)
### 服务器端3层架构
  - 表现层
    - SpringMVC
  - 业务层
    - Spring 框架
  - 持久层
    - MyBatis

### MVC
  - Model模型 JavaBean
  - View视图  jsp/html
  - Controller Servlet


### SpringMVC
  - 介绍
    - 基于Java的实现MVC设计模型的请求驱动框架
    - 通过一套注解,让一个简单的Java类成为请求的控制器,而无需实现任何借口
    - 支持RESTful的变成风格
  - 优势
    - 清晰的角色划分
      - 前端控制器 DispatcherService
      - 请求到处理器映射 HandlerMapping
      - 处理器适配器 HandlerAdapter
      - 视图解析器  ViewResolver
      - 处理器或页面控制器 Controller
      - 验证器  Validator
      - 命令对象 Command
      - 表单对象 Form Object(请求参数绑定到的对象叫做命令对象)
    - 分工明确....
    - 命令对象是一个POJO,无需继承框架特定API

### IOC & DI
  - IOC: 翻转控制 Inversion Of Control
    - 翻转资源获取的方向: 容器主动将资源推送给它所管理的组件
    - 组件索要做的仅是选择一种合适的方式来接受资源
  - DI: 依赖注入: Dependency Injection
    - IOC的另一种表述方式
  - IOC前生
    - 分离接口与实现
  - 配置Bean


### ApplicationContext
  - 实现了父接口BeanFactory
  - 主要*实现类*
    - ClassPathXMLApplicationContext: 从类路径下加载配置文件
    - FileSystemXmlApplicationContext: 从文件系统中加载配置文件
  - ConfiguralbeApplicationContext 扩展于ApplicationContext,
    - 新增了两个方法, 让ApplicationContext具有启动,刷新和关闭上下文的能力
    - refresh()
    - close()
  - 初始化上下文时, 会实例化所有单例的Bean
  - WebApplicationContext: 专门为web应用准备

### 依赖注入的3种方式
  1. 属性注入(最常用)
     - 通过setter方法注入Bean的属性值或依赖的对象
     - 使用<property>元素,name指定Bean的属性名称, value或者<value>子节点指定属性值 
  2. 构造器注入
     - 通过构造方法注入Bean的属性值或依赖的对象,保证了Bean实例在实例化后就可以使用
     - <constructor-arg>元素里声明属性
     - 可以使用index和type区分重载方法的属性
     - 注意: 没有name属性 
  3. 工厂方法注入(很少使用,不推荐)




### 常用注解
  - @Bean: 
    - 告诉方法,产生一个对象,然后这个Bean对象交给Spring管理
    - 产生这个Bean对象的方法只会呗Spring调用一次,随后放到自己的IOC容器中
    - 默认Bean的名称就是该方法名