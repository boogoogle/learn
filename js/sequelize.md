### Database synchronization (自动创建表)
  - just specify your model structures and let Sequelize to create the table automatically
  - Model.sync({force: true}) this will drop the table first and re-create it afterwards


### 表操作
  - 一次写入多条记录

### 数据类型
  - 整型: Sequelize.INTEGER , ***没有NUMBER!!!!***