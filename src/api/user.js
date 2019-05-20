import request from '@/plugin/axios'

export function Login (data) {
  return request({
    url: 'v1/manager/user/login',
    method: 'post',
    data
  })
}

export function Info (data) {
  return request({
    url: 'v1/manager/user/info',
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
    url: 'v1/manager/user/logout',
    method: 'post',
    data
  })
}

/**
 * 根据 role_id 来获取用户信息
 * @param {*} data
 */
export function InfoByRoleId (data) {
  return request({
    url: 'v1/manager/user/infoByRoleId',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 更新 User 信息
export function UpdateUser (data) {
  return request({
    url: 'v1/manager/user/updateUser',
    method: 'post',
    data
  })
}

// 新建 User 信息
export function NewUser (data) {
  return request({
    url: 'v1/manager/user/newUser',
    method: 'post',
    data
  })
}
