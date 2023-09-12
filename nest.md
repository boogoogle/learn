## 部署

### nginx

systemctl restart nginx
service restart nginx

### install Git

`yum install git`

pm2
`-o ./api.log` 指定 pm2 的 log 目录

`-e ./api.log --merge-logs` 把 stderr 也放进来

### CLuster Mode with PM2

-

## prisma with nest

- install
  - `npm install prisma --save-dev`
- init
  - `npx prisma init --datasource-provider sqlite`
