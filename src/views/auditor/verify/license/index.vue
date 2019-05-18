<template>
  <d2-container>
    <div class="flitter">
      <el-select v-model="verifyStatusType"
                 @change="getVerifyLicenseList()"
                 placeholder="请选择审核结果">
        <el-option v-for="(item, index) in verifyOptions"
                   :key="index"
                   :value="item.key"
                   :label="item.label"></el-option>
      </el-select>
    </div>
    <div class="verify-license-list">
      <div class="licenseItem"
           v-for="(item, index) in licenseList"
           :key="index">
        <license-item :license="item">
        </license-item>
      </div>
    </div>

  </d2-container>
</template>

<script>

import { GetLicenseByVerifyStatus } from '@api/license'
export default {
  name: 'license-verify',
  components: {
    // licenseItem
  },
  data () {
    return {
      filename: __filename,
      licenseList: [],
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
    getVerifyLicenseList () {
      let params = {
        verify_status: this.verifyStatusType
      }
      this._getGetLicenseList(params)
    },
    _getGetLicenseList (params) {
      GetLicenseByVerifyStatus(params).then(data => {
        this.licenseList = data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    // 根据验证状态获取产品列表
    this.getVerifyLicenseList()
  }
}
</script>

<style lang="scss" scoped>
  .flitter{
    margin:10px 0px;
  }
  .verify-license-list{
  }
  .licenseItem{
    float: left;
    margin-right:15px;
    margin-bottom: 15px;
    width: 600px;
  }

</style>
