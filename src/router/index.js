import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    meta: { title: '资讯管理', icon: 'content', affix: false },
    children: [
      {
        path: 'content',
        component: () => import('@/views/content/index'),
        name: 'content',
        meta: { title: '资讯管理', affix: false }
      },
      {
        path: 'create',
        component: () => import('@/views/content/create'),
        name: 'CreateContent',
        hidden: true,
        meta: { title: '创建资讯', affix: false }
      },
      {
        path: 'update/:id',
        props: true,
        hidden: true,
        component: () => import('@/views/content/update'),
        name: 'UpdateContent',
        meta: { title: '修改资讯', affix: false }
      },
      {
        path: 'kind',
        component: () => import('@/views/content/kind'),
        name: 'KindContent',
        hidden: true,
        meta: { title: '类型管理', affix: false }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    meta: { title: '产品管理', icon: 'product', affix: false },
    children: [
      {
        path: 'product',
        component: () => import('@/views/product/index'),
        name: 'product',
        meta: { title: '产品管理', affix: false }
      },
      {
        path: 'create',
        component: () => import('@/views/product/create'),
        name: 'CreateProduct',
        hidden: true,
        meta: { title: '创建产品', affix: false }
      },
      {
        path: 'update/:id',
        props: true,
        hidden: true,
        component: () => import('@/views/product/update'),
        name: 'UpdateProduct',
        meta: { title: '修改产品', affix: false }
      },
      {
        path: 'kind',
        component: () => import('@/views/product/kind'),
        name: 'KindProduct',
        hidden: true,
        meta: { title: '类型管理', affix: false }
      }
    ]
  },
  {
    path: '/cases',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/cases/index'),
        name: 'cases',
        meta: { title: '案例管理', icon: 'cases', affix: false }
      }
    ]
  },
  {
    path: '/file',
    component: Layout,
    children: [
      {
        path: 'file',
        component: () => import('@/views/file/index'),
        name: 'file',
        meta: { title: '文件管理', icon: 'file', affix: false }
      }
    ]
  },
  {
    path: '/message',
    component: Layout,
    meta: { title: '留言管理', icon: 'message', affix: false },
    children: [
      {
        path: 'index',
        component: () => import('@/views/message/index'),
        name: 'Message',
        meta: { title: '留言管理', icon: 'message', affix: false }
      }
    ]
  },
  {
    path: '/set',
    component: Layout,
    meta: { title: '设置', icon: 'set', affix: false },
    children: [
      {
        path: 'web',
        component: () => import('@/views/set/web'),
        name: 'WebSet',
        meta: { title: '网站基本设置', affix: false }
      },
      {
        path: 'page',
        component: () => import('@/views/set/page'),
        name: 'PageSet',
        meta: { title: '页面管理', affix: false }
      },
      {
        path: 'user',
        component: () => import('@/views/set/user'),
        name: 'UserSet',
        meta: { title: '用户管理', affix: false }
      },
      {
        path: 'edit/:id',
        props: true,
        hidden: true,
        component: () => import('@/views/set/page_edit'),
        name: 'PageEdit',
        meta: { title: '编辑页面', affix: false }
      },
      {
        path: 'banner',
        component: () => import('@/views/set/banner'),
        name: 'banner',
        meta: { title: '滚动轮播横幅', affix: false }
      },
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
