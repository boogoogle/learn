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



### location细读
```
        #匹配到url是/b开头的,
        #    可能是/b/xxx, 
        #    也可能是/bxxx,
        #  则在/test/b/ 下寻找, 此时 /test/b/ 为查找的根目录
        #    查找/test/b/ 目录下面 任何以/b开头的资源
        # 举例: 如果url是 /b/index.html
        #           那么nginx的查找路径是  /test/b/b/index.html
        #      如果url 是 /b-s.txt
        #           那么nginx的查找路径是 /test/b/b-s.txt 
        location /b { 
            root   /usr/local/etc/nginx/test/b/;
            index  index.html index;
            # try_files $uri /b/index.html;
        }

        # 如果url中有/b/这三个字符, 则以/test/b/为根目录
        # 然后查找url中的资源, 注意这里的url包括 /b/
        # 举例: 如果url是 /b/index.html
        #      那么nginx的查找路径是  /test/b/b/index.html(因为前面的/test/b/是根目录)
        # location /b/ { 
        #     root   /usr/local/etc/nginx/test/b/;
        #     index  index.html index;
        #     # try_files $uri /b/index.html;
        # }


        root         /home/ec2-user/workshop/h5;

        location / {
            try_files $uri $uri/ /home/ec2-user/workshop/h5/index.html;
        }

```

### 一个反向代理并且 rewrite路径的例子
```bash

user ec2-user;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;
http {
    upstream backend_server { # 本地后段服务地址
	    server	127.0.0.1:7001;
    }

    server {
        listen       80;
        listen       [::]:80;
        server_name  54.169.249.20;

        location / {
    
        root    /home/ec2-user/workshop/h5; # 纯静态前端dist地址
        index	index.html index;
            try_files $uri $uri/ index.html;
        }

        # 把前端的 /api/scalpers/user/login/captcha 转换成真实backend接口地址 /admin/h5/user/login/captcha
        location /api/scalpers/ {
            proxy_pass http://backend_server;		
            rewrite ^\/api\/scalpers/(.*)$ /admin/h5/$1 break;
            # 传入的url是 /api/scalpers/user/login/captcha
            # $1 是/user/login/captcha
            # 使用rewrite 替换/api/scalpers/为 /admin/h5/user/login/captcha
        }
    }
  }

```


