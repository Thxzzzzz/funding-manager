import request from '@/plugin/axios'

export function Login (data) {
  return request({
    url: 'manager/user/login',
    method: 'post',
    data
  })
}

export function Info (data) {
  return request({
    url: 'manager/user/info',
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * 根据 ID 来获取用户信息
 * @param {*} data
 */
export function GetUserById (data) {
  return request({
    url: 'v1/user/getInfoById',
    method: 'get',
    params: {
      ...data
    }
  })
}

export function Logout (data) {
  return request({
    url: 'manager/user/logout',
    method: 'post',
    data
  })
}
