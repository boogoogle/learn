### 文件&目录介绍
- [参考链接](https://hexo.io/zh-cn/docs/setup)

### 3-hexo
  - 需要把项目根目录下的_config.yml和theme/3-hexo/下的_config.yml做如下设置,只设置一个或者都不设置会出现本地orgithub pages静态资源404现象
  ``` 
  
  //_config.yml
    url: https://boogoogle.github.io/boo.github.io/
    root: /boo.github.io/

 // theme/3-hexo/_config.yml
  blog_path: /boo.github.io/
  ```
  