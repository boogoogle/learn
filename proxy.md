
### 查看当前的 termimal proxy config
```bash
env | grep -i proxy
```

### 取消所有proxy设置
  ```bash
unset HTTPS_PROXY  HTTP_PROXY ALL_PROXY
  ```



### npm设置和取消代理的方法
```bash

npm config set proxy=http://127.0.0.1:8087
npm config set https_proxy=http://127.0.0.1:8087

# 删除设置
npm config delete proxy
npm config delete https_proxy

```