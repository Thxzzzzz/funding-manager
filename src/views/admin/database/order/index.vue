<template>
  <d2-container>
    <d2-crud ref="d2Crud"
             :options="options"
             :columns="columns"
             :data="orderList"
             :rowHandle="rowHandle"
             @order-delete="orderDeleteClick"
             @order-recover="orderRecoverClick"
             :form-options="formOptions">
    </d2-crud>
    <el-dialog title="删除订单"
               width="30%"
               :visible.sync="delOrderDialogShow">
      <p>订单号：{{seletedItem.id}}</p>
      <p>买家ID：{{seletedItem.buyer_id}}</p>
      <p>卖家ID：{{seletedItem.seller_id}}</p>
      <p>产品ID：{{seletedItem.product_id}}</p>
      <p>确认要删除该订单吗？</p>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="delOrderDialogShow = false">取 消</el-button>
        <el-button type="primary"
                   @click="_orderDelete(seletedIndex, seletedItem)">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { OrderAll, OrderDelete, OrderRecover } from '@api/order'
import util from '@/libs/util.js'

export default {
  name: 'database-order',
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
        // {
        //  title: '收件人地址',
        //  key: 'address',
        //  sortable: true
        // },
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
        //  {
        //    title: '购买数量',
        //    key: 'nums',
        //    sortable: true
        //   },
        //  {
        //  title: '单价',
        //  key: 'unit_price',
        //  sortable: true
        //  },
        {
          title: '总价',
          key: 'total_price',
          sortable: true
        },
        // 订单状态，1:下单,2:付款,3:配货,4:出库,5:交易成功,6:退款,7:交易取消
        {
          title: '订单状态',
          key: 'status',
          sortable: true,
          formatter: this.orderStatusFormat
        },
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
        {
          title: '删除时间',
          key: 'deleted_at',
          sortable: true,
          formatter: (row, column, cellValue, index) => {
            if (cellValue === null) return '未删除'
            return util.formatDate(cellValue)
          },
          filters: [
            { text: '未删除', value: true },
            { text: '已删除', value: false }
          ],
          filterMethod (value, row) {
            if (value) {
              // null 的是未删除
              return row.deleted_at === null
            }
            // 非 null 是已删除
            return row.deleted_at !== null
          }
        }
      ],

      rowHandle: {
        custom: [
          {
            text: '删除',
            type: 'danger',
            size: 'small',
            emit: 'order-delete',
            show: (index, row) => {
              return row.deleted_at === null
            }
          },
          {
            text: '恢复',
            type: 'warning',
            size: 'small',
            emit: 'order-recover',
            show: (index, row) => {
              return row.deleted_at !== null
            }
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
    // 打开了对话框
    handleDialogOpen ({ mode, row }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
    },
    // 点击删除
    orderDeleteClick ({ index, row }) {
      console.log(index)
      console.log(row)
      this.seletedIndex = index
      this.seletedItem = row
      this.delOrderDialogShow = true
    },
    // 点击恢复
    orderRecoverClick ({ index, row }) {
      console.log(index)
      console.log(row)
      this.seletedIndex = index
      this.seletedItem = row
      this._orderRecover(this.seletedIndex, this.seletedItem)
    },
    // 删除订单
    _orderDelete (index, item) {
      let params = {
        id: item.id
      }
      OrderDelete(params).then(data => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.$refs.d2Crud.updateCell(index, 'deleted_at', new Date())
        this.delOrderDialogShow = false
      }).catch(error => {
        this.$message({
          message: '删除出错' + error,
          type: 'warning'
        })
      })
    },
    // 恢复订单
    _orderRecover (index, item) {
      let params = {
        id: item.id
      }
      OrderRecover(params).then(data => {
        this.$message({
          message: '恢复成功',
          type: 'success'
        })
        this.$refs.d2Crud.updateCell(index, 'deleted_at', null)
      })
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
