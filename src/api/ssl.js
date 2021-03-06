import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/ssl/getAll',
    method: 'get',
    params
  })
}

export function addItem(data) {
  return request({
    url: '/ssl/add',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/ssl/delete',
    method: 'post',
    data
  })
}

export function editItem(data) {
  return request({
    url: '/ssl/update',
    method: 'post',
    data
  })
}

export function searchItem(data) {
  return request({
    url: '/ssl/add',
    method: 'get',
    data
  })
}

export function transfer(data) {
  return request({
    url: '/ssl/transfer',
    method: 'post',
    data
  })
}
