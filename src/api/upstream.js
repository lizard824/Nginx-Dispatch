import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/upstream/list',
    method: 'get',
    params
  })
}

export function addItem(item) {
  return request({
    url: '/upstream/add',
    method: 'post',
    data: { item }
  })
}

export function delteItem(item) {
  return request({
    url: '/upstream/delete',
    method: 'post',
    data: { item }
  })
}

export function editItem(item) {
  return request({
    url: '/upstream/edit',
    method: 'post',
    data: { item }
  })
}

export function searchItem(item) {
  return request({
    url: '/upstream/add',
    method: 'get',
    item
  })
}
