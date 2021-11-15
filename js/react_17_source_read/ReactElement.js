const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,//表示是ReactElement类型

    type: type,//class或function
    key: key,//key
    ref: ref,//ref属性
    props: props,//props
    _owner: owner,
  };

  return element;
}