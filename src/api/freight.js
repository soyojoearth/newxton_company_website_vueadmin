import request from '@/utils/request'
import requestJSON from '@/utils/requestJSON'
// 运费模版列表
export function getFreightList (data) {
  return requestJSON({
    url: '/api/admin/delivery_config/list',
    method: 'post',
    data
  })
}
// 运费模版添加/编辑
export function createFreight (data) {
  return requestJSON({
    url: '/api/admin/delivery_config/save',
    method: 'post',
    data
  })
}

// 运费模版添加/编辑
export function updateFreight (data) {
  return requestJSON({
    url: '/api/admin/delivery_config/save',
    method: 'post',

    data
  })
}
// 运费模版删除
export function deleteFreight (data) {
  return requestJSON({
    url: '/api/admin/delivery_config/delete',
    method: 'post',
    data
  })
}
//获取地区/api/admin/delivery_region/list
export function getAreaList (data) {
  return requestJSON({
    url: '/api/admin/delivery_region/list',
    // url: '/api/delivery_region/tree',

    method: 'post',
    data
  })
}
//获取地区/api/admin/delivery_region/list
export function getAreaTree (data) {
  return requestJSON({
    url: '/api/delivery_region/tree',
    method: 'post',
    data
  })
}