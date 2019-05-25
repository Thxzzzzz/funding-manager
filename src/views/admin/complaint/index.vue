<template>
  <d2-container>
    <d2-crud ref="d2Crud"
             :options="options"
             :columns="columns"
             :data="orderList"
             :row-handle="rowHandle"
             @order-stopfunding="stopFundingClick()"
             :form-options="formOptions">
    </d2-crud>

  </d2-container>
</template>

<script>
import { GetComplaintOrders } from '@api/order'
import util from '@/libs/util.js'

export default {
  name: 'complaint',
  data () {
    return {
      // 确认删除对话框是否显示
      delOrderDialogShow: false,
      // 表格设置
      options: {
        size: 'mini',
        height: 800
      },
      seletedItem: {},
      seletedIndex: -1,
      // 信息列表
      orderList: [],
      // // 分页信息
      // pagination: {
      //   currentPage: 1,
      //   pageSize: 5,
      //   total: 0
      // },
      // 列定义
      columns: [
        {
          title: '订单ID',
          key: 'order_id',
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
        // {
        //   title: '收件人姓名',
        //   key: 'name',
        //   sortable: true
        // },
        // {
        //   title: '收件人地址',
        //   key: 'address',
        //   sortable: true
        // },
        // {
        //   title: '收件人电话',
        //   key: 'phone',
        //   sortable: true
        // },
        {
          title: '产品ID',
          key: 'product_id',
          sortable: true
        },
        {
          title: '产品名',
          key: 'product_name',
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
          key: 'order_status',
          sortable: true,
          formatter: this.orderStatusFormat
        },
        {
          title: '投诉原因',
          key: 'complaint_reason',
          sortable: true
        }
        // {
        //   title: '创建时间',
        //   key: 'created_at',
        //   sortable: true,
        //   formatter: this.formatDataTableValue
        // },
        // {
        //   title: '修改时间',
        //   key: 'updated_at',
        //   sortable: true,
        //   formatter: this.formatDataTableValue
        // },
      ],
      rowHandle: {
        custom: [
          {
            text: '暂停该众筹',
            type: 'danger',
            size: 'small',
            emit: 'order-stopfunding'
          }
        ]
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
    orderStatusFormat (row, column, cellValue, index) {
      if (cellValue === 1) {
        return '待支付'
      } else if (cellValue === 2) {
        return '已支付'
      } else if (cellValue === 3) {
        return '正在配货'
      } else if (cellValue === 4) {
        return '已发货'
      } else if (cellValue === 5) {
        return '交易成功'
      } else if (cellValue === 6) {
        return '正在退款'
      } else if (cellValue === 7) {
        return '交易关闭'
      }
      return '状态异常'
    },
    stopFundingClick (index, row) {
      this.$message({
        message: '该功能暂未开放',
        type: 'warning'
      })
    },
    // 打开了对话框
    handleDialogOpen ({ mode, row }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
    },

    // 获取订单列表
    _getAllOrders () {
      GetComplaintOrders().then(data => {
        this.orderList = data
      })
    }
  },
  created () {
    this._getAllOrders()
  }
}
</script>
