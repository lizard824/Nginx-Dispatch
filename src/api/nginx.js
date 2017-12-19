import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/nginx/list',
    method: 'get',
    params
  })
}

export function addItem(item) {
  return request({
    url: '/nginx/add',
    method: 'post',
    data: { item }
  })
}

export function delteItem(item) {
  return request({
    url: '/nginx/delete',
    method: 'post',
    data: { item }
  })
}

export function editItem(item) {
  return request({
    url: '/nginx/edit',
    method: 'post',
    data: { item }
  })
}

export function searchItem(item) {
  return request({
    url: '/nginx/add',
    method: 'get',
    item
  })
}
