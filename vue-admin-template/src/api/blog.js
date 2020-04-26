import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fetchList(params) {
  return request({
    url: `${baseURL}/blog/list`,
    params: {
      ...params
    },
    method: 'get'
  })
}

export function del(params) {
  return request({
    url: `${baseURL}/blog/del`,
    data: {
      ...params
    },
    method: 'post'
  })
}
