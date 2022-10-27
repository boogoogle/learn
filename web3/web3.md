### ERC-20
  - fungible token
  - `ERC-20` specifically is a standard which outlines the technical specification of a fungible token.
  - [预言机](https://blog.chain.link/what-is-chainlink-zh/)
    - 



### 基础概念
  - `Gas` transactions made on the Ethereum network requires users to pay a transaction fee.





1ETH = 10^9 Gwei
1Gwei = 10^9 wei
1ETH = 10^18 wei, wei is the smallest denomination of ETH.

transfer 1ETH from on account to another, it costs 21,000 **gas units**
  we can also say it costs **21,000 gas**
  meanwhile the **gas price** is **200 Gwei**.
  => therefore, gas fees = 21,000 * 200 = 4,200,000 Gwei = 0.0042 ETH
    => the0.0042 ETH fees will goes to **the miner who mined the block containing Alice's transaction**


- Gas Limit refers to the **maximum amount of gas (units) you're willing to use** for the transaction. 
  - This is **set by the user**.
- Block Gas Limits
  - Ethereum network imposes a limit on the maximum amout of gas (units) allowed **in a single block**
  - This is done to ensure that each block stays within an allowable range of computational cost.

### After London Upgrade
- base gas price fee: 
  - the minimus price per unit of gas for getting your transaction included within this block.
  - is **calculated natively** by the network based on the demand for block space
- tripping(priority fees)
  - set by most wallets automatically
  - higher tip transactions tend to get higher priority
  - you can choose to set this manually


  ### variable block sizes
    - before London Upgrade, each block has a **maximum capacity of 15M gas**
      -  In times of high demand, this resulted in bad user experience, as blocks were operating at full capacity, and users had to wait for the demand to reduce to get included in a block.
    - after London Upgrade
      - Each block now has a **target gas limit of 15M gas**,
      - but **the size can increase or decrease** along with network demand, up until a maximum of **30M gas**.


### What is Mining
  - Mining 
    - is the process that helps create new blocks of transactions 
      => to be added to the Ethereum blockchain network.
    - also helps keep the network secure from attacks.
  - How are the Ethereum transactions mined
    1. A user **signs** a transaction request from their account.
    ...
  - Chain Selection Rules


### EVM
  - The state in Ethereum is stored as a really large data structure called a Merkle Patricia Trie.



## Sophomore(大二,二年级学生) Mixed Topics
### Providers and Signers
  - Provider: an Ethereum node **connection** that allows you to **read** data from its state.
    - can call **read-only** functions in smart contracts, such like
      - fetching balances of accounts
      - fetching transaction details
      - etc.
  - Signer: an Ethereum node **connection** that allows you to **write** data to the blockchain
    - do writing functions in smart contracts, such as
      - transferring ETH between accounts
    - can do **evenrything a Provider can**
  - Allowance: the amount fo something that is permitted
    - we need a safe way to **pull** tokens out of someone's account.
    - this is where the **Approve and Transfer** flow comes in.






### WagmiConfig: 
  - A *** collection of React Hooks *** containing everything you need to start working with Ethereum.





### Hardhat
-  Connecting a wallet or Dapp to Hardhat Network
```
// run Hardhat Network in a standalone fashion
npx hardhat node 

```



