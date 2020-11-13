import request from '@/utils/request'
import requestForm from '@/utils/requestPic'

// 配送地区列表
export function getRegionList() {
  return request({
    url: '/api/admin/delivery_region/list',
    method: 'post'
  })
}

// 配送地区添加/修改
export function saveRegion(data) {
  return requestForm({
    headers: { 'content-type': 'application/json' },
    url: '/api/admin/delivery_region/save',
    method: 'post',
    data
  })
}

// 配送地区删除
export function deleteRegion(data) {
  return request({
    url: '/api/admin/delivery_region/delete',
    method: 'post',
    data
  })
}
