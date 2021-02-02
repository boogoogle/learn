## Hooks:
- [useState](https://zh-hans.reactjs.org/docs/hooks-state.html):
  - 是替换而不是合并
    - 你不必使用多个 state 变量。State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组。然而，不像 class 中的 this.setState，更新 state 变量总**是替换**它***而不是合并***它。
- [useEffect](https://zh-hans.reactjs.org/docs/hooks-effect.html)
  - 在函数组件中,执行副作用操作
    - 副作用: 数据获取, 设置订阅, 手动更改DOM都属于副作用
    - 可以理解成componentDidMount,componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
  - 每次渲染和更新后都会执行!
    - [如何控制它?](https://zh-hans.reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)
      - 

- [使用Hooks常见问题,非常详细](https://zh-hans.reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)