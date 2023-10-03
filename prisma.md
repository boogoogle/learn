- `npx prisma migrate dev --name init`

  1.  It .creates a new SQL migration file for this migration in the prisma/migrations directory.
  2.  It runs the SQL migration file against the database.

- after migration, this.prisma will automatically has the Model you have declared in the schema.
- vscode 为啥不更新呢，需要打开一下那个 ts 文件才行

- `db push`

  1. it pushes the state of your Prisma Schema file to the database **_without using migrations_**
  2. it creates database if the database does not exist.

- 'argon2 安装失败`
  - 需要指定版本为 python2, 使用 where python or which python 来找到 python2 的路径 - 然后在项目根目录执行`npm config set python /path/to/executable/python2.7`
    - 设置 node-gyp 使用的 python 版本,在项目根目录执行
      - `node-gyp --python /path/to/python2.7`
  - argon2 要求 g++版本 5.0 以上,所以需要更新 g++
    - [centos 更新 g++参考](https://blog.csdn.net/chen134225/article/details/109856696)

### [Production and testing environments](https://www.prisma.io/docs/concepts/components/prisma-migrate/migrate-development-production)

- using the `migrate deploy` command to apply migrations.
- `npx prisma migrate deploy `
- this command should be part of an **_ automated CI/CD pipeline _**
  - don't recommand running this command locally to deply changes to a production database

### configure different .env files with Prisma

- [reference](https://www.prisma.io/docs/guides/development-environment/environment-variables/managing-env-files-and-setting-variables)

POSTGRES_PASSWORD
