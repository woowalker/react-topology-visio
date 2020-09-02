export default [
  {
    name: 'datamap',
    method: 'GET',
    path: '/dicts/:category',
    params: {},
    desc: '数据字典'
  },
  {
    name: 'getOrgList',
    method: 'POST',
    path: '/PF/Login/GetOrgList',
    params: {
      Order: '',
      Sort: ''
    },
    desc: '获取公司组织架构数据'
  }
]
