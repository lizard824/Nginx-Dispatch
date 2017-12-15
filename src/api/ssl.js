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
