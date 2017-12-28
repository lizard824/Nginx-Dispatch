import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/upstream/list',
    method: 'get',
    params
  })
}

export function addItem(data) {
  return request({
    url: '/upstream/add',
    method: 'post',
    data: { data }
  })
}

export function deleteItem(data) {
  return request({
    url: '/upstream/delete',
    method: 'post',
    data: { data }
  })
}

export function editItem(data) {
  return request({
    url: '/upstream/edit',
    method: 'post',
    data: { data }
  })
}

export function searchItem(data) {
  return request({
    url: '/upstream/add',
    method: 'get',
    data
  })
}
