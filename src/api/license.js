import request from '@/plugin/axios'

/**
 * 通过验证状态获取执照信息
 * @param {*} data
 */
export function GetLicenseByVerifyStatus (data) {
  return request({
    url: 'manager/license/getByVerifyStatus',
    method: 'get',
    params: { ...data }
  })
}

/**
 * 更新执照信息 (审核员主要是更新验证状态)
 * @param {*} data
 */
export function LicenseUpdate (data) {
  return request({
    url: 'manager/license/update',
    method: 'post',
    data
  })
}
