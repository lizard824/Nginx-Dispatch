import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ssl/list',
    method: 'get',
    params
  })
}

export function addItem(item) {
  return request({
    url: '/ssl/add',
    method: 'post',
    data: { item }
  })
}

export function delteItem(item) {
  return request({
    url: '/ssl/delete',
    method: 'post',
    data: { item }
  })
}

export function editItem(item) {
  return request({
    url: '/ssl/edit',
    method: 'post',
    data: { item }
  })
}

export function searchItem(item) {
  return request({
    url: '/ssl/add',
    method: 'get',
    item
  })
}
