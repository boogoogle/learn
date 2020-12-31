let str = "http://192.168.19.90:5000/yh-bargain/index.html?source=share&token=cvsLsIijXdJE4Iia56d9UAij8qIEmqf7Vjvys4XtCM8vcI8M8mXzqtcp1wDijmfU&unionId=oCjU7wBLWR9QLovvpB954amFd1aA&cityid=4&lng=119.26598579127104&lat=26.034952913616465&addressId=&appid=wx8d9cb6e54efdbaa9&v=6.14.0&fromorigin=miniprogram&deviceid=33a1b884-341c-48d5-972b-f42d545e6e2f&platform=devtools&userid=327819928285204857&sellerid=14&shopid=9L03&sellername=%E6%B0%B8%E8%BE%89%E5%88%B0%E5%AE%B6&shopname=%E3%80%90TOC%E4%B8%93%E7%94%A8%E3%80%91%E5%85%AC%E5%9B%AD%E9%81%93%E4%BB%93&scDistinctId=327819928285204857&FPName=&PPName=-1&sceId=1001&opId=oKjIA0RscyHlcdf-S4IwEhUYoeYA#/list"


function parseComplexUrl(str){

    let obj = {}
    let arr = str.split('#')
    let params = arr[0].split('?')
    let pairs = params[1].split('&')

    pairs.forEach(p=>{
        let kvs = p.split('=')
        obj[kvs[0]] = kvs[1]
    })

    console.log(obj)
    return obj
}

parseComplexUrl(str)
