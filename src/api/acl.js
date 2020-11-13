import request from '@/utils/requestJSON'

export function roleList(data) {
  return request({
    url: '/api/admin/acl_role_list',
    method: 'post',
    data
  })
}

export function groupList() {
  return request({
    url: '/api/admin/acl_group_list',
    method: 'post',
  })
}

export function actionList() {
  return request({
    url: '/api/admin/acl_action_list',
    method: 'post',
  })
}

export function roleDetail(data) {
  return request({
    url: '/api/admin/acl_role_detail',
    method: 'post',
    data
  })
}

export function groupDetail(data) {
  return request({
    url: '/api/admin/acl_group_detail',
    method: 'post',
    data
  })
}

export function roleDetailUpdate(data) {
  return request({
    url: '/api/admin/acl_role_detail_update',
    method: 'post',
    data
  })
}

export function groupDetailUpdate(data) {
  return request({
    url: '/api/admin/acl_group_detail_update',
    method: 'post',
    data
  })
}

export function roleAdd(data) {
  return request({
    url: '/api/admin/acl_role_add',
    method: 'post',
    data
  })
}

export function groupAdd(data) {
  return request({
    url: '/api/admin/acl_group_add',
    method: 'post',
    data
  })
}

export function roleDelete(data) {
  return request({
    url: '/api/admin/acl_role_delete',
    method: 'post',
    data
  })
}

export function groupDelete(data) {
  return request({
    url: '/api/admin/acl_group_delete',
    method: 'post',
    data
  })
}