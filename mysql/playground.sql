CREATE table if not exists `runoob_tbl` (
	`id`    Int unsigned auto_increment,
	`title` VARCHAR(100) Not null,
	`create_time` timestamp not null, -- 这个不需要手动insert，会自动生成
	`submit_data` DATE, 
	Primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE table if not exists `runoob_time` (
	`id`    Int unsigned auto_increment,
  `date` DATE,
  `time` TIME,
  `year` YEAR,
  `datetime` DATETIME,
  `timestamp` timestamp,
  Primary key (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- 插入数据
INSERT INTO runoob_tbl (title) VALUES 
("布鲁斯's remark"),
("张恒's remark"),
("李元's remark"),
("雷军's remark"),
-- 结果： 
+----+--------------+---------------------+-------------+
| id | title        | create_time         | submit_data |
+----+--------------+---------------------+-------------+
|  1 | boo's remark | 2023-10-26 10:41:49 | NULL        |
+----+--------------+---------------------+-------------+
可以看到 create_time 自动生成了一个value，并没有手动insert
  - 下面的submit_data 需要手动输入才行


-- 查询数据

SELECT title,create_time from runoob_tbl;
+--------------+---------------------+
| title        | create_time         |
+--------------+---------------------+
| boo's remark | 2023-10-26 10:41:49 |
+--------------+---------------------+



INSERT INTO runoob_time (company, country, merchant) VALUES 
("Alibaba", "cn", "马云"),
("Baidu", "cn", "李彦宏"),
("Apple", "US", "cook"),
("AWS", "US", "Zores")