CREATE TABLE user(
  user_id   VARCHAR(10) PRIMARY KEY,
  firstname VARCHAR(20) NOT NULL,
  lastname  VARCHAR(20) NOT NULL,
  gender    CHAR(1),
  age       INT,
  email     VARCHAR(20)
);

// 插入语句
INSERT INTO user 
VALUES
(52091111, 'Alice', 'Thoms','F', 25, '52091111@gmail.com'),
(52091112, 'Bob', 'Jan','M', 25, '52091112@gmail.com'),
(52091113, 'Lei', 'Li','F', 25,'5209121@gmail.com'),
(52091114, 'Hao', 'Wang','F', 25, '52341111@gmail.com'),
(52091115, 'Ning', 'Zhang','F', 25, '56791111@gmail.com'),
(52091131, 'Xiaolan', 'Ji','M', 25, '520dddd1@gmail.com'),
(52093111, 'Ze', 'Zhao','M', 25, '52078641@gmail.com'),
(52055111, 'Dong', 'Qian','F', 25, '33461111@gmail.com'),
(34091111, 'Jie', 'Sun','F', 25, '5204r671@gmail.com'),
(67091111, 'Shi', 'Li','M', 25,'5298741@gmail.com'),
(45091111, 'Wei', 'Zhou','F', 25, '52097865@gmail.com'),
;

CREATE TABLE teacher(
  teacher_id   VARCHAR(10) PRIMARY KEY,
  salary       FLOAT,
  office_addr  VARCHAR(50),
  user_id      VARCHAR(10),
  phone_number VARCHAR(11) NOT NULL,
  class_id     VARCHAR(10),
  course_id    VARCHAR(10),
  role         VARCHAR(8)
);

INSERT INTO teacher 
VALUES
('t52091111', 12000.00, 'Street 1', '52091111','15553123456', "cls1", 'cou1', 'major'),
('t52091112', 14111.05, 'Street 2', '52091112','15553123356', "cls2", 'cou2', 'assiss'),
('t52091113', 16131.40, 'Street 3', '52091113','15253123456', "cls3", 'cou3', 'major'),
('t52091114', 15121.10, 'Street 4', '52091114','15453123456', "cls4", 'cou4', 'major'),
('t52091115', 13111.70, 'Street 5', '52091115','15753123456', "cls5", 'cou5', 'assiss')
;

CREATE TABLE student(
  student_id   VARCHAR(10) PRIMARY KEY,
  user_id      VARCHAR(10),
  class_id     VARCHAR(10),
  course_id    VARCHAR(10),
  grade        FLOAT,
  degree       VARCHAR(10)
);

INSERT INTO student 
VALUES
('s52091131', 52091131, 'cls1', 'cou1', 0, 'master' ),
('s52093111', 52093111, 'cls1', 'cou1', 1.0, 'bachelor'),
('s52055111', 52055111, 'cls2', 'cou2', 2.0, 'master'),
('s34091111', 34091111, 'cls3', 'cou3', 2.0, 'master'),
('s67091111', 67091111, 'cls4', 'cou4', 4.0, 'bachelor'),
('s45091111', 45091111, 'cls5', 'cou5', 0.7, 'master')
;




CREATE TABLE manager(
  manager_id   VARCHAR(10) PRIMARY KEY,
  salary       FLOAT,
  office_addr  VARCHAR(50),
  user_id      VARCHAR(10),
  office_hour  VARCHAR(20),
  phone_number VARCHAR(11),
  is_supervisor    INT,
  responsibilities VARCHAR(20)
);

---
INSERT INTO manager
VALUES
('m52091111', 16000.0, 'Street1 Office1' ,52091111, '9am - 6pm', '14544543213', 0, 'all'),
('m52091112', 15000.0, 'Street2 Office2',52091112, '9am - 6pm', '45433234566', 0, 'edu'),
('m52091113', 20000.0, 'Street3 Office3',52091113, '9am - 6pm', '34533245678', 1, 'stuff')
;
----

CREATE TABLE class(
  class_id   VARCHAR(10) PRIMARY KEY,
  class_name VARCHAR(20) NOT NULL,
  major  VARCHAR(10) NOT NULL
);

INSERT INTO class
VALUES
('cls1', 'Human Interaction', 'CS'),
('cls2', 'Database', 'CS'),
('cls3', 'Drawing', 'Art'),
('cls4', 'Math', 'MIT'),
('cls5', 'Market', 'FIM')
;



CREATE TABLE course(
  course_id   VARCHAR(10) PRIMARY KEY,
  course_name VARCHAR(20) NOT NULL,
  course_time DATE NOT NULL,
  assessment  VARCHAR(20) NOT NULL
);

INSERT INTO course
VALUES
('cou1', 'Human Interaction', '2020-08-08 22:20:46', 'assessment page link'),
('cou2', 'Database', '2020-08-08 22:20:46',  'assessment page link'),
('cou3', 'Drawing', '2020-08-08 22:20:46', 'assessment page link'),
('cou4', 'Math', '2020-08-08 22:20:46', 'assessment page link'),
('cou5', 'Market', '2020-08-08 22:20:46', 'assessment page link')
;

```
// 在student表中,通过class_id作为外键, 和class表关联起来


ALTER TABLE student
ADD CONSTRAINT fk_class_id // 外键约束的名称 fk_class_id 可以任意
FOREIGN KEY (class_id)   // 指定class_id 作为外键
REFERENCES class (id); // 指定了这个外键将关联到 class 表的 id 列(即class的主键)


```
// 关联student 和 class
ALTER TABLE student
ADD CONSTRAINT fk_class_id
FOREIGN KEY (class_id)
REFERENCES class (class_id);


// 关联student 和 course
ALTER TABLE student
ADD CONSTRAINT fk_course_id
FOREIGN KEY (course_id)
REFERENCES course (course_id);


// 关联 teacher 和 course
ALTER TABLE teacher
ADD CONSTRAINT fk_t_course_id
FOREIGN KEY (course_id)
REFERENCES course (course_id);

// 关联 teacher 和 class
ALTER TABLE teacher
ADD CONSTRAINT fk_t_class_id
FOREIGN KEY (class_id)
REFERENCES class (class_id);


// 关联 manager 和 user
ALTER TABLE manager
ADD CONSTRAINT fk_m_user_id
FOREIGN KEY (user_id)
REFERENCES user (user_id);

