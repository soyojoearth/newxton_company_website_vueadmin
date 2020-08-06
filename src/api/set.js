import request from '@/utils/request'

export function userList(data) {
  return request({
    url: '/api/admin/user_list',
    method: 'post',
    data
  })
}

export function createUser(data) {
  return request({
    url: '/api/admin/create_user',
    method: 'post',
    data
  })
}

export function getPageList() {
  return request({
    url: '/api/admin/web_content/list',
    method: 'post',
  })  
}

export function getPageDetail(data) {
  return request({
    url: '/api/admin/web_content/detail',
    method: 'post',
    data
  })
}

export function editPageDetail(data) {
  return request({
    url: '/api/admin/web_content/update',
    method: 'post',
    data
  })
}

export function resetUserType(data) {
  return request({
    url: '/api/admin/reset_user_type',
    method: 'post',
    data
  })
}

export function blockUser(data) {
  return request({
    url: '/api/admin/block_user',
    method: 'post',
    data
  })
}

export function resetUserPwd(data) {
  return request({
    url: '/api/admin/reset_user_pwd',
    method: 'post',
    data
  })
}