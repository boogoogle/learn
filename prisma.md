- `npx prisma migrate dev --name init`

  1.  It .creates a new SQL migration file for this migration in the prisma/migrations directory.
  2.  It runs the SQL migration file against the database.

- `db push`

  1. it pushes the state of your Prisma Schema file to the database **_without using migrations_**
  2. it creates database if the database does not exist.

- 'argon2 安装失败`
  - 需要指定版本为 python2, 使用 where python or which python 来找到 python2 的路径 - 然后在项目根目录执行`npm config set python /path/to/executable/python2.7`
    - 设置 node-gyp 使用的 python 版本,在项目根目录执行
      - `node-gyp --python /path/to/python2.7`
  - argon2 要求 g++版本 5.0 以上,所以需要更新 g++
    - [centos 更新 g++参考](https://blog.csdn.net/chen134225/article/details/109856696)

### 项目根目录

- /usr/local/lighthouse/softwares/nodejs/app/coolwork-backend
