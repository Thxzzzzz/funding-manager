<template>
  <el-card class="card"
           :body-style="{'padding':'10px'}"
           @click.native="openProductDetail()">
    <el-row class="item">
      <el-col :span="5">
        <img class="image"
             :src="product.small_img"
             :alt="product.name">
      </el-col>
      <el-col :span="16">
        <div class="textDiv">
          <span class="hintText">产品&nbsp;&nbsp; ID:</span>
          <span class="infoText">{{product.product_id}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">产品名称:</span>
          <span class="infoText">{{product.name}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">审核状态:</span>
          <span class="infoText">{{getStatusStr(product.verify_status)}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">修改时间:</span>
          <span class="infoText">{{formatDate(product.updated_at)}}</span>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import VerifyStatusUtil from '@/libs/util.enums.js'
import util from '@/libs/util.js'

export default {
  name: 'product-item',
  props: {
    product: Object
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
    },
    openProductDetail () {
    //   console.log('openProductDetail')
      this.$router.push({
        path: 'product-detail',
        query: {
          id: this.product.product_id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .card {
        height: 170px;
        width: 600px;
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
