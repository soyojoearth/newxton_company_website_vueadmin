import request from '@/utils/request'

// 获取运费模版分类列表
export function apiGetDeliveryConfigList () {
  return request({
    url: '/api/admin/delivery_config/list',
    method: 'post'
  })
}