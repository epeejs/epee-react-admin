# 说明：

在接口调试前，前端根据定义好的接口文档，模拟数据，发起请求，编写完整的页面逻辑，等真正开始调试的时候，将请求地址更换即可。

本文只介绍在线 mock 数据的方式，在线 mock 跟本地 mock 比较，可以省去安装配置，运行服务，多人协作数据不通的多种问题。

# 一个简单的列子

![image](https://note.youdao.com/yws/public/resource/633e9bc706a3a274d9926f95b1806671/xmlnote/4AE3E8E874C44176A36B804DEF5DA4EE/14889)

返回结果：

![image](https://note.youdao.com/yws/public/resource/633e9bc706a3a274d9926f95b1806671/xmlnote/B88BDA3DA0D14B768FB2EACF278FA32F/14898)

# Mock 语法简介

## base

```
{
    "base": {
    "range": "@range(3, 7)",
    "string": "@string(7, 20)",
    "character": "@character(\"abcde\")",
    "float": "@float(60, 100)",
    "integer": "@integer(60, 100)",
    "natural": "@natural(60, 100)",
    "boolean": "@boolean"
  },
}

```

预览：

```
"base": {
    "range": [3,4,5,6],
    "string": "qg3)zBWiLlbrsisX",
    "character": "c",
    "float": 66.87535733306,
    "integer": 66,
    "natural": 71,
    "boolean": false
  },
```

## date

```
"date": {
    "date": "@date",
    "time": "@time",
    "datetime": "@datetime",
    "now": "@now"
  },
```

预览：

```
"date": {
    "date": "1971-10-18",
    "time": "02:04:17",
    "datetime": "1985-03-10 22:47:49",
    "now": "2019-09-25 13:56:44"
    }
```

## image

```
 "image": {
    "image": "@image(\"200x200\", \"#50B347\", \"#FFF\", \"FastMock\")"
  },
```

预览：

```
"image": {
    "image": "http://dummyimage.com/200x200/50B347/FFF&text=FastMock"
  },
```

## text

```
"text": {
    "paragraph": "@paragraph(1, 3)",
    "sentence": "@sentence(3, 5)",
    "word": "@word(3, 5)",
    "title": "@title(3, 5)",
    "cparagraph": "@cparagraph(1, 3)",
    "csentence": "@csentence(3, 5)",
    "cword": "@cword(\"零一二三四五六七八九十\", 5, 7)",
    "ctitle": "@ctitle(3, 5)"
  },

```

预览：

```
 "text": {
    "paragraph": "Gifp ifnk hrreyi foajbgielv doijqrd ffaooi hlwstfcfw nrgsioum wtgashcoiy sintskl hnjk ebcsec. Bhlhghu embjvvs bckwkibqhs qgqz psu mjsodprwf exidxyqnq cdyqoatr xkezagaqu ijrcqrj vvxwdwgq ivv jxcpeybpus sojcn cscdlnmi kopzvuqfin.",
    "sentence": "Xuqxp qvek ttgiq.",
    "word": "ynug",
    "title": "Cdnsxa Yjhrlbb Rmofrixln Jubgpxm Gjpdujgryi",
    "cparagraph": "装增克体都月每手物即用周几想军点程。将角权响金华生候社根利情也龙。化必去边织众东位史回际平马至。",
    "csentence": "存断实。",
    "cword": "三七九六六",
    "ctitle": "油眼采小"
  },
```

## name

```
"name": {
    "first": "@first",
    "last": "@last",
    "name": "@name",
    "cfirst": "@cfirst",
    "clast": "@clast",
    "cname": "@cname"
  },
```

预览：

```
"name": {
    "first": "Jennifer",
    "last": "Anderson",
    "name": "Laura Moore",
    "cfirst": "胡",
    "clast": "秀兰",
    "cname": "姜敏"
  },
```

## web

```
"web": {
    "url": "@url",
    "domain": "@domain",
    "protocol": "@protocol",
    "tld": "@tld",
    "email": "@email",
    "ip": "@ip"
  },
```

预览：

```
"web": {
    "url": "mid://nypjj.kr/mizdvfhl",
    "domain": "jbgmh.cn",
    "protocol": "ftp",
    "tld": "fj",
    "email": "r.bdwejkiuy@ltatgpp.an",
    "ip": "175.52.62.226"
  },
```

## address

```
"address": {
    "region": "@region",
    "province": "@province",
    "city": "@city(true)",
    "county": "@county(true)",
    "zip": "@zip"
  },
```

预览：

```
"address": {
    "region": "华中",
    "province": "云南省",
    "city": "天津 天津市",
    "county": "台湾 金门县 金宁乡",
    "zip": "539375"
  },
```

## miscellaneous

```
 "miscellaneous": {
    "id": "@id",
    "guid": "@guid",
    "increment": "@increment(1000)"
  }
```

预览：

```
 "miscellaneous": {
    "id": "370000201504299208",
    "guid": "6E6155c0-f5b5-F3F6-5F0D-23EB44C21313",
    "increment": 253109
  }
```

# Mock 高阶用法

> Mock 能支持 function，function 中不能用上面的@XX,用 Mock.mock("@xxx")替代。function 中还能获取全部请求头和参数。

| 对象              | 描述                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| Mock              | Mock 对象                                                                            |
| \_req.url         | 获得请求 url 地址                                                                    |
| \_req.method      | 获取请求方法                                                                         |
| \_req.params      | 获取 url 参数对象                                                                    |
| \_req.querystring | 获取查询参数字符串(url 中?后面的部分)，不包含 ?                                      |
| \_req.query       | 将查询参数字符串进行解析并以对象的形式返回，如果没有查询参数字字符串则返回一个空对象 |
| \_req.body        | 当 post 请求以 x-www-form-urlencoded 方式提交时，我们可以拿到请求的参数对象          |

## 举个栗子

```
{
  code: function({
    _req
  }) {
    const userName = _req.query.userName;
    return userName ? 0 : -1;
  },
  data: function({
    _req,
    Mock
  }) {
    const userName = _req.query.userName;
    return userName ? {
      token: Mock.mock("@guid()"),
      userId: Mock.mock("@id(5)"),
      name: userName,
      avatar: Mock.mock("@image(200x100, #FF6600)"),
      message: "登录成功"
    } : {
      message: "登录失败"
    }
  }
}
```

预览：

![image](https://note.youdao.com/yws/public/resource/633e9bc706a3a274d9926f95b1806671/xmlnote/1C6017CB352F41DD9B758D064EBCFD4B/15016)

# 常用的在线 mock 工具

- [fast-mock](https://www.fastmock.site/)

- [easy-mock](https://easy-mock.com/)
