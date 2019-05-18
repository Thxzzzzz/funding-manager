<template>
  <d2-container>
    <div class="flitter">
      <el-select v-model="verifyStatusType"
                 @change="getVerifyProductList()"
                 placeholder="请选择审核结果">
        <el-option v-for="(item, index) in verifyOptions"
                   :key="index"
                   :value="item.key"
                   :label="item.label"></el-option>
      </el-select>
    </div>
    <div class="verify-product-list">
      <div class="productItem"
           v-for="(item, index) in productList"
           :key="index">
        <product-item :product="item"></product-item>
      </div>
    </div>

  </d2-container>
</template>

<script>

import { GetProductList } from '@api/product'
export default {
  name: 'product-verify',
  components: {
    // ProductItem
  },
  data () {
    return {
      filename: __filename,
      productList: [],
      verifyStatusType: 2,
      verifyOptions: [{
        key: 1,
        label: '通过审核'
      },
      {
        key: 2,
        label: '待审核'
      },
      {
        key: 4,
        label: '未通过审核'
      }]
    }
  },
  methods: {
    getVerifyProductList () {
      let params = {
        verify_status: this.verifyStatusType
      }
      this._getProductList(params)
    },
    _getProductList (params) {
      GetProductList(params).then(data => {
        this.productList = data.product_contents
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    // 根据验证状态获取产品列表
    this.getVerifyProductList()
  }
}
</script>

<style lang="scss" scoped>
  .flitter{
    margin:10px 0px;
  }
  .verify-product-list{
  }
  .productItem{
    float: left;
    margin-right:15px;
    margin-bottom: 15px;
    width: 600px;
  }

</style>
