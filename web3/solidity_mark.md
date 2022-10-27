### 记录一些solidity中的关键字或者常用范式

- Ownable: 表示这个合约归 ***部署者*** 所有
- modifier： be used to change the behaviour of functions in a declarative way.
- storage: 永久存储在区块链中的变量
- memory： 暂时变量，当外部函数对某合约调用完成时，内存型变量即被移除。
- payable： 当一个函数被payable修饰时， 表示调用这个函数， 可以附加发送一些ETH（当然也可以不发）
  - 没有加payable的函数，则没有方法接受 ETH， 附加ETH调用会出错。


### ERC721, [源码解读]（https://segmentfault.com/a/1190000016070774）
- _safeMint把nft给msg.sender
  - _safeMint(to, tokenId)
  - _safeMint(to, tokenId, _data)
- _mint是啥？
- onlyOwner: 修饰方法，表示只有contract的owner才能执行这个方法
- tokenOfOwnerByIndex: ERC721的方法
- owner();获取当前contract的owner





