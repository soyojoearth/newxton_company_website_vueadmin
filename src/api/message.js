import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/api/admin/guestmessage/list',
    method: 'post',
    data
  })
}

export function deleteMessage(data) {
  return request({
    url: '/api/admin/guestmessage/delete',
    method: 'post',
    data
  })
}
