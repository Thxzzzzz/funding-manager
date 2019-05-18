<template>
  <d2-container>
    <div class="content">
      <el-steps :active="step"
                align-center>
        <el-step title="产品信息"></el-step>
        <el-step title="产品详情"></el-step>
        <el-step title="套餐信息"></el-step>
        <el-step title="审核结果"></el-step>
      </el-steps>

      <!-- 产品信息 -->
      <div class="editZone"
           v-if="step === 1">
        <div class="textDiv">
          <span class="hintText">产品&nbsp;&nbsp; ID:</span>
          <span class="infoText">{{product.id}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">产品名称:</span>
          <span class="infoText">{{product.name}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">产品类型:</span>
          <span class="infoText">{{typeStr(product.product_type)}}</span>
        </div>
        <!-- <div class="textDiv">
          <span class="hintText">审核状态:</span>
          <span class="infoText">{{getStatusStr(product.verify_status)}}</span>
        </div> -->
        <div class="textDiv">
          <span class="hintText">目标金额:</span>
          <span class="infoText">{{product.target_price}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">截止日期:</span>
          <span class="infoText">{{formatDate(product.end_time)}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">宣传大图:</span>
          <img :src="product.big_img"
               alt=""
               style="max-height:300px;">
        </div>
        <div class="textDiv">
          <span class="hintText">列表小图:</span>
          <img :src="product.small_img"
               alt=""
               style="max-height:300px;">
        </div>
        <div class="textDiv">
          <span class="hintText">修改时间:</span>
          <span class="infoText">{{formatDate(product.updated_at)}}</span>
        </div>

      </div>

      <!-- 产品详情 -->
      <div class="editZone"
           v-if="step === 2">
        <div class="detail_htmlPreview">
          <div v-html="product.detail_html">{{ product.detail_html }}</div>
        </div>
      </div>

      <!-- 套餐信息 -->
      <div class="editZone"
           v-if="step === 3">
        <!-- 套餐信息-->
        <div style="width:100%;margin:0px auto">
          <div v-for="(item,key) in product_packages"
               :key="key"
               class="info-card">
            <el-card>
              <div slot="header"
                   class="clearfix">
                <span>￥{{item.price}}</span>
                <span style="font-size:16px; color:gray;float: right; padding: 3px 0">{{item.backers}} 位支持者</span>
              </div>
              <div class="info-des"
                   style="padding:25px">
                <div class="left-label"
                     style="font-size:15px;
                 font-weight:bold;">
                  <span>限额{{item.total}}份</span>
                  <span>&nbsp;|&nbsp;剩余{{item.stock}}份</span>
                </div>
                <div style="clear:both;text-align:left">{{item.description}}</div>
                <div>
                  <img :src="item.image_url"
                       alt="图片"
                       style="width:70px;height:70px;margin:15px 0px;float:left;">
                </div>
                <div style="clear:both;text-align:left">
                  <span>配送费用：</span>
                  <span v-if="item.freight != 0">{{item.freight}}</span>
                  <span v-else
                        style="font-weight:bold;">免运费</span>
                </div>
                <div style="clear:both;text-align:left">
                  <span>预计回报发送时间：</span>
                  <span style="font-weight:bold;">
                    <span>项目众筹成功后</span>
                    <span style="color:red;">{{item.delivery_day}}</span>
                    <span>天内</span>
                  </span>
                </div>
                <div align="left"
                     style="clear:both;">
                </div>
              </div>
            </el-card>
          </div>
        </div>

      </div>

      <!-- 提交审核结果 -->
      <div class="editZone"
           v-if="step === 4">
        <h1 style="font-size:20px;">当前审核状态:</h1>
        <p style="font-size:40px; margin:10px auto;text-align:center;color:black">{{getStatusStr(product.verify_status)}}</p>
        <!-- 失败原因： -->
        <p v-if="product.verify_status===4"
           style="font-size:24px; margin:10px auto;text-align:center;color:black;width:500px">{{product.verify_message}} </p>

        <!-- 提交审核结果 -->
        <div v-if="product.verify_status === 2">
          <h1 style="font-size:20px;">请选择并提交审核结果：</h1>
          <div style="margin:0px auto;width=600px;text-align:center;margin-bottom:20px;">
            <el-select v-model="verifyStatusResult"
                       placeholder="请选择审核结果">
              <el-option v-for="(item, index) in verifyOptions"
                         :key="index"
                         :value="item.key"
                         :label="item.label"></el-option>
            </el-select>
            <div>
              <el-input type="textarea"
                        style="margin-top:10px; width:500px;"
                        v-if="verifyStatusResult === 4"
                        :rows="2"
                        placeholder="请输入审核失败原因"
                        v-model="verifyMessageResult">
              </el-input>
            </div>
          </div>
        </div>
      </div>

      <div class="stepControl">
        <el-button type="normal"
                   @click="switchStep(step - 1)"
                   :disabled="lastStepDisable">上一步</el-button>
        <el-button type="normal"
                   @click="switchStep(step + 1)"
                   v-if="(step !== 4 || product.verify_status !== 2)"
                   :disabled="nextStepDisable">下一步</el-button>
        <el-button v-if="(step === 4 && product.verify_status === 2)"
                   @click="_updataVerifyStatus(verifyStatusResult)"
                   :disabled="!verifyStatusResult"
                   style="margin:0 auto;text-align:center;margin-left:10px;"
                   type="success">提交审核结果</el-button>
      </div>

    </div>
  </d2-container>
</template>

<script>
import { productById, pkgListByProductId, getProductTypeList, ProductUpdate } from '@api/product'
import VerifyStatusUtil from '@/libs/util.enums.js'
import util from '@/libs/util.js'

export default {
  name: 'product-detail',
  data () {
    return {
      filename: __filename,
      product_id: -1,
      step: 1,
      product: {},
      product_packages: [],
      typeList: [],
      // 审核结果
      verifyStatusResult: '',
      // 审核消息（失败时）
      verifyMessageResult: '',
      verifyOptions: [{
        key: 1,
        label: '通过审核'
      },
      {
        key: 4,
        label: '未通过审核'
      }]
    }
  },
  watch: {
    // '$route' (to, from) {
    //   if (to.name === 'verify/product-detail') {
    //     console.log(to.query) // 在此调用函数
    //   }
    // },
    // step: function (val) {
    //   this.$router.replace({
    //     query: {
    //       productId: this.product_id,
    //       step: this.step
    //     }
    //   })
    // }
  },
  computed: {
    // 禁用上一步的条件
    lastStepDisable () {
      return this.step < 2
    },
    // 禁用下一步的条件
    nextStepDisable () {
      // 保存了才能下一步
      return this.step > 3
    }
  },
  methods: {
    switchStep (step) {
      this.step = step
    },
    typeStr (typeId) {
      let str = ''
      this.typeList.forEach(element => {
        if (element.id === typeId) {
          str = element.name
        }
      })
      return str
    },
    getStatusStr (value) {
      return VerifyStatusUtil.GetStatusStr(value)
    },
    formatDate (date) {
      return util.formatDate(date)
    },
    // 更新验证状态
    _updataVerifyStatus (verifyStatus) {
      if (!verifyStatus) {
        this.$message.error('请选择审核状态')
        return
      }

      let params = {
        id: this.product.id,
        verify_status: verifyStatus
      }
      if (verifyStatus === 4) {
        if (this.verifyMessageResult.length < 1) {
          this.$message.error('请输入审核失败原因')
          return
        }
        params.verify_message = this.verifyMessageResult
      } else if (verifyStatus === 1) {
        params.verify_message = '审核通过！'
      }

      ProductUpdate(params).then(data => {
        this.product.verify_status = params.verify_status
        this.product.verify_message = params.verify_message
      })
    },
    // 获取产品信息
    _getProductInfo (productId) {
      productById({ id: productId })
        .then(data => {
          this.product = data
        })
        .catch(error => {
          this.$message.error('获取产品信息出错' + error)
        })
    },
    // 获取套餐信息
    _pkgListByProductId (productId) {
      pkgListByProductId({ id: productId }).then(data => {
        this.product_packages = data
      })
        .catch(error => {
          this.$message.error('获取产品套餐信息出错' + error)
        })
    },
    _getProductTypeList () {
      getProductTypeList().then(data => {
        this.typeList = data
      }).catch(error => {
        this.$message.error('获取产品类型信息出错' + error)
      })
    }
  },
  created () {
    this.product_id = Number(this.$route.query.id)
    this._getProductTypeList()
    console.log(this.product_id)
    if (this.product_id) {
      this._getProductInfo(this.product_id)
      this._pkgListByProductId(this.product_id)
    }
    let step = this.$route.query.step
    if (step) {
      this.step = Number(step)
    }
  }
}
</script>

<style lang="scss" scoped>
  .submitButto{
    margin: 10px 0px 10px 20px
  }
  .editor{
    margin-left: auto;
    margin-right: auto;
    width: 850px;
  }
  .detail_htmlPreview{
    margin-left: auto;
    margin-right: auto;
    width: 838.2px;
    border-radius: 15px;
    border-style: solid;
    border-width: 5px;
    border-color:lightgray;
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .mediumInput {
    width:300px;
  }
  .content {
      margin: 12px;
  }
  .editZone {
      margin:15px;
  }
  .stepControl {
    padding: 10px 10px;
    text-align: center;
  }
  .support {
    line-height: 2em;
    font-size: 22px;
    color: #999;
  }
  .info-card{
    width:100%;
    .gray-box {
      padding: 0;
      display: block;
    }
    .left-label {
      text-align: left;
      float: left;
      height: 30px;
      font-size: 20px;
      margin: 0 0 10px;
    }

    .right-label {
      text-align: right;
      float: right;
      height: 30px;
      font-size: 20px;
      margin: 0 0 10px;
    }
    .info-des span{
      margin: 10px 0px
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
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
