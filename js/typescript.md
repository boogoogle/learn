## [interface](https://typescript.bootcss.com/interfaces.html)
### interface不必 实现,可以当做类型约束使用
  ```
  interface LabelledValue {
    label: string
  }


  // 在TS里, interface不必 实现,可以当做类型约束使用
  function printLabel(lb: LabelledValue) {
    console.log(lb.label)
  }

  ```


### 可能有多个属性,可以这么标识
  ```

  interface SquareConfig {
      color?: string;
      width?: number;
      [propName: string]: any;  // 多个属性
  }
  ```
