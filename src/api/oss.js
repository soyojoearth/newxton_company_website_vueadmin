import request from '@/utils/request'

export function addjobTransfer(data) {
  return request({
    url: '/api/admin/oss_addjob_transfer',
    method: 'post',
    data
  })
}

export function getInfo() {
    return request({
      url: '/api/admin/oss_info',
      method: 'post',
    })
  }
