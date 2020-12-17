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

>基础数据的配置 主要在根目录的/data文件夹下（建议不同模块创建不同文件），格式如下：

```

export const dataTest = [{
  value: 1, label: 'test'
}, {
  value: 2, label: 'test2'
}]

export default {
  dataTest
}

或者

export const jobNum = {
  jobNumStatus: [{
    value: 0, label: '全部'}, {
    value: 2, label: '正常'}, {
    value: 9, label: '禁用'
  }]
}

export default {
  jobNum
}

配置的基础数据可以自动生成过滤器（尽量避免key值重复），使用方式如下：

{{ status | jobNumStatus}}

```

>基础的表单验证规则已配置（如规则不满足请在目录@/uitls/form.js文件下补充），使用规则如下（此规则只使用于PC端）：

```

import formVaild from '@/utils/form'
...

rules: {
  mobile: [{required: true, message: '请输入联系电话'}, {validator: formVaild.validTelphone, message: '请输入合法的联系电话'}],
}

```

>路由配置直接在router目录添加不同模块的路由文件即可，如下：

```

const routes = [{
  path: '/demo',
  component: () => import('@/views/demo'),
  name: 'demo',
  meta: {
    title: '模版事例-分页'
  }
}]

export default routes

如新增路由无需模版页配置，请在根目录下index.js文件添加，如下：

routes: [{
  ...
}, {
  path: '/login',
  name: 'login',
  component: () => import('@/views/login')
}]

```

>页面样式配置使用（基础样式维护在@/assets/less/*目录下）：

```

color.less 文件主要存储的是全局的颜色值变量（如有新的色值建议维护在全局中），可以在页面使用;
index.less 文件主要是预定义了一些基础的样式，可以在页面中直接使用（框架已经默认引用，无需重复引用）

使用方式：

<style lang="less">
@import url('../assets/less/color.less');
.header {
  height: 60px;
  line-height: 60px;
  background: @white-color;
  color: @primary-color;
}  
</style>

/** index.less example */
<div class="center">基础的居中样式</div>

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
