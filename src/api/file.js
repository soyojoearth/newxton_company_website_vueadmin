import request from '@/utils/request'

export function getNewList(data) {
  return request({
    url: '/api/admin/news/list',
    method: 'post',
    data
  })
}

export function deleteNew(data) {
  return request({
    url: '/api/admin/news/delete',
    method: 'post',
    data
  })
}

export function createNew(data) {
  return request({
    url: '/api/admin/news/create',
    method: 'post',
    data
  })
}

export function updateNew(data) {
  return request({
    url: '/api/admin/news/update',
    method: 'post',
    data
  })
}

export function getDetail(data) {
  return request({
    url: '/api/admin/news/detail',
    method: 'post',
    data
  })
}

export function getCategoryList(data) {
  return request({
    url: '/api/admin/news_category/list',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/api/admin/news_category/update',
    method: 'post',
    data
  })
}

export function deleteCategory(data) {
  return request({
    url: '/api/admin/news_category/delete',
    method: 'post',
    data
  })
}

export function changeRecommend(data) {
  return request({
    url: '/api/admin/news/recommend',
    method: 'post',
    data
  })
}

export function uploadImage(data) {
  return request({
    url: '/api/admin/upload/public_pic',
    method: 'post',
    data
  })
}
