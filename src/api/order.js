import request from '@/plugin/axios'

/**
 * 新增订单信息
 * @param {*} data
 */
export function OrderAdd (data) {
  return request({
    url: 'v1/manager/order/add',
    method: 'post',
    data
  })
}

/**
 * 删除订单信息（软删除）
 * @param {*} data
 */
export function OrderDelete (data) {
  return request({
    url: 'v1/manager/order/delete',
    method: 'post',
    data
  })
}

/**
 * 恢复软删除的订单信息（软删除）
 * @param {*} data
 */
export function OrderRecover (data) {
  return request({
    url: 'v1/manager/order/recover',
    method: 'post',
    data
  })
}

/**
 * 更新订单信息
 * @param {*} data
 */
export function OrderUpdate (data) {
  return request({
    url: 'v1/manager/order/update',
    method: 'post',
    data
  })
}

/**
 * 获取订单列表
 * @param {*} data
 */
export function OrderAll (data) {
  return request({
    url: 'v1/manager/order/all',
    method: 'get',
    params: {
      ...data
    }
  })
}
