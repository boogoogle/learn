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
        - 告诉SpringBoot将本类中的所有属性和配置文件中相关的配置进行绑定
        - 该组件必须在容器中(@Component),不然不会生效

### 配置文件注入
  - https://www.bilibili.com/video/av20965295?p=11
  - 