from collections import Iterable

L = [1,42,36,4,8,9,2,34]


def findMinAndMax(l):
    if(isinstance(l, Iterable) == False or len(l)==0): 
        return (None, None)

    if(len(l) == 1):
        return (l[0], l[0])
    min = l[0]
    max = l[0]

    for cur in l:
        if( min > cur ):
            min = cur
        if( max < cur):
            max = cur
    return (min, max)

# 测试
if findMinAndMax([]) != (None, None):
    print('测试失败!1')
elif findMinAndMax([7]) != (7, 7):
    print('测试失败!2')
elif findMinAndMax([7, 1]) != (1, 7):
    print('测试失败!3')
elif findMinAndMax([7, 1, 3, 9, 5]) != (1, 9):
    print('测试失败!4')
else:
    print('测试成功!')