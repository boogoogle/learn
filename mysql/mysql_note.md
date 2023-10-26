### 命令行登录mysql
  ```
  mysql -u root -p

  ```
  - [Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client](https://www.jianshu.com/p/c8eb6d2471f8)
  - 注意: 第二个'password' 要用自己真实的password


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

### [主键外键](https://www.liaoxuefeng.com/wiki/1177760294764384/1218728424164736)

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




## MySQL cheat sheet
### DataType
- char： 使用固定长度表示字符串，不足的话会在后面补空字符
  - 定长，效率高
  - 身份证，手机号，密码等
- varchar： 不定长，效率偏低。
- TIMESTAMP类型有专有的自动更新特性，这是啥？

### 数值类型
  - [参考这里吧](https://www.runoob.com/mysql/mysql-data-types.html)

- TODO： 一个汉字占用几个字符？
  - 比如 “hello” 和 “高兴”分别占用几个字符，用 char(几)表示？
- PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
  多个主键的应用场景是？ 好处和坏处？
  


### 插入中文报错
  因为mysql默认使用的字符集不是uft8，需要手动更改， 执行如下命令
``` 
　　alter database databasename character set utf8;
　　alter table tablename convert to character set utf8;
```



### 批量更新某个filed的值
  ```SQL
  -- 更新 order—_deposits 表里所有row的status 为 “created”
  UPDATE order_deposits set `status` = "created";
  ```


### 常用命令：
  - 连接 数据库：  `mysql -u root -p `
  - 列出 数据库：`show databases;`
  - 创建 数据库：  ` create database dbname;`
  - 删除 数据库：  ` drop database dbname;`
  - 选择 数据库：  ` use dbname;`
  - 显示数据库信息 `desc dbname;`
  - MySQL 创建数据表 `参考本文最前面`
  - MySQL 删除数据表 `drop TABLE table_name`
  - 查询数据,[参考](https://www.runoob.com/mysql/mysql-where-clause.html)
    ```SQL
    SELECT field1, field2,...fieldN FROM table_name1, table_name2...
    [WHERE condition1 [AND [OR]] condition2.....
    ```
  - 更新数据
  ```sql
    UPDATE table_name SET field1=new-value1, field2=new-value2
    [WHERE Clause]

  -- 比如
    update runoob_tbl 
    set title='Jack Ma' 
    where title='mayun';

  ```
  - 删除数据`DELETE FROM table_name [WHERE Clause]`
  - like 子句
    - 使用 where 只能精准获取指定的记录，比如 `where title='mayun'`
    - 使用like字句中的%可以表示任意字符
    ```sql
    SELECT field1, field2,...fieldN 
    FROM table_name
    WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
  ```
  - (UNION)[https://www.runoob.com/mysql/mysql-union-operation.html]
    - 联合查询多个表，根据 ALL｜distinct 决定是否返回重复的字段
  ```sql
  SELECT title from runoob_tbl WHERE  title like '%remark'
  UNION ALL 
  select merchant from runoob_time
  WHERE merchant='cook';

  ORDER BY title desc -- 排序， 对所有返回结果进行排序

  ```
  - [ALTER](https://www.runoob.com/mysql/mysql-alter.html)
    ```sql
      ALTER table runoob_time
      ADD country varchar(20) after id;  -- 在id列之后新增一列
    ```

  - [分组，貌似没啥用]
  - [inner join, left join, right join](https://www.runoob.com/mysql/mysql-join.html)
    - inner join
      - 可以省略inner，只写join
      - left join 
      - right join
  - [正则表达式]
  - [索引]
    - 索引是一种数据结构，用于**加快数据库查询**的速度和性能




