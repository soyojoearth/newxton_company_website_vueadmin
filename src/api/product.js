import request from '@/utils/request'
import requestForm from '@/utils/requestPic'
// 获取产品列表
export function getProductList(data) {
  return request({
    url: '/api/admin/product/list',
    method: 'post',
    data
  })
}
// 产品添加
export function createProduct(data) {
  return requestForm({
    url: '/api/admin/product/create',
    method: 'post',
    data
  })
}
// 图片上传
export function uploadPic(data) {
  return requestForm({
    url: '/api/admin/upload/public_pic',
    method: 'post',
    data
  })
}
// 产品修改
export function updateProduct(data) {
  return requestForm({
    url: '/api/admin/product/update',
    method: 'post',
    data
  })
}
// 产品删除
export function deleteProduct(data) {
  return request({
    url: '/api/admin/product/delete',
    method: 'post',
    data
  })
}
// 产品推荐/取消推荐
export function changeRecommend(data) {
  return request({
    url: '/api/admin/product/recommend',
    method: 'post',
    data
  })
}
// 交换两个产品的顺序
export function swapProduct(data) {
  return request({
    url: '/api/admin/product/order_swap',
    method: 'post',
    data
  })
}
// 获取产品详情【编辑用】
export function getProductDetail(data) {
  return request({
    url: '/api/admin/product/detail',
    method: 'post',
    data
  })
}
// 获取产品关联的图片列表
export function getProductPictureList(data) {
  return request({
    url: '/api/admin/product/picture_list',
    method: 'post',
    data
  })
}
// 新建产品类别
export function createProductCategory(data) {
  return request({
    url: '/api/admin/product_category/create',
    method: 'post',
    data
  })
}
// 获取产品分类列表
export function getProductCategoryList(data) {
  return request({
    url: '/api/admin/product_category/list',
    method: 'post',
    data
  })
}
// 修改产品分类category
export function updateProductCategory(data) {
  return request({
    url: '/api/admin/product_category/update',
    method: 'post',
    data
  })
}
// 删除产品类别
export function deleteProductCategory(data) {
  return request({
    url: '/api/admin/product_category/delete',
    method: 'post',
    data
  })
}
