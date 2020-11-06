import request from '@/utils/request'

// 获取运费模版分类列表
export function getBrandList () {
  return request({
    url: '/api/admin/product_brand/list',
    method: 'post'
  })
}