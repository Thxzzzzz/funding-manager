<template>
  <d2-container>
    <d2-crud ref="d2Crud"
             :options="options"
             :columns="columns"
             :data="orderList"
             :rowHandle="rowHandle"
             edit-title="我的修改"
             :edit-template="editTemplate"
             :edit-rules="editRules"
             :add-template="addTemplate"
             :add-rules="addRules"
             :form-options="formOptions"
             @dialog-open="handleDialogOpen"
             @row-add="handleRowAdd"
             @row-edit="handleRowEdit"
             @dialog-cancel="handleDialogCancel">
    </d2-crud>
    </div>
  </d2-container>
</template>

<script>
import { OrderAll, OrderUpdate } from '@api/order'
import util from '@/libs/util.js'

export default {
  name: 'database-order',
  data () {
    return {
      // 表格设置
      options: {
        size: 'mini'
      },
      // 信息列表
      orderList: [],
      // 列定义
      columns: [
        {
          title: '订单ID',
          key: 'id',
          sortable: true
        },
        {
          title: '买家ID',
          key: 'buyer_id',
          sortable: true
        },
        {
          title: '卖家ID',
          key: 'seller_id',
          sortable: true
        },
        {
          title: '收件人姓名',
          key: 'name',
          sortable: true
        },
        {
          title: '收件人地址',
          key: 'address',
          sortable: true
        },
        {
          title: '收件人电话',
          key: 'phone',
          sortable: true
        },
        {
          title: '产品ID',
          key: 'product_id',
          sortable: true
        },
        {
          title: '套餐ID',
          key: 'product_package_id',
          sortable: true
        },
        {
          title: '购买数量',
          key: 'nums',
          sortable: true
        },
        {
          title: '单价',
          key: 'unit_price',
          sortable: true
        },
        {
          title: '总价',
          key: 'total_price',
          sortable: true
        },
        // 订单状态，1:下单,2:付款,3:配货,4:出库,5:交易成功,6:退款,7:交易取消
        {
          title: '订单状态',
          key: 'status',
          sortable: true
        },
        {
          title: '创建时间',
          key: 'created_at',
          sortable: true,
          formatter: this.formatDataTableValue
        },
        {
          title: '修改时间',
          key: 'updated_at',
          sortable: true,
          formatter: this.formatDataTableValue
        },
        {
          title: '删除时间',
          key: 'deleted_at',
          sortable: true,
          formatter: this.formatDataTableValue
        }
      ],
      // 表单校验
      addRules: {
        username: [ { required: true, message: '请输入账号', trigger: 'blur' } ],
        nickname: [ { required: true, message: '请输入昵称', trigger: 'blur' } ],
        password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
      },
      // 表单校验
      editRules: {
        username: [ { required: true, message: '请输入账号', trigger: 'blur' } ],
        nickname: [ { required: true, message: '请输入昵称', trigger: 'blur' } ]
      },
      rowHandle: {
        columnHeader: '编辑表格',
        edit: {
          icon: 'el-icon-edit',
          text: '点我进行编辑',
          size: 'small'
        }
      },
      // 添加对话框的表单格式
      addTemplate: {
        id: {
          title: 'ID',
          value: '',
          component: {
            disabled: true
          }
        },
        username: {
          title: '账号',
          value: ''
        },
        nickname: {
          title: '昵称',
          value: ''
        },
        password: {
          title: '密码',
          value: ''
        },
        email: {
          title: '邮箱',
          value: ''
        },
        phone: {
          title: '电话',
          value: ''
        }
      },

      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      }
    }
  },
  computed: {
    // 编辑对话框的表单格式
    editTemplate () {
      // 编辑的时候显示修改密码
      let template = JSON.parse(JSON.stringify(this.addTemplate))
      template.password.title = '修改密码'
      return template
    }
  },
  methods: {
    formatDataTableValue (row, column, cellValue, index) {
      return util.formatDate(cellValue)
    },
    // 打开了对话框
    handleDialogOpen ({ mode, row }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
    },
    // 普通的新增
    addRow () {
      this.$refs.d2Crud.showDialog({
        mode: 'add'
      })
    },
    // 新增 新增审核员
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      let params = row
      // 设置为审核员
      params.role_id = 1
      delete params.id
      OrderUpdate(params).then(data => {
        console.log(row)
        this.$message({
          message: '新增审核员成功',
          type: 'success'
        })
        // done可以传入一个对象来修改提交的某个字段
        done(data)
        this.formOptions.saveLoading = false
      }).catch(error => {
        this.$message({
          message: '新增审核员出错' + error,
          type: 'warning'
        })
        this.formOptions.saveLoading = false
      })
    },
    // 表格编辑 更新信息
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      let params = row
      // 设置为审核员
      // params.role_id = 1
      OrderUpdate(params).then(data => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        // done可以传入一个对象来修改提交的某个字段
        done(data)
        this.formOptions.saveLoading = false
      }).catch(error => {
        this.$message({
          message: '编辑出错' + error,
          type: 'warning'
        })
        this.formOptions.saveLoading = false
      })
    },
    // 取消编辑
    handleDialogCancel (done) {
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
      done()
    },
    // 获取订单列表
    _getAllOrders () {
      OrderAll().then(data => {
        this.orderList = data
      })
    }
  },
  created () {
    this._getAllOrders()
  }
}
</script>
