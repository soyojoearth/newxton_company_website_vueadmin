import request from '@/utils/request'
import requestForm from '@/utils/requestPic'
import requestJSON from '@/utils/requestJSON'
// 管理后台--产品评论列表
export function getList (data) {
  return requestJSON({
    url: '/api/admin/product_reviews/list',
    method: 'post',
    data
  })
}
// 管理后台--产品评论详情（含回复）
export function getDetail (data) {
  return requestJSON({
    url: '/api/admin/product_reviews/detail',
    method: 'post',
    data
  })
}
// 管理后台--产品评论-管理员回复
export function reply (data) {
  return requestJSON({
    url: '/api/admin/product_reviews/reply',
    method: 'post',
    data
  })
}
// 管理后台--产品评论-推荐
export function recommend (data) {
  return requestJSON({
    url: '/api/admin/product_reviews/recommend',
    method: 'post',
    data
  })
}
// 管理后台--产品评论-隐藏
export function hidden (data) {
  return requestJSON({
    url: '/api/admin/product_reviews/hidden',
    method: 'post',
    data
  })
}