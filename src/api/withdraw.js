import requestJSON from '@/utils/requestJSON'

// 提现--列表
export function getOrderList(data) {
  return requestJSON({
    url: '/api/admin/withdraw/list',
    method: 'post',
    data
  })
}

// 提现--审核
export function withdrawApproval(data) {
  return requestJSON({
    url: '/api/admin/withdraw/approval',
    method: 'post',
    data
  })
}

// 提现--更新汇款结果
export function transferUpdate(data) {
  return requestJSON({
    url: '/api/admin/withdraw_transfer/update',
    method: 'post',
    data
  })
}
