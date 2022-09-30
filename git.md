- 同步远程分支,清理本地已经无效的origin分支
  git remote prune origin

- 批量删除分支名带feature本地分支
  git branch -a | grep feature | xargs git branch -D

- 显示提交内容和修改的文件
  - git show --stat




- 给git配置代理，取消代理
```

// 7890是本机ss或者其他vpn软件的接口
# 设置ss
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

# 设置代理
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy

```


# npm拉去git repo失败
```
# 60错误
error: RPC failed; curl 56 LibreSSL SSL_read: SSL_ERROR_SYSCALL, errno 60

# 解决办法1
git config --global http.postBuffer 1048576000

# 解决办法2
通过上面的方式设置github的代理

# 解决思路3
配置npm的http/s 代理
```
