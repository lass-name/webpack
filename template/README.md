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
const authorization = [{
  desc:'接口描述信息',
  options:{   // 请求所需的参数信息
    url: '/bill/queryCustomerRefund',
    method: 'post',
    argsParams: true,
    baseURL: '',
    formdata: false,
    ...
  },
  vuex: {
    state: '',
    getter: '',
    mutationType: ''
  }
}]
export default authorization

/**
 * options: 表示请求需要传递的参数 (可接受axios库的所有请求参数（options）)
 *  - url:请求地址
 *  - method：请求方式（默认get）
 *  - baseURL：请求的配置代理 （默认‘/api'）
 *  - argsParams：请求参数是params传递 （baseURL/url/xx）默认get请求是 query方式 （默认值 false）
 *  - formdata：默认false 是否通过Formdata的方式传参数
 * vuex：是否生成vuex的代码（默认false，method='get'）get请求默认 true
 *  - state：定义存储在state中的变量名 （默认同mutationType）
 *  - getter：定义存储在getter中的变量名（默认同 state 变量）
 *  - mutationType：操作state值的函数名称定义（默认 同生成的action名称的大写格式 譬如：INSCOVERAGES_LIST）
*/

如觉得自动生成的vuex代码不合适也可自定义覆盖：（写覆盖代码需要主要几个准则，如下）
1.自定义的modules中的文件名需和api文件夹中文件名一致；（使用了命名空间）
2.自定义的action需和需要覆盖的自动生成的名称一致；
  > 名称生成规则如下：
  > url:'/user/login'(或'/user/login?action=check')
  > 生成的action名称为：userLogin (或userLoginActionCheck)

```


>在页面中调用api函数，使用方法：（在.vue页面中使用方法）
```javascript
this.$store.dispatch('userLogin',{}).then(data=>{
  console.log(data)
})

如何获取vuex的getters
默认情况下：getter名称是根据请求url来自动生成的，如下：
  > url:'user/login' (或'/user/login?action=check')
  > 生成的getter名称为：USER_LOGIN (或 USER_LOGIN_ACTION_CHECK)

computed:{
  ...mapGetter([
    'USER_LOGIN',
    'USER_LOGIN_ACTION_CHECK'
  ])
}

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
