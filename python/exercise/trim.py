#! /usr/bin/python3
# -*- coding: utf-8 -*-

def trim(str):
    i = 0
    l = len(str)
    j = l-1
    
    if(l == 0):
        return str
    while i < l:
        if(str[i] == " "):
            i +=1
        else:
            break
    while j > 1:
        if(str[j] == " "):
            j -=1
        else:
            break
    return str[i:j+1]


if trim('hello  ') != 'hello':
    print('测试失败! 1')
elif trim('  hello') != 'hello':
    print('测试失败! 2')
elif trim('  hello  ') != 'hello':
    print('测试失败! 3')
elif trim('  hello  world  ') != 'hello  world':
    print('测试失败! 4')
elif trim('') != '':
    print('测试失败! 5')
elif trim('    ') != '':
    print('测试失败!')
else:
    print('测试成功!')