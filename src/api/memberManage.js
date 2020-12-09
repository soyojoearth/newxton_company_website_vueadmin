import requestJSON from '@/utils/requestJSON'

// 会员列表
export function getMemberList(data) {
  return requestJSON({
    url: '/api/admin/member/list',
    method: 'post',
    data
  })
}

// 会员基本资料
export function getMemberInfo(data) {
  return requestJSON({
    url: '/api/admin/member/info',
    method: 'post',
    data
  })
}

// 会员更新--基本资料
export function memberUpdateBasic(data) {
  return requestJSON({
    url: '/api/admin/member/update_basic',
    method: 'post',
    data
  })
}

// 更新--分销设置
export function memberUpdateCmmission(data) {
  return requestJSON({
    url: '/api/admin/member/update_commission',
    method: 'post',
    data
  })
}

// 更新--增减资
export function memberUpdateBalance(data) {
  return requestJSON({
    url: '/api/admin/member/update_balance',
    method: 'post',
    data
  })
}

// 会员管理--收货地址列表
export function memberAddressList(data) {
  return requestJSON({
    url: '/api/admin/member_address/list',
    method: 'post',
    data
  })
}

// 会员管理--会员等级列表
export function memberLevelList(data) {
  return requestJSON({
    url: '/api/admin/member_level/list',
    method: 'post',
    data
  })
}

// 会员等级--保存
export function memberLevelSave(data) {
  return requestJSON({
    url: '/api/admin/member_level/save',
    method: 'post',
    data
  })
}

// 会员等级--删除
export function memberLevelDelete(data) {
  return requestJSON({
    url: '/api/admin/member_level/delete',
    method: 'post',
    data
  })
}

