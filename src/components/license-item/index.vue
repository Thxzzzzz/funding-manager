<template>
  <el-card class="card"
           :body-style="{'padding':'10px'}">
    <el-row class="item">
      <el-col :span="3">
        <img class="image"
             style="margin:0px auto;"
             :src="license.license_image_url"
             :alt="license.company_name">
      </el-col>
      <el-col :span="21">
        <div class="textDiv">
          <span class="hintText">执照&nbsp;&nbsp; ID:</span>
          <span class="infoText">{{license.id}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">公司名称:</span>
          <span class="infoText">{{license.company_name}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">审核状态:</span>
          <span class="infoText">{{getStatusStr(license.verify_status)}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">修改时间:</span>
          <span class="infoText">{{formatDate(license.updated_at)}}</span>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import VerifyStatusUtil from '@/libs/util.enums.js'
import util from '@/libs/util.js'

export default {
  name: 'license-item',
  props: {
    license: Object
  },
  data () {
    return {
    }
  },
  methods: {
    getStatusStr (value) {
      return VerifyStatusUtil.GetStatusStr(value)
    },
    formatDate (date) {
      return util.formatDate(date)
    }
  }
}
</script>
<style lang="scss" scoped>
    .card {
        height: 170px;
        width: 500px;
        &:hover {
            transform: translateY(-3px);
            box-shadow: 1px 1px 20px #999;
        }
    }
    .item {
        height: 145px;
        width: 1000px;
    }
    .image{
        margin: 0px;
        height: 150px;
        display: block;
    }
    .textDiv{
        margin:10px;
        .hintText{
            color:gray;
            font-weight: bold;
            margin-right: 5px;
        }
        .infoText{
            color:black;
            font-size: 18px;
            font-weight: bold;
        }
    }

</style>
