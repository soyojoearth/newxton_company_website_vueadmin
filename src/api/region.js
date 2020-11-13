import request from '@/utils/request'
import requestJSON from '@/utils/requestJSON'

// 配送地区列表
export function getRegionList() {
  return request({
    url: '/api/admin/delivery_region/list',
    method: 'post'
  })
}

// 配送地区添加/修改
export function saveRegion(data) {
  return requestJSON({
    url: '/api/admin/delivery_region/save',
    method: 'post',
    data
  })
}

// 配送地区删除
export function deleteRegion(data) {
  return requestJSON({
    url: '/api/admin/delivery_region/delete',
    method: 'post',
    data
  })
}

// 交换两个region的顺序
export function swapRegionOrder(data) {
  return request({
    url: '/api/admin/delivery_region/order_swap',
    method: 'post',
    data
  })
}
