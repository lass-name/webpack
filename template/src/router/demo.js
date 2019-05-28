const routes = [{
  path: '/demo',
  component: () => import('@/views/demo'),
  name: 'demo',
  meta: {
    title: '模版事例-分页'
  }
/* }, {
  path: '/demo/table',
  component: () => import('@/views/demo/table'),
  name: 'demo-table',
  meta: {
    title: '模版事例-表格'
  } */
}]

export default routes
