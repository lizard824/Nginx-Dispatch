import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/nginx/getAll',
    method: 'get',
    params
  })
}

export function addItem(data) {
  return request({
    url: '/nginx/add',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return request({
    url: '/nginx/delete',
    method: 'post',
    data
  })
}

export function editItem(data) {
  return request({
    url: '/nginx/update',
    method: 'post',
    data
  })
}

export function searchItem(params) {
  return request({
    url: '/nginx/add',
    method: 'get',
    params
  })
}

export function cmd(data) {
  return request({
    url: '/nginx/cmd',
    method: 'post',
    data
  })
}

export function status(data) {
  return request({
    url: '/nginx/status',
    method: 'post',
    data
  })
}
