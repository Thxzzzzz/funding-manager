// 菜单 顶栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '页面',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '页面 1' },
      { path: '/page2', title: '页面 2' },
      { path: '/page3', title: '页面 3' }
    ]
  }
]

// 管理员菜单 顶栏
export const managerHeader = [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '数据库管理',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '管理员菜单' }
    ]
  },
  {
    title: '审核员管理',
    icon: 'folder-o',
    path: '/page1'

  }
]

// 审核员菜单 顶栏
export const auditorHeader = [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '信息审核',
    icon: 'folder-o',
    children: [
      { path: '/verify/product', title: '产品审核' },
      { path: '/verify/license', title: '执照审核' }
    ]
  }
]
