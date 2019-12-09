# 配置参数说明

## OFD原文件加载路径

阅读器回解析当前浏览器或者iframe路径中，key为`_`的querystring的值

例如：`http://127.0.0.1/ofdReader?_=abc.ofd`

其中`abc.ofd`就是文件加载路径，该路径可以是完整路径，也可以是相对路径。

当文件路径问相对路径时，文件路径会被拼接到[基础路径]()结尾，已形成完整路径

当且仅当文件路径以`http://`或者`https://`开头时，被认为是完整路径。


## 配置文件加载路径

在Angular引用的上下文的`<html>`标记上添加`config`属性，值将被作为配置文件的路径

``` HTML
<html config="assets/config/config.json">
```
> 该路径的设置可以在项目中`/src/index.html`，或者发布后`/index.html`中找到。

详细请参考[配置文件](ConfigFile.md)

## OFD阅读器左右手模式

阅读器UI基于开源PDF阅读器[mozilla/pdf.js](https://github.com/mozilla/pdf.js/)进行修改

同样可以切换左右手模式切换, 修改Angular引用的上下文的`<html>`标记上的`dir`属性

可接受值: `ltr`(左手)或`rtl`(右手)
