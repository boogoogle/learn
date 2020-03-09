# 要记得关闭打开的问题
import os
print("当前操作系统: " +os.name)

filepath = os.getcwd() + '/exercise/test.md'

# try:
#     f = open(filepath, 'r', encoding='utf-8')
#     print(f.read())
# finally:
#     if f:
#         f.close()

# with语句来自动帮我们调用close()
# with open(filepath, 'r') as f:
#     print(f.read())

# with open(filepath, "rb") as f:
#     print(f.read())


# ----- 写文件 -----

f = open(filepath, 'a')
f.write("hello 休息休息 python")
f.close()
        