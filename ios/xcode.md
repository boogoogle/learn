### xcode项目**目录结构**







### 快捷键
  - cmd + shift + o    搜索文件名,快速打开
  - option + 单击  弹出变量or方法的详情
  - cmd + shift + l   打开library弹窗
  - cmd + 0 (数字) 切换左侧菜单栏
  - cmd + option + 0(数字) 切换右侧属性栏
  - cmd + option + y  底部调试区域显示
模拟器上: cmd + 12345 调整模拟器大小

### 比较两个文件差异
  - Xcode->Open Developer Tool->FileMerge


### cocoapods
  - <项目名称>.xcworkspace 和 <项目名称>.xcodeproj啥区别



### 一些问题
  - cocos 安装的pod删除之后,在预览的时候会继续报错. 但是直接模拟器调试是正常的
    - 解决方案: Product -> Clean Build Folder
  - 如果这里没有一个指向你的新的table view controller的大箭头，那么你需要选定ChecklistViewController，然后在其属性指示器里选中Is Initial View Controller复选框。
