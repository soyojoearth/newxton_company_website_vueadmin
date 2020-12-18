import requestJSON from '@/utils/requestJSON'

// 订单列表
export function getOrderList(data) {
  return requestJSON({
    url: '/api/admin/order_form/list',
    method: 'post',
    data
  })
}

// 订单详情
export function getOrderDetail(data) {
  return requestJSON({
    url: '/api/admin/order_form/detail',
    method: 'post',
    data
  })
}

// 修改收货地址
export function orderUpdateAddress(data) {
  return requestJSON({
    url: '/api/admin/order_form/update_address',
    method: 'post',
    data
  })
}

// 调整价格
export function orderUpdatePrice(data) {
  return requestJSON({
    url: '/api/admin/order_form/update_price',
    method: 'post',
    data
  })
}

// 更新内部订单备注
export function orderUpdateRemark(data) {
  return requestJSON({
    url: '/api/admin/order_form/update_remark',
    method: 'post',
    data
  })
}

// 发货
export function orderUpdateDelivery(data) {
  return requestJSON({
    url: '/api/admin/order_form/update_delivery',
    method: 'post',
    data
  })
}

// 显示配送区域列表
export function getDeliveryList(data) {
  return requestJSON({
    url: '/api/order_form/delivery_region/list',
    method: 'post',
    data
  })
}
