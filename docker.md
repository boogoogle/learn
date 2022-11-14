### 使用Dockerfile构建镜像
  - docker build -t imaegName:version .
  - -t ：指定要创建的目标镜像名

### 容器
  - 查看所有的容器
    - docker ps -a
  - 使用 docker start 启动一个已停止的容器：
    - docker start b750bbbcfd88 
    - docker stop container-id或者container-name
    - docker restart <容器 ID>
  - 进入容器
    - docker exec xxxx
    - docker attach xxxx 推荐大家使用 docker exec 命令，因为此退出容器终端，不会导致容器的停止。
  - 删除容器
    - docker rm -f 1e560fca3906
  - 清理掉所有处于终止状态的容器。
    - docker container prune
  - 重启
    - docker restart
  - 容器日志
    - docker logs container-id|container-name
  - 实时查看docker容器日志
      ```
      $ sudo docker logs -f -t --tail 行数 容器名
      例：实时查看docker容器名为s12的最后10行日志
      $ sudo docker logs -f -t --tail 10 s12  
      ```
### 运行一个 web 应用 & 端口映射
    - docker run -d -p 5000:5001 training/webapp python app.py
      - -d:让容器在后台运行。
      - -P:将容器内部使用的网络端口映射到我们使用的主机上。5000本机, 5001docker容器的端口

### 镜像使用
  - docker run -t -i ubuntu:15.10 /bin/bash  使用镜像启动一个容器,并进入其bash
    - -i: 交互式操作。
    - -t: 终端。
    - /bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
  - 删除镜像
    - docker rmi hello-world



### 容器与主机之间的数据拷贝
  - ` docker cp [options] Container_src_path dest_path `
  - ` docker cp [options] src_path Container_src_path`
  -  
       ```  
      docker cp /www/runoob 96f7f14e99ab:/www/ 
      ```

###  Container中安装vi
  - 
    ```
    apt-get update
    apt-get install vim

    ```
  -  下载速度慢, 改为国内的源
  -  ```  
        mv /etc/apt/sources.list /etc/apt/sources.list.bak

        echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >> /etc/apt/sources.list

        echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list

        echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list

        echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list

        #更新安装源
        apt-get update 
     ```



### nginx.conf默认路径
  - linux: '/etc/nginx/conf.d/default'



### docker mysql
  - 启动
    - -e 表示参数
    - -p 标识端口映射,本机3307 对应容器的3306
        ```
            docker run -p3307:3306 --name mysql101 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:tag
        ```
    - 高级操作 
	 - -v 把本地的文件夹(/my/custom)挂载到docker容器的(/etc/nysql/conf.d)文件夹下
	    ```
	    docker run --name mysql101 -v /my/custom: /etc/nysql/conf.d -e xxxxx
	    ```

### 在镜像中使用git
  - [使用 --mount指定挂载一个本地主机的目录到容器中 ](https://yeasy.gitbook.io/docker_practice/data_management/bind-mounts)
  ```
  docker run -d -P \
    --name decode_git_repo \
    --mount source=/Users/guoqiang/Desktop/decode_community,target=/boo_decode \
    bitnami/git
  ```
  - 命令行太麻烦了,可以用docker的桌面系统直接点点点完成
  - [需要在docker image中设置ssh](https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/GitHub-SSH-Key-Setup-Config-Ubuntu-Linux)



### docker compose
- 通过Compose, 使用YML文件来配置应用程序需要的**所有服务**,
- 然后,使用**一个命令**, 可以从YML文件中**创建并启动**所有服务
- 命令 `docker-compose up`
  - `-d` 后台打开
  - `-f` 指定文件




### 在docker中安装 vi

```
apt-get update

// 如果其他两行不成功，就加上中间这两行
#apt-get install apt-file
#apt-file update

apt-get install -y vim
```