### 依赖管理
  - pring-boot-dependencies 版本仲裁中心
    - 以后我们导入的依赖默认*不需要写版*本, 
    - 没有在dependencies里面管理的依赖需要*声明版本号*
  - spring-boot-starter-web
  - spring-boot-starter...
### starters
  - 将所有的功能场景都抽取出来,做成一个个的starters(启动器), 
  - 只需要在项目里面引入这些starter, 相关场景的所有依赖就会导入进来.
### 主程序类(主入口类)
  - @SpringBootApplication ,说明是SpringBoot的主配置类
  - @SpringBootConfiguration, 它是SpringBoot定义的注解
    - @Configuration 标注一个配置, 它是Spring定义的注解
    - 配置类 --> 配置文件
    - 配置类也是容器中的一个组件: @Component
  - @EnableAutoConfiguration: 开启自动配置功能
    - SpringBoot自动配置之前需要配置的功能
    - @AutoConfigurationPackage: 自动依赖包
    - @Import({AutoConfigurationImportSelector.class})
      - Spring的底层注解@import,给容器导入一个组件,导入的组件由AutoConfigurationPackages.Registrar.class
      - 将*主配置类*(即@SpringBootApplication标注的类)的*所在包以及下面所有子包*里面的所有组件扫描到Spring容器
### 自动配置类, 免去了手动编写配置注入功能组件等的工作
  - 在启动的时候,从类路径下的META-INF/spring.factories中获取EnableAutoConfiguration指定的值
  - 将这些值作为自动配置类导入到容器中, 
  - 自动配置类生效,帮我们进行自动配置工作
  
### Sping Boot配置
  - Initializer快速创建项目
    - 主程序生成,只需要写业务逻辑了
    - resources
      - static 
      - template(模板引擎)
    - application.properties SpringBoot应用的配置文件(对默认配置进行修改)
  - 配置文件
    - 两个默认的全局配置文件
      - application.properties
        ```
        # 配置项目的访问路径, 这样项目的根目录就是localhost:8080/boot2/ 了
        #server.context-path=/boot2
        # 指定配置文件
        #spring.config.location=/user/boo/springConfig/xxxx.properties
        #spring.mvc.data-format="yyyyMMdd HH:mm

        ``` 
      - application.yaml
  - YAML
    - 标记语言, 后缀yaml/yml
    - 以数据为中心, 比json, xml更适合做配置文件
    - 语法
      - key: v; 标识一堆键值对(空格必须有)
      - 以空格的缩进来控制层级关系: 只要是左对齐的一列数据,都是同一个层级的
      - 属性和值大小写敏感 
    - 值的写法
      - 字面量: 普通的值(数字,字符串, 布尔)
        - k: v
        - 字符串不用加单/双引号
        - 单引号: 会转义特殊字符 \n 输出还是字符串 \n
        - 双引号: 不会转义特殊字符 \n 输出换行符
      - 对象 Map
        - k: v 在下一行来写对象的属性和值
          ```
            friends: 
              name: zhangsan
              age: 20 
          ```
        - 行内写法 
           ``` 
           friends: {name: zhagnsan, age: 23} 
           ```  
      - 数组 (List Set)
        - 用短横线标识数组中的一个元素
          ```
            pets:
              - cat
              - dog
              - pig
          ``` 
        - 行内写法
          ```
          pets: [cat, dog, pig]
          ```
      - @ConfigurationPropertions(prefix="person")
        - 默认从全局配置文件中获取值
        - 告诉SpringBoot将本类中的所有属性和配置文件中相关的配置进行绑定
        - 该组件必须在容器中(@Component),不然不会生效
      - @Value: 
        - `` @Value("${person.last-name}")``
        - 只在某个业务逻辑中获取某一个配置文件中的某个值,用@Value
      - @PropertySource
        - 加载指定的配置文件
      - @ImportResource
        - 导入Spring的配置文件,让配置文件里面的内容生效
        - 写到主应用类上
### 配置文件占位符
  - RandomValuePropertySource: 配置文件中可以使用随机数
    - `${random.value} ${random.int} ${random.long} ${random.int(10)} ${random.int[1,100]}`
  - 占位符获取之前配置的值,如果没有可以用: 指定默认值
    - `person.dog.name=${person.name: xxxx}` // 如果没有person.name则用xxxx来赋值给person.dog.name

### Profile
  - 对不同环境提供不同配置,可以通过激活,指定参数等方式快速切换环境
    - 1. 多profile文件形式
      - 格式: 
        - application-dev.properties
        - application-prod.properties
    - 2. 通过yaml的document块模式配置
    - 3. 命令行模式
      - `--spring.profiles.active=dev`

### 配置文件的加载位置
  - SpringBoot会扫描以下位置的application.properties或者application.yml作为默认配置文件
    - file:./config/    --file:是项目根目录?
    - file:./
    - classpath:/config/
    - classpath:/
    - 以上优先级顺序从高到低, 高的会覆盖低的
    - 通过配置spring.config.location来改变默认配置
### 外部配置的加载规则,有十几种,先不用看了...

### 自动配置原理
  - https://www.bilibili.com/video/av20965295?p=19
### @Conditional

### 日志框架,不看了,用到了再说


------------ 以下p28开始,-------------

## SpringBoot与Web开发
  
### 静态资源映射规则
  - 所有/webjars/**, 都去classpath:/META-INF/resources/webjars/找资源
    - webjars: 以jar包的方式引入静态资源, 用不到
    - /** 访问当前项目的任何资源(静态资源的文件夹)
      ```
        classpath:/META-INF/resources/
        classpath:/resources/
        classpath:/static/
        classpath:/public/
        / 当前项目的根路径
      ```
    - 手动配置静态资源目录
      - spring.resources.static-lcations=classpath:/hello/,classpath:/img,

### SpringBoot 对SpringMVC的自动配置
  - ContentNegotiatingViewResolver & BeanNameViewResolver 
    - 视图解析器ViewResolver: 根据方法的返回值的都视图对象(View), 视图对象决定如何渲染(转发、重定向等)
    - ContentNegotiatingViewResolver: 组合所有的视图解析器
    - 如何定制: 自己给容器中添加视图解析器, ContentNegotiatingViewResolver会自动注入
  - Converter, GenericConverter
    - public String hello(User user): 类型抓换使用Converter
    - Formatter:  专门给日期做格式化
      - 可以在application.properties里面修改格式化的格式
      - `spring.mvc.data-format="yyyyMMdd HH:mm`
  - HttpMessageConverters
    - SpringMVC中转换http请求和响应的: User user--> JSON
    - 是从容器中确定,获取所有的HttpMessageConverter
    - 自己给容器中添加HttpMessageConverter,只需要将自己的组件注册在容器中(@Bean @Component)
  - ConfigurableWebBindingInitializer
    - 初始化WebDataBinder
    - 请求数据 ==== JavaBean
### org.springframework.boot.autoconfigure.web: web的所有自动场景


### 扩展SpringMVC
  - 编写一个配置类(@Configuration), 是WebMvcConfigureAdapter类型,不能标注@EnableWebMvc

### 如何修改SpringBoot的默认配置
  - 模式: 
    1. 先看容器中是否有用户自动配置的(@Bean @Component),有就使用用户配置,无则自动配置.比如(ViewResolver)将用户配置和自动配置结合使用
    2.  @import(EnableWebMvcConfiguration)
  - @EnableWebMvc全面接管SpringMVC的配置,自动配置失效,不推荐!!! 


### RestfulCRUD
  - URI方式: /资源名称/资源标识
  - 用请求方式来区分不同请求
    - 查询员工 emp/id get
    - 添加员工 emp post
    - 修改员工 emp/id put
    - 删除 员工 emp/id delete
    - 查询所有员工 /emps


### 其他注解
  - @Repository 
    - 将数据访问层(DAO层)的类标识为Spring Bean
  - @RequestBody - 只能接受JSON数据!!!
    - 将Json格式的参数自动绑定到Entity类,
    - [参考](https://www.hangge.com/blog/cache/detail_2485.html)


### 返回json数据
  - 给Controller使用@RestController, springboot会默认使用Jackson转换实体类为json数据,发送给客户端

### 错误处理
  - 默认在ErrorMvcAutoConfiguration
    - DefaultErrorAttributes
    - ErrorBasicController
    - ErrorPageCustomizer
      - 
    - DefaultErrorViewResolver
  - 参照上面: 改写错误页面和错误json


### 嵌入式Servlet容器
  - SpringBoot默认使用tomcat为嵌入式的Servlet容器
  - 配置文件修改配置 1. (ServerProperties)
    - server.xxx 来修改通用的服务器配置,比如端口,访问路径
    - server.tomcat.xxx 来修改tomcat的相关配置
      - server.tomcat.uri-encoding=utf-8
  - 嵌入式修改配置 2. EmbededServletContainerCustomizer


#### 特殊的配置类名
  - xxxConfigurer 用来扩展配置
  - xxxxCustomizer 用来定制配置


### 注册Servlet三大组件
  - 由于SpringBoot默认以jar包的方式启动嵌入式的Servlet容器来启动SpringBoot应用,没有web.xml文件,所以采用以下方式注册组件
  - Servlet
    - ServletRegistrationBean
  - Filter
    - FilterRegistrationBean
  - Listener
    - ServletListenerRegistrationBean

### 使用其他Servlet容器
  - Jetty(长链接)
  - Underlow(并发性能好)

### 使用外部Servlet容器  
  - https://www.bilibili.com/video/av20965295?p=51
  - 现在用不到以后用到了在看吧


### 数据访问: 使用Spring Data统一处理,可以访问关系型&非关系型数据库
  - JDBC  MyBatis 持久化技术 Spring Data JPA
#### 使用jdbc & mysql
  - spring-boot-starter-jdbc
  - mysql-connector-java
  - 自动配置原理
    1. 参考DataSourceConfiguration,根据配置创建数据源,默认使用Tomcat连接池, 可以使用spring.datasource.source 指定自定义的数据源类型(c3p0, druid等)
    2. DataSourceInitializer: ApplicationListenter
      -  runSchemaScripts(); 运行建表语句
      -  runDataScripts(); 运行插入数据的额sql语句
      -  将文件命名为  `schema-*.sql` or `data-*.sql` 
         -  默认规格是schema.sql 或者schema-all.sql
         -  要使用-*,需要自己指定
      -  必须要加always，不然不会自动读取schema文件 `initialization-mode: always`
  - 操作数据库: 自动配置了jdbcTemplate  

#### mybatis
  - sqlsessionfactory干啥的 ?
  - 需要写一个mybatis的config
    - 自动把小驼峰转换成大驼峰
  - 直接格SpringBootApplication的注解上添加 @MapperScan,指定包名,可以扫描指定package中的Mapper生效使用
    - @MapperScan(value = "com.booo.spring.mapper")
  - 使用方式
    - 1. 全注解方式
    - 2. 配置文件方式

### JPA
  - SpringData 简化数据访问
    - SpringDataCommons项目提供了一套统一个标准,包含CRUD,查询,排序和分页的相关操作.
    - 统一的Repository接口
    - 数据访问模板类
  - JPA: ORM(Object Relational Mapping)
    - 1. 编写一个实体类(bean)和数据表进行映射, 并且配置好映射关系
      ```
      // 使用JPA注解配置映射关系
      @Entity // 告诉JPA这是一个实体类(和数据表映射有关)
      @Table(name = "tbl_jpa_user")// @Table来指定对应的数据表,如果省略默认表名是类名小写(这里是jpauser)
      public class JpaUser {

          @Id // 标识这是一个主键
          @GeneratedValue(strategy = GenerationType.IDENTITY) // 自增主键
          private Integer Id;

          @Column(name="username", length = 50) // 对应数据表的一个列
          private String username;

          @Column // 默认列表就是属性名
          private String password;

      ```  
    - 2.编写一个Dao接口来操作实体类对应的数据表(Repository)
       ```
       public interface JpaUserRepository extends JpaRepository<JpaUser, Integer> {}

       ``` 
    - 3.基本配置
      ```
      spring:
          jpa:
            hibernate:
        #       更新或者创建数据表
              ddl-auto: update
        #      控制台显示sql
            show-sql: true
      ```
    