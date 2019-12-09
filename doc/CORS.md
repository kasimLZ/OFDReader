# 跨域

当阅读器与文件服务器所在域名或IP不一致时，浏览器会阻止提交，并提示产生CORS错误。

解决该错误，需要在服务端添加允许跨域http请求的响应头
包括以下值

- Access-Control-Allow-Origin : "*"
- Access-Control-Allow-Methods : "POST"
- Access-Control-Allow-Headers : "x-requested-with,content-type"

## 暴露自定义响应头

- Access-Control-Expose-Headers : "file-name"
