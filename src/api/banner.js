import request from '@/utils/request'
import requestForm from '@/utils/requestPic'

export function list (data) {
  return request({
    url: '/api/admin/banner/list',
    method: 'post',
    data
  })
}

export function save (data) {
  return requestForm({
    url: '/api/admin/banner/save',
    method: 'post',
    data
  })
}
