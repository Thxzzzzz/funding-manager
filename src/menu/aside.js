// 菜单 侧边栏
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

// 管理员菜单 侧边栏
export const managerAside = [
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

// 审核员菜单 侧边栏
export const auditorAside = [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '审核员菜单',
    icon: 'folder-o',
    children: [
      { path: '/page1', title: '审核员菜单' }
    ]
  }
]
