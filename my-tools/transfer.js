const fs =require('fs') 
/**
 * 把js对象转换成dto
 */

const resource = {
  "scalperMinBalance": 1000,
  "scalperHoldForDeposit": true,
  "scalperNotAutoMatchIds": "",
  "scalperAllowDisableCard": true,
  "scalperDisableAllCards": true,
  "scalperManualModeMultipleOrders": false,
  "forceUserId": false,
  "forceUserLevel": false,
  "depositBlockTimeMin": 10,
  "depositBlockCount": 3,
  "depositLockCount": 10,
  "depositSpeedyAmounts": "",
  "depositParseName": false,
  "depositParseComment": false,
  "depositStrictTag": false,
  "transferAutoAssign": true,
  "transferAutoSplit": false,
  "transferAutoSplitCount": 3,
  "transferTimeout": 100,
  "transferTimeoutSpeedy": 0,
  "transferSmallTimeout": 2,
  "transferSmallAmount": 0,
  "transferMaxLimit": 0,
  "transferFailOnScalperCancel": false,
  "transferStrictTag": false,
  "transferAllowRetry": true,
  "withdrawalMaxLimit": 50000,
  "withdrawalTimeout": 100,
  "depositBankTimeout": 6,
  "depositAliPayTimeout": 6,
  "depositWechatTimeout": 30,
  "depositUsdtTimeout": 60,
  "phoneOrderTimeoutSec": 120,
  "extraRate": 0,
  "extraRateStartTime": "22:30",
  "extraRateEndTime": "3:30",
  "bankExtraRate": 0,
  "bankExtraRateStartTime": "22:30",
  "bankExtraRateEndTime": "03:30",
  "runMobile": true,
  "runQRCode": true,
  "alipayCookie": "",
  "usdtRate": null,
  "usdtRateMarkup": 0.07,
  "usdtWithdrawFeeTrc20": 2,
  "strictTags": "DDYL,LEWAN,QIUYOUHUI,TOUHAOWANJIA,TANQIU,QIUMENGHUI,YYZF001",
  "strictTransferTags": "DDYL,LEWAN,QIUYOUHUI,TOUHAOWANJIA,TANQIU,QIUMENGHUI,YYZF001",
  "noDecimalPointMerchants": "",
  "speedyMerchants": ""
}

function transfer2DTO(resourceObj){
  fs.writeFileSync('./result_dto.js', '') // 先清空

  Object.keys(resourceObj).forEach(key=>{
    const v = resourceObj[key]

    let _field = ['@StringField({ minLength: 1, maxLength: 16 })', 'string']

    if(typeof(v) === 'boolean') {
      _field = ['@BooleanField()', 'boolean']

    } else if( typeof(v) === 'number') {
      _field = ['@NumberField()', 'number']
    }

    const _str = `\n${_field[0]}\n${key}: ${_field[1]};\n`

    fs.writeFileSync('./result_dto.js', _str,{ 
      encoding:"utf8", 
      flag:"a+", 
      mode:0o666 
    })
  })
}

function transfer2Entity(resourceObj){
  fs.writeFileSync('./result_entity.js', '') // 先清空

  Object.keys(resourceObj).forEach(key=>{
    const v = resourceObj[key]

    let _field = [`@Column({ type: 'varchar', length: 100, comment: 'unknown' })`, 'string']

    if(typeof(v) === 'boolean') {
      _field = [`@Column({ type: 'boolean', default: false, comment: 'unknown' })`, 'boolean']

    } else if( typeof(v) === 'number') {
      _field = [`@Column({ type: 'int', default: 0, comment: 'unknown' })`, 'number']
    }

    const _str = `\n${_field[0]}\n${key}: ${_field[1]};\n`

    fs.writeFileSync('./result_entity.js', _str,{ 
      encoding:"utf8", 
      flag:"a+", 
      mode:0o666 
    })
  })
}


function clean(){
  fs.writeFileSync('./result_dto.js', '') // 先清空
  fs.writeFileSync('./result_entity.js', '') // 先清空
}


// transfer2Entity(resource)
// clean()

