import request from '@/utils/request'

export function roleList(data) {
  return request({
    url: '/api/admin/acl_role_list',
    method: 'post',
    data
  })
}

