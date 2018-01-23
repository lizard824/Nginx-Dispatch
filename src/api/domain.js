import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/domain/getAll',
    method: 'get',
    params
  })
}

export function addItem(data) {
  return request({
    url: '/domain/add',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/domain/delete',
    method: 'post',
    data
  })
}

export function editItem(data) {
  return request({
    url: '/domain/update',
    method: 'post',
    data
  })
}

export function searchItem(params) {
  return request({
    url: '/domain/add',
    method: 'get',
    params
  })
}

export function getLine() {
  return request({
    url: '/domain/line',
    method: 'get'
  })
}

export function getIdc(params) {
  return request({
    url: '/domain/getbyidc',
    method: 'get',
    params
  })
}

export function mutipleUpdate(data) {
  return request({
    url: '/domain/multiupdate',
    method: 'post',
    data
  })
}
