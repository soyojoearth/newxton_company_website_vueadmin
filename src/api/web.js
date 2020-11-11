import request from '@/utils/request'

export function getWebInfo() {
  return request({
    url: '/api/admin/setting_list',
    method: 'post'
  })
}

export function getWebSave(data) {
  return request({
    url: '/api/admin/setting_save',
    method: 'post',
    data
  })
}
