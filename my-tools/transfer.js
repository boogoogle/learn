const fs =require('fs') 
/**
 * 把js对象转换成dto
 */

const resource = {
  "nickName": "",
  "authorizedBalance": 0,
  "alipayRate": 3.2,
  "rate": 2.7,
  "a2bRate": 3,
  "wechatRate": 3,
  "transferRate": 0,
  "smallTransferRate": 0,
  "minLimit": 1,
  "maxLimit": 49999,
  "minTransferLimit": 0,
  "maxTransferLimit": 0,
  "tags": "",
  "qrCodeTags": "superadmin9527",
  "transferTags": "",
  "priority": 0,
  "depositTimeout": 0,
  "enabled": true,
  "status": "started",
  "allowTransfer": true,
  "commissionMode": "",
  "manualMode": true,
  "holdForDeposit": true,
  "enableGoogleAuth": "",
  "remark": ""
}

function transfer2DTO(resourceObj){
  fs.writeFileSync('.temp/result_dto.js', '') // 先清空

  Object.keys(resourceObj).forEach(key=>{
    const v = resourceObj[key]
    let [realyKey, desc, required] = key.split('=')

    const requireStr = required ? '' : 'required :false'

    desc = desc === undefined ? '' : desc



    let _field = [`@StringField({ minLength: 0, maxLength: 16, ${requireStr} })`, 'string']

    if(typeof(v) === 'boolean') {
      _field = [`@BooleanField({ ${requireStr}})`, 'boolean']

    } else if( typeof(v) === 'number') {
      _field = [`@NumberField({ ${requireStr}})`, 'number']
    }

    const apiProperty = required 
    ? `@ApiProperty({ description: '${desc}' })`
    : `@ApiPropertyOptional({ description: '${desc}' })`


    const key_in_snake_case = chamel_to_snale(realyKey)

    const _str = `
    ${apiProperty}
    ${_field[0]}
    ${key_in_snake_case}: ${_field[1]};
    `

    fs.writeFileSync('.temp/result_dto.js', _str,{ 
      encoding:"utf8", 
      flag:"a+", 
      mode:0o666 
    })
  })
}

function transfer2Entity(resourceObj){
  fs.writeFileSync('.temp/result_entity.js', '') // 先清空

  Object.keys(resourceObj).forEach(key=>{
    const v = resourceObj[key]
    let [realyKey, desc, required] = key.split('=')

    desc = desc === undefined ? '' : desc


    let _field = [`@Column({ type: 'varchar', length: 100, default: '', comment: '${desc}' })`, 'string']

    if(typeof(v) === 'boolean') {
      _field = [`@Column({ type: 'boolean', default: false, comment: '${desc}' })`, 'boolean']

    } else if( typeof(v) === 'number') {
      _field = [`@Column({ type: 'int', default: 0, comment: '${desc}' })`, 'number']
    }
    const key_in_snake_case = chamel_to_snale(realyKey)

    const _str = `
    ${_field[0]}
    ${key_in_snake_case}: ${_field[1]};\n`

    fs.writeFileSync('.temp/result_entity.js', _str,{ 
      encoding:"utf8", 
      flag:"a+", 
      mode:0o666 
    })
  })
}

function superagentInitSql(resourceObj) {
  fs.writeFileSync('.temp/result.sql', '') // 先清空

  let str1 = 'INSERT INTO `app_users` (`username`,`password`, `invitationCode`'//

  Object.keys(resourceObj).forEach(key => {
    str1 +=  (',' + '`'  + key + '`')
  })

  str1 += ') VALUES ('

  str1 += `'superadmin9527', '596bfe4bb02db60c2a25965598529e7e', '37339636'`

  Object.keys(resourceObj).forEach(key => {
    str1 +=  (',' + resourceObj[key])
  })

  str1 += ')'

  fs.writeFileSync('.temp/result.sql', str1,{ 
    encoding:"utf8", 
    flag:"a+", 
    mode:0o666 
  })
}


function clean(){
  fs.writeFileSync('.temp/result_dto.js', '') // 先清空
  fs.writeFileSync('.temp/result_entity.js', '') // 先清空
}

function chamel_to_snale(littleCamelString){
  if(!littleCamelString) {
    return littleCamelString
  }
  let arr= littleCamelString.split('')
  let _rst = ''
  arr.forEach(ch=>{
    // if(charCodeAt(ch) < 90) {

    // }

   if(ch >= 'A' && ch <= 'Z') {
    _rst += '_' + ch.toLowerCase()
   } else {
    _rst += ch
   }
  })

  return _rst

}
superagentInitSql(resource)
// transfer2DTO(resource)
// transfer2Entity(resource)
// clean()


