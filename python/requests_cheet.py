import requests

r = requests.get('https://www.zhihu.com/question/376928646')

print(r.encoding)

# 以请求返回的二进制数据创建一张图片，你可以使用如下代码：

# >>> from PIL import Image
# >>> from io import BytesIO

# >>> i = Image.open(BytesIO(r.content))
