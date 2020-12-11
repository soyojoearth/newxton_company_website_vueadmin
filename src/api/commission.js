import requestJSON from '@/utils/requestJSON'

// 分销设置--详情
export function getCommissionDetail(data) {
  return requestJSON({
    url: '/api/admin/setting/commission/detail',
    method: 'post',
    data
  })
}

// 分销设置--保存
export function commissionSave(data) {
  return requestJSON({
    url: '/api/admin/setting/commission/save',
    method: 'post',
    data
  })
}

// 分销--日志
export function getCommissionLogs(data) {
  return requestJSON({
    url: '/api/admin/commission/logs',
    method: 'post',
    data
  })
}

