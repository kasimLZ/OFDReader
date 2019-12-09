# 快速上手

## 前期准备

需要一个可以以POST形式下载OFD文件的API。

C# mvc：
```Csharp
[Route("File/{filename}")]
public IActionResult File(string filename)
{
    // 读取文件
    var stream = new FileStream($"X:\\xxxx\\{filename}", FileMode.Open, FileAccess.Read, FileShare.Read);
    return File(stream, "application/zip");
}
```

> 该API可以以任何语言，或者Nginx文件服务器的形式来实现

## 引用阅读器

建议以iframe形式嵌套在页面中，或者直接打开阅读器页面。

```html
<iframe src="your ofd reader path"></iframe>
```

## 指定远程加载文件

远程文件的路径需要以querystring参数形式，传递给阅读器。

```html
<iframe src="your ofd reader path?_=filename"></iframe>
```
具体参数说明详见[参数说明](Config.md)