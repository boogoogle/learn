# AWS 备忘录

### 设置VPC安全组
1. 什么是VPC
  -  Virtual Private Cloud（Amazon VPC）
  - [Amazon VPC 工作原理](https://docs.aws.amazon.com/zh_cn/vpc/latest/userguide/how-it-works.html)
  - VPC是仅适用于 （个人AWS账户）的虚拟网络， 它逻辑上与AWS上的其他虚拟网络隔离， 你可以给VPC指定
    - IP地址范围
    - 添加子网（subnet）
      - subnet是VPC内的IP地址范围
      - 可以将AWS资源（EC2，RDS等） 启动到subnet内
      - subnet 可以连接到互联网，其他VPC，并使用路由表【路由传入/传出子网】的流量
    - 添加网关
    - 关联安全组

2. 什么是EC2
  - [AWS_EC2_User_guide](https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/concepts.html)
  - Amazon Elastic Computed Cloud (Amazon EC2)


