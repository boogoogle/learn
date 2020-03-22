/**
  元字符
    \d : 0-9之间的任意一个数字  \d只占一个位置
    \w : 数字，字母 ，下划线 0-9 a-z A-Z _
    \s : 空格或者空白等
    \D : 除了\d
    \W : 除了\w
    \S : 除了\s
    . : 除了\n之外的任意一个字符
    \ : 转义字符
    | : 或者
    () : 分组
    \n : 匹配换行符
    \b : 匹配边界 字符串的开头和结尾 空格的两边都是边界 => 不占用字符串位数
    ^ : 限定开始位置 => 本身不占位置
    $ : 限定结束位置 => 本身不占位置
    [a-z] : 任意字母 []中的表示任意一个都可以
    [^a-z] : 非字母 []中^代表除了
    [abc] : abc三个字母中的任何一个 [^abc]除了这三个字母中的任何一个字符  
 */


 /*
 代表次数的量词
    * : 0到多个
    + : 1到多个
    ? : 0次或1次 可有可无
    {n} : 正好n次；
    {n,} : n到多次
    {n,m} : n次到m次
 */
const url = 'https://www.zhihu.com/question/378458788?utm_division=hot_list_page'
const regexp = /question\/\d+/

let s = url.match(regexp)
console.log(s)













/**
 * match
 * 使用regExp查找字符串,若正则表达式有g,则返回一个数组,
 * 否则返回第一个匹配到的字符串
 * string.match(regExp)
 */


 /**
 * exec
 * 使用regExp查找字符串,返回一个数组
 * string.exec(regExp)
 */


 /**
 * test
 * 使用regExp查找字符串,返回 true or false
 * string.test(regExp)
 */


 /**
  * search replace split暂时未用到
  */