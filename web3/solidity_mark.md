### 记录一些 solidity 中的关键字或者常用范式

- Ownable: 表示这个合约归 **_部署者_** 所有
- modifier： be used to change the behaviour of functions in a declarative way.
- storage: 永久存储在区块链中的变量
- memory： 暂时变量，当外部函数对某合约调用完成时，内存型变量即被移除。
- payable： 当一个函数被 payable 修饰时， 表示调用这个函数， 可以附加发送一些 ETH（当然也可以不发）
  - 没有加 payable 的函数，则没有方法接受 ETH， 附加 ETH 调用会出错。
- public
  - functions are public by default, means that anyone(or any other contract) can call this contract's function
- private: function only can be invoked in this contract
  - pricate function should be named with an underscore _: \_setFee or setFee_
- external 和 public 类似，只不过这些函数 **_ 只能在合约之外调用_**， 他们不能被合约内的其他函数调用
- view： 告诉编译器， 函数不改变/不读区状态变量， 这样函数执行就不会消耗 gas 了

  - view 可以读取变量，但是不能改, Functions which do not change any state values
  - pure： Functions which do not change any state values, but also **_don't read any state values_**

- internal & external

  - these two visablility modifiers are related with **_ inheritance between contracts _**
  - internal:
    - is the same as private, except it's also **accessible to contracts that inherit** from this contract
  - external:
    - is similar to public, except that these funcions can **ONLY be called outside the contract**

- abstract contract
  - it contains at least one function without any implementation
  - is used as a **base contract**.
- interfaces
  - interfaces are similar to abstract contracts
    - **can not have** any funcions with implementation.
    - Functions of an interface can be only of type external.
    - can not have constructor
    - can not have state variables
- libraries
  - are similar to contracts but are mainly intended for reuse.

- assembly
  - 

### ERC20

- totalSupply():
  - Returns the amount of tokens in existence.
  - [refer](https://docs.openzeppelin.com/contracts/2.x/api/token/erc20#IERC20-totalSupply--)
- \_burn(address account, uint256 amount)
  - Destroys amount tokens from account, reducing the total supply.
  - Emits a transfer event with to set to the zero address.




### ERC721, [源码解读]（https://segmentfault.com/a/1190000016070774）
- \_safeMint 把 nft 给 msg.sender
  - \_safeMint(to, tokenId)
  - \_safeMint(to, tokenId, \_data)
- \_mint 是啥？
- onlyOwner: 修饰方法，表示只有 contract 的 owner 才能执行这个方法
- tokenOfOwnerByIndex: ERC721 的方法
- owner();获取当前 contract 的 owner

### Mark

- 1e18
  - 1e18 Wei means that Ether tokens have 18 decimals.
