# 📢swagger2request
- 🚀 使用Node.js将OpenAPI 3.0和2.0（Swagger）模式转换为TypeScript接口和Request方法。
- 💡 利用Typescript Ast实现

## 特性

- SchemaObject支持Nullable、OneOf、Array、Ref
- 区别模板生成利用Ast，实现更简单更自由的生成方法
- 代码尽量简单

## 使用方法
```bash
npm i -g swagger2request
swagger2request https://petstore.swagger.io/v2/swagger.json ./example.ts
```

## 生成例子
- [https://petstore.swagger.io/v2/swagger.json](https://github.com/mtnbgx/swagger2request/blob/master/example/api.ts)