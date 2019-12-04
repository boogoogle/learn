### Reactor线程模型
  - 主从线程模型: 一组线程池接收请求, 一组线程池处理io
  - 主线程池(Client), 从线程池(Channel)

### channel
  - 每一个channel都由多个handler共同组成管道(pipeline)