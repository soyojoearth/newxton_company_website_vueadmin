import request from '@/utils/requestJSON'

export function getShopInfo() {
  return request({
    url: '/api/admin/setting_ec_config/detail',
    method: 'post'
  })
}

export function getShopSave(data) {
  console.log(data)
  return request({
    url: '/api/admin/setting_ec_config/save',
    method: 'post',
    data: data
  })
}

export function getPayInfo() {
  return request({
    url: '/api/admin/setting_pay_config/detail',
    method: 'post'
  })
}

export function getPaySave(data) {
  return request({
    url: '/api/admin/setting_pay_config/save',
    method: 'post',
    data: data
  })
}

