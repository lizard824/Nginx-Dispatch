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
    data: { item }
  })
}

export function deleteItem(item) {
  return request({
    url: '/domain/delete',
    method: 'post',
    data: { item }
  })
}

export function editItem(item) {
  return request({
    url: '/domain/update',
    method: 'post',
    data: { item }
  })
}

export function searchItem(item) {
  return request({
    url: '/domain/add',
    method: 'get',
    item
  })
}
