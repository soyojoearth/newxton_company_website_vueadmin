import requestJSON from '@/utils/requestJSON'

// 资金--列表
export function getTansactionList(data) {
  return requestJSON({
    url: '/api/admin/transaction/list',
    method: 'post',
    data
  })
}
