import request from '@/utils/request'

export function getPerm(params) {
  return request({
    url: '/user/getPerm',
    method: 'get',
    params
  })
}

export function editPerm(params) {
  return request({
    url: '/user/editPerm',
    method: 'post',
    data: { params }
  })
}
