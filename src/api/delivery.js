import request from '@/utils/request'
import requestForm from '@/utils/requestPic'

// 获取运费模版分类列表
/*
export function apiGetDeliveryConfigList() {
  return request({
    url: '/api/admin/delivery_config/list',
    method: 'post'
  })
}
*/

// 物流设置 - 获取快递公司列表
export function getDeliveryCompanyList(data) {
  return request({
    url: '/api/admin/delivery_company/list',
    method: 'post',
    data
  })
}

// 物流设置 - id为null时是新增加,否为修改快递公司
export function saveDeliveryCompany(data) {
  return requestForm({
    url: '/api/admin/delivery_company/save',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data
  })
}

// 物流设置 - 删除快递公司
export function deleteDeliveryCompany(data) {
  return requestForm({
    url: '/api/admin/delivery_company/delete',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data
  })
}
