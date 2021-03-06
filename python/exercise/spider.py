from lxml import etree
from pyquery import PyQuery as pq
import requests
from pyppeteer import launch


url = "https://www.zhihu.com/billboard"
headers = {
    "User-Agent":"",
    "Cookie":""
}

response = requests.get(url, headers=headers)
html_str = response.content.decode()
html = etree.HTML(html_str)
print(html_str)

#获取知乎热榜排名标题热度
ret = html.xpath("//section[@class='HotItem']")
print(ret)

for table in ret:
    item = {}
    item['排名'] = table.xpath(".//div[@class='HotItem-index']/div/text()")
    item['标题'] = table.xpath(".//div[@class='HotItem-content']/a/@title")
    item['热度'] = table.xpath(".//div[@class='HotItem-metrics HotItem-metrics--bottom']/text()")
    print(item)