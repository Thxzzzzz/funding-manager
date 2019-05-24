// 菜单 顶栏
export default [{
  path: '/index',
  title: '首页',
  icon: 'home'
}]

// 管理员菜单 顶栏
export const managerHeader = [{
  path: '/index',
  title: '首页',
  icon: 'home'
},
{
  title: '数据库管理',
  icon: 'folder-o',
  children: [{
    path: '/admin/database/order',
    title: '订单数据库'
  }]
},
{
  title: '审核员管理',
  icon: 'folder-o',
  path: '/admin/auditor-manager'
}
]

// 审核员菜单 顶栏
export const auditorHeader = [{
  path: '/index',
  title: '首页',
  icon: 'home'
},
{
  title: '信息审核',
  icon: 'folder-o',
  children: [{
    path: '/verify/product',
    title: '众筹审核'
  },
  {
    path: '/verify/license',
    title: '资质审核'
  }
  ]
}
]
