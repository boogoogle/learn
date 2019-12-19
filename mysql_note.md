
```
insert into account values(null, '李四', 10000),(null, '赵六', 10000),(null, '刘能', 10000),

```
```
CREATE TABLE USER(
    - 主键自增
     id INT PRIMARY KEY AUTO_INCREMENT,
	 NAME VARCHAR(32),
	 PASSWORD VARCHAR(32)
);

INSERT INTO USER VALUES(NULL, "zhangsan", "123"), (NULL, "lisi","234");


select * from user where username="" and password=""
```


### 
- SQL注入问题:
  - 在拼接sql时,有一些sql的特殊关键字参与字符串的链接,就会造成安全性问题
  - 解决: PreparedStatement 
  - 
### PreparedStatement (后期都用这个对象,安全又高效))
  - 普通Statement执行的是静态sql
  - PreparedStatement执行预编译sql
    - 预编译sql,定义sql时, 参数使用?作为占位符: 
      - `select * from user where username=? and password=?`
    - 获取执行sql语句对象 
      - `PreparementStatement  ps = Connection.prepareStatement(String sql)`
    - 给?赋值: 
      - setXXX(position,value)
      - position是?的位置,从1 开始, value是sql的值
      - setXXX分别是setFloat,setString等


### JDBC事务管理
  - 一个包含多个步骤的业务操作,如果这个业务操作被事务管理,那么这多个步骤要么同时成功,要么同时失败
  - 步骤
    - 开启事务 setAutoCommit(boolean autoCommit) 调用该方法设置参数为false,即开启事务
    - 提交事务 commit()
    - 回滚事务 rollback()
  - 使用Commention事务来管理对象


### 数据库连接池
  - 概念: 本质是一个容器(集合),存放数据库连接的容器
    - 当系统初始化后,容器被创建,并在容器中申请一些连接对象,当用户访问数据库时,从容器中获取连接对象,访问完毕后,将连接对象归还给容器
  - 好处:
    - 节约资源
    - 用户访问高效
  - 实现
    - 标准接口 DataSource javax.sql包下
      - 方法:
        - `getConnection()`获取连接 
        - 归还连接: 乳沟连接对象Connection是从连接池中获取的,那么调用Connection.close()方法,会自动归还,而不是关闭
    - 实现: 由数据库厂商来实现
       1. c3p0,数据库连接池技术
       2. Druid: 阿里的
          - 使用xx.properties文件保存配置 
          - 文件名称可以任意,不会自动加载
          - 加载配置文件 Properties
          - 获取数据库连接池对象,通过工厂函数来获取 DruidDataSourceFactory
          - 获取连接对象: getConnection
        - 定义工具类,封装数据库连接池初始化等操作

    
### insert 插入数据
  - `INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );`
  - field一般都可以省略



  