### 1. SwiftUI中的View
  - view没有frame的概念, 他们只有自己的bounds,但是bounds不能直接修改
  - 给view添加frame这个modifier, 并不是直接改变了view, 而是创建了一个新的view
  - 每个View对自己需要的size, 都有自己的想法, 这就是它们的**Behaviors**
    - 1. 类似于Vstack, 尽可能让自己内部的内容展示完整, 不会奢求额外空间
    - 2. 类似于Text, 只返回自己需要的size, 如果size不够，它非常聪明的做一些额外的操作，比如换行等等
    - 3. 类似于Shape, 给多大尺寸就使用多大尺寸
    - 4. 可能超出父控件的view
    - 5. 特殊组件,类似 Spacer...

### 2. 布局原则
  - 1. 当布局某个view时，其父view会给出一个建议的size
  - 2. 如果该view存在child，那么就拿着这个建议的尺寸去问他的child，child根据自身的behavior返回一个size，如果没有child，则根据自身的behavior返回一个size
  - 3. 用该size在其父view中进行布局


### tips
  - [使用ForEach循环输入视图](https://hicc.me/foreach-enumerated/)



### 参考链接
  - [SwiftUI 之 frame详解](https://zhuanlan.zhihu.com/p/148096591)
  - [How layout works in SwiftUI](https://www.hackingwithswift.com/books/ios-swiftui/how-layout-works-in-swiftui)
  - [Position & offset in SwiftUI](https://www.hackingwithswift.com/books/ios-swiftui/absolute-positioning-for-swiftui-views)
  - [Tips & Ticks](https://www.hackingwithswift.com/quick-start/swiftui/swiftui-tips-and-tricks)




curl -X GET \
  -H "X-LC-Id: fnjUKhQvsD8oFXSvwk76BeBM-gzGzoHsz" \
  -H "X-LC-Key: gK044vy1Cj2mwwJ6Gaaa2UW0,master" \
  -H "Content-Type: application/json" \
  https://fnjukhqv.lc-cn-n1-shared.com/1.2/rtm/conversations/5eef00a10d3a42c5fda6b448/messages?limit=10