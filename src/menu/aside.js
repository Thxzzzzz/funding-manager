// 菜单 侧边栏
export default [{
  path: '/index',
  title: '首页',
  icon: 'home'
}]

// 管理员菜单 侧边栏
export const managerAside = [{
  path: '/index',
  title: '首页',
  icon: 'home'
},
{
  title: '数据库管理',
  icon: 'folder-o',
  children: [{
    path: '/page1',
    title: '管理员菜单'
  }]
},
{
  title: '审核员管理',
  icon: 'folder-o',
  path: '/admin/auditor-manager'

}
]

// 审核员菜单 侧边栏
export const auditorAside = [{
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
