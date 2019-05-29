<template>
  <d2-container>
    <div class="content">
      <el-steps :active="step"
                align-center>
        <el-step title="用户信息"></el-step>
        <el-step title="执照信息"></el-step>
        <el-step title="审核结果"></el-step>
      </el-steps>

      <!-- 用户信息 -->
      <div class="editZone"
           v-if="step === 1">
        <div class="textDiv">
          <span class="hintText">用&nbsp;户&nbsp; ID:</span>
          <span class="infoText">{{userInfo.id}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">用&nbsp; 户 &nbsp;名:</span>
          <span class="infoText">{{userInfo.username}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">用户昵称:</span>
          <span class="infoText">{{userInfo.nickname}}</span>
        </div>
        <!-- <div class="textDiv">
          <span class="hintText">审核状态:</span>
          <span class="infoText">{{getStatusStr(license.verify_status)}}</span>
        </div> -->
        <div class="textDiv">
          <span class="hintText">邮箱地址:</span>
          <span class="infoText">{{userInfo.email}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">联系电话:</span>
          <span class="infoText">{{userInfo.phone}}</span>
        </div>
        <div class="textDiv">
          <span class="hintText">创建申请时间:</span>
          <span class="infoText"
                        v-text="formatDate(license.created_at)"></span>
        </div>
        <div class="textDiv">
          <span class="hintText">执照更新时间:</span>
          <span class="infoText"
                        v-text="formatDate(license.updated_at)"></span>
        </div>

      </div>

      <!-- 执照信息 -->
      <div class="editZone"
           v-if="step === 2">
        <div class="textDiv">
          <span class="hintText">公司名称:</span>
          <span class="infoText">{{license.company_name}}</span>
        </div>

        <div class="textDiv">
          <span class="hintText"> 公司简介:</span>
          <span class="infoText"> {{license.description}}</span>
        </div>

        <div class="textDiv">
          <span class="hintText"> 联系地址:</span>
          <span class="infoText"> {{license.address}}</span>
        </div>

        <div class="textDiv">
          <span class="hintText"> 官方电话:</span>
          <span class="infoText"> {{license.phone}}</span>
        </div>

        <div class="textDiv">
          <span class="hintText"> 营业执照: </span>
          <span class="infoText"> <img :src="license.license_image_url"
                 style="height:100px;"
                 @click="showLiceseImage(license.license_image_url)" /></span>
        </div>

      </div>

      <!-- 提交审核结果 -->
      <div class="editZone"
           v-if="step === 3">
        <h1 style="font-size:20px;">当前审核状态:</h1>
        <p style="font-size:40px; margin:10px auto;text-align:center;color:black">{{getStatusStr(license.verify_status)}}</p>
        <!-- 失败原因： -->
        <p v-if="license.verify_status === 4"
           style="font-size:24px; margin:10px auto;text-align:center;color:black;width:500px">{{license.verify_message}} </p>

        <!-- 提交审核结果 -->
        <div v-if="license.verify_status === 2">
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
                   v-if="(step !== 3 || license.verify_status !== 2)"
                   :disabled="nextStepDisable">下一步</el-button>
        <el-button v-if="(step === 3 && license.verify_status === 2)"
                   @click="_updataVerifyStatus(verifyStatusResult)"
                   :disabled="!verifyStatusResult"
                   style="margin:0 auto;text-align:center;margin-left:10px;"
                   type="success">提交审核结果</el-button>
      </div>

    </div>

    <el-dialog :visible.sync="imgPreviewDialogShow">
      <img width="100%"
           :src="imgPreviewUrl"
           alt="">
    </el-dialog>
  </d2-container>
</template>

<script>
import { licenseById, LicenseUpdate } from '@api/license'
import { GetUserById } from '@api/user'
import VerifyStatusUtil from '@/libs/util.enums.js'
import util from '@/libs/util.js'

export default {
  name: 'license-detail',
  data () {
    return {
      filename: __filename,
      imgPreviewDialogShow: false,
      imgPreviewUrl: '',
      license_id: -1,
      step: 1,
      license: {},
      userInfo: {},
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
  computed: {
    // 禁用上一步的条件
    lastStepDisable () {
      return this.step < 2
    },
    // 禁用下一步的条件
    nextStepDisable () {
      // 保存了才能下一步
      return this.step > 2
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
    showLiceseImage (imgUrl) {
      this.imgPreviewUrl = imgUrl
      this.imgPreviewDialogShow = true
    },
    // 更新验证状态
    _updataVerifyStatus (verifyStatus) {
      if (!verifyStatus) {
        this.$message.error('请选择审核状态')
        return
      }

      let params = {
        id: this.license.id,
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

      LicenseUpdate(params).then(data => {
        this.license.verify_status = params.verify_status
        this.license.verify_message = params.verify_message
      })
    },
    // 获取执照信息
    _getLicenseInfo (licenseId) {
      licenseById({ id: licenseId })
        .then(data => {
          this.license = data
          this._getUserById(data.user_id)
        })
        .catch(error => {
          this.$message.error('获取执照信息出错' + error)
        })
    },
    _getUserById (userId) {
      GetUserById({ id: userId }).then(data => {
        this.userInfo = data
      }).catch(error => {
        this.$message.error('获取商家信息出错' + error)
      })
    }
  },
  created () {
    this.license_id = Number(this.$route.query.id)
    console.log(this.license_id)
    if (this.license_id) {
      this._getLicenseInfo(this.license_id)
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
