import request from '@/utils/requestJSON'

export function getWebInfo() {
  return request({
    url: '/api/admin/setting_normal/detail',
    method: 'post'
  })
}

export function getWebSave(data) {
  console.log(data)
  return request({
    url: '/api/admin/setting_normal/save',
    method: 'post',
    data: data
  })
}

export function getImageInfo() {
  return request({
    url: '/api/admin/setting_oss_config/detail',
    method: 'post'
  })
}

export function getImageSave(data) {
  return request({
    url: '/api/admin/setting_oss_config/save',
    method: 'post',
    data: data
  })
}

