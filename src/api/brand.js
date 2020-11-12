import request from '@/utils/request'

// 获取产品品牌列表
export function getBrandList() {
  return request({
    url: '/api/admin/product_brand/list',
    method: 'post'
  })
}

// 品牌新增修改
export function saveBrand(data) {
  return request({
    jsonType: true,
    headers: { 'content-type': 'application/json' },
    url: '/api/admin/product_brand/save',
    method: 'post',
    data
  })
}

// 删除品牌
export function deleteBrand(data) {
  return request({
    url: '/api/admin/product_brand/delete',
    method: 'post',
    data
  })
}
