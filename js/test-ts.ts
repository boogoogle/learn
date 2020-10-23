interface LabelledValue {
  label: string
}


// 在TS里, interface不必 实现,可以当做类型约束使用
function printLabel(lb: LabelledValue) {
  console.log(lb.label)
}