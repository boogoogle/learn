const fs =require('fs') 
/**
 * 把js对象转换成dto
 */

const resource = {
  "id": 177,
  "no": "T231014202438xwwao",
  "orderNo": "test231014_162212_59299610497015172444",
  "scalperId": 483,
  "scalperPhone": "CS015",
  "coinAmount": null,
  "coinRate": null,
  "amount": 1,
  "ip": "119.163.168.89",
  "status": "pending",
  "ethAddress": null,
  "fundBankCard": null,
  "bankName": null,
  "cardNo": null,
  "cardHolder": null,
  "transferOrder": 111,//relation
  "comment": "",
  "actualCoinAmount": null,
  "actualCoinRate": null,
  "actualAmount": 1,
  "manual": false,
  "manuallyClosedBy": "",
  "receiptUploaded": true,
  "receipt2Uploaded": true,
  "receipt3Uploaded": true,
  "remark": "",
  "createdDate": "2023-10-14T12:33:11Z",
  "depositDate": "2023-10-14T12:33:11Z"
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

// transfer2DTO(resource)
// transfer2Entity(resource)
clean()


