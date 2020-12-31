### 安
  - 几乎所有linux发行版都内置sqlite3,包括MacOS
  - `sqlite3` 进入交互式界面,如果没有进入,参考文末的链接
### 注意事项
  - SQLite 是***不区分大小写***的
  - 
### 初始设置
```
.headers ON  // select语句显示表头


```

### 数据类型
  - NULL
  - INTEGER 带符号整数, 数值大小在1,2,3,4,6,8字节中
  - REAL   浮点数值, 8字节的 IEEE浮点数字
  - TEXT   文本字符, 使用数据库编码（UTF-8、UTF-16BE 或 UTF-16LE）存储。
  - BLOB   blob 数据，完全根据它的输入存储。
  - 没有布尔类型!!!,布尔值用整数0/1存储

### 创建数据库
  - ` sqlite3 dbname.db `  在当前目录下创建一个数据库, 并给你一个sqlite> 提示符
  - ` .databases ` 列出数据库
  - ` .quit ` 退出命令行
  - ` .help ` 帮助
  - 使用.dump到处数据库到一个文本文件中
    - ` sqlite3 testDB.db .dump > testDB.sql` 
  - 从生成的sql文件中恢复数据库
    - ` sqlite3 testDB.db < testDB.sql `

### 连接数据库(ATTACH DATABASE)
  - ` ATTACH DATABASE 'testDB.db' as 'TEST'` 使用数据库文件testDB.db,并把它和逻辑数据库TEST,绑定在一起
  - main 和 test 是保留数据库,不应该被ATTACH

### 分离数据库 (DETACH DATABASE)
  - ` DETACH DATABASE 'TEST' ` 断开TEST 和 数据库文件的连接

### 创建表
  - ` .schema TABLE_NAME ` 获取表的完整信息
  - `.schema` 不加任何参数, 列出所有表的create语句信息
```

CREATE TABLE COMPANY(
   ID INT PRIMARY KEY     NOT NULL,
   NAME           TEXT    NOT NULL,
   AGE            INT     NOT NULL,
   ADDRESS        CHAR(50),
   SALARY         REAL
);


CREATE TABLE DEPARTMENT(
   ID INT PRIMARY KEY      NOT NULL,
   DEPT           CHAR(50) NOT NULL,
   EMP_ID         INT      NOT NULL
);


ALTER TABLE chat_group_pair ADD COLUMN designate TEXT;


```



### references
  - [参考链接](https://www.runoob.com/sqlite/sqlite-installation.html)
  - [Sqlite 修改表名称、增加字段、查询表结构、修改表结构字段类型](https://blog.csdn.net/zp1307700/article/details/52848410)





