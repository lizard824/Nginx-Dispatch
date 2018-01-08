import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/domain/getAll',
    method: 'get',
    params
  })
}

export function addItem(item) {
  return request({
    url: '/domain/add',
    method: 'post',
    item
  })
}

export function deleteItem(item) {
  return request({
    url: '/domain/delete',
    method: 'post',
    item
  })
}

export function editItem(item) {
  return request({
    url: '/domain/update',
    method: 'post',
    item
  })
}

export function searchItem(item) {
  return request({
    url: '/domain/add',
    method: 'get',
    item
  })
}

export function getLine() {
  return request({
    url: '/domain/line',
    method: 'get'
  })
}
