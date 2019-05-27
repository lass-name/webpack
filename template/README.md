# {{ name }}

> {{ description }}

## Quick Start

>修改代理配置地址：/config/index.js
```javascript
'/api': {
  target: 'http://xxxx.api.com',  // 此处替换成真实的api地址
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}
```

> 添加api调用的地址： /src/api 目录下添加(可以根据类别添加多个文件)
```javascript
const authorization = [
  {
    url: '/user/login',     // 请求地址
    method: 'post',         // 请求方式
    desc: '事例',           // 描述信息（文字描述）
    argsParams: true        // 是否param方式传递参数
  },{
    ...
  }
]
export default authorization

```

>在页面中调用api函数，使用方法：（在.vue页面中使用方法）
```javascript
this.$store.dispatch('userLogin',{}).then(data=>{
  console.log(data)
})
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
