- 同步远程分支,清理本地已经无效的origin分支
  git remote prune origin

- 批量删除分支名带feature本地分支
  git branch -a | grep feature | xargs git branch -D

- 显示提交内容和修改的文件
  - git show --stat
