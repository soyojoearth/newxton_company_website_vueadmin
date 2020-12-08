import requestJSON from '@/utils/requestJSON'

// 售后订单列表
export function getOrderRefundList(data) {
  return requestJSON({
    url: '/api/admin/order_form_refund/list',
    method: 'post',
    data
  })
}

// 售后订单详情
export function getOrderRefundDetail(data) {
  return requestJSON({
    url: '/api/admin/order_form_refund/detail',
    method: 'post',
    data
  })
}

// 售后订单审核处理
export function orderRefundApproval(data) {
  return requestJSON({
    url: '/api/admin/order_form_refund/approval',
    method: 'post',
    data
  })
}
