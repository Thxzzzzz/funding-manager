import request from '@/plugin/axios'

/**
 * 通过各种条件获取产品列表
 * @param {*} data
 */
export function GetProductList (data) {
  return request({
    url: 'manager/product/getProductList',
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * 更新产品信息
 * @param {*} data
 */
export function ProductUpdate (data) {
  return request({
    url: 'manager/product/update',
    method: 'post',
    data
  })
}

/**
 * 根据 ID 获取产品信息
 */
export function productById (data) {
  return request({
    url: 'manager/product/productById',
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * 根据产品 ID 获取套餐信息
 */
export function pkgListByProductId (data) {
  return request({
    url: 'manager/product/pkgListByProductId',
    method: 'get',
    params: {
      ...data
    }
  })
}

/**
 * 获取产品类型列表 typeList
 */
export function getProductTypeList (data) {
  return request({
    url: 'v1/product/typeList',
    method: 'get',
    params: {
      ...data
    }
  })
}
