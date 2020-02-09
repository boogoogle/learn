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

### 检测配置文件是否正确,同时会列出当前使用conf文件路径
  - `nginx -t`

### nginx.conf
  - nginx所实现的所有功能都是基于 文件
  - 最常用的http块: 代理,缓存,日志定义等大多数功能和第三方模块的配置都在这里
  - add_header: 给浏览器添加响应头, 例如添加跨域头
    ```

    // 前后端分离的工程，一般情况下是使用Ajax访问后端接口，Ajax的请求头为X-Requested-With，因此服务端要允许X-Requested-With的请求头
    add_header 'Access-Control-Allow-Headers' 'X-Requested-With';

    // 服务端要配置哪些域是可以跨域访问到本服务器资源的
    add_header 'Access-Control-Allow-Origin' '*';

    // 如果使用了add_header 'Access-Control-Allow-Credentials' 'true'，那么不能使用通配符
    add_header 'Access-Control-Allow-Origin' 'www.baidu.com';
    add_header 'Access-Control-Allow-Credentials' 'true';

    //服务器端要指定HTTP请求的方法
    add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS'


    ``` 
  - proxy_set_header: 给上游服务器设置请求头
    - 在转发的时候记录客户端的ip等信息


### 注意事情
  - nginx中location的转发是完全转发,
  - 也就是说针对location /api 的请求转发到另一台服务器后,接收方处理的请求仍是/api开头的,
  - 因为是字符匹配,所以有可能是/api/user 也可能是/api-xxxx


### 参考
  - [Nginx配置静态资源](https://www.cnblogs.com/weiyinfu/p/10387282.html)



nginx -t           #测试配置文件
nginx              #启动命令
nginx -s stop      #强制停止Nginx服务
nginx -s quit      #处理完请求后再停止服务
nginx -s reload    #重启命令
ps -ef |grep nginx #查看进程命令
nginx -v           #查看Nginx的版本号