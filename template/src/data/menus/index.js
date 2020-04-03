const menus = [{
  name: '运营管理',
  icon: 'el-icon-s-operation',
  path: '',
  children: [{
    name: '商户管理',
    icon: 'el-icon-s-operation',
    path: '/1',
    value: 10100
  }, {
    name: '订单管理',
    icon: 'el-icon-s-operation',
    path: '/2',
    value: 10200
  }]
}, {
  name: '财务管理',
  icon: 'el-icon-goods',
  path: '',
  children: [{
    name: '到账管理',
    path: '/3',
    value: 20100
  }, {
    name: '结算中心设置',
    path: '/4',
    value: 20400
  }]
}, {
  name: '发票管理',
  icon: 'el-icon-s-cooperation',
  path: '',
  children: [{
    name: '待开票列表',
    path: '/5',
    value: 30100
  }, {
    name: '发票快递记录',
    path: '/6',
    value: 30200
  }]
}, {
  name: '权限管理',
  icon: 'el-icon-lock',
  path: '',
  children: [{
    name: '帐号管理',
    path: '/7',
    value: 90100
  }, {
    name: '角色管理',
    path: '/8',
    value: 90200
  }]
}]

export default menus
