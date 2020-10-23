const themes = {
  light: {
    foreground: "#000000",
    background: "orange"
  },
  dark: {
    foreground: "black",
    background: "green"
  }
};
const store = {
  state: { // 这里的state,以后换成module
      data: {
          theme: themes.dark,
          background: "blue",
          count: 0
      },
  }
}

const {data, methods} = store.state

let changeFlag = false
const toggleChange = () => {!changeFlag}

const dataProxy = new Proxy(data, {
    get(target, key) {
        return target[key]
    },
    set(target, key, value) {
        toggleChange(!changeFlag)
        console.log('set change', changeFlag)
        return Reflect.set(target.key ,value)
    }
})

methodsProxy.toggleTheme()