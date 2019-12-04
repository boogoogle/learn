nginx:
  - 高性能的
  - http
  - 反向代理 imap/pop3/smtp
  - 服务器
  - 占有内存小,并发能力强

  

### 启动:
  - `nginx   -c /etc/nginx/nginx.conf  `
  - -c指定nginx启动时加载的配置文件,当然也可以不指定配置文件，省略-c，也可以启动，表示使用默认的配置文件。直接,nginx

### 停止:
  - nginx -s stop 或者
  - nginx -s quit 或者
  - pkill -9 nginx

### 重载:
  - `nginx -s reload`

### 检测配置文件是否正确
  - `nginx -t`

### nginx所实现的所有功能都是基于 nginx.conf文件