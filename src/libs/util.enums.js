const VrifyStatusUtil = [{
  key: 1,
  label: '通过审核'
},
{
  key: 2,
  label: '待审核'
},
{
  key: 3,
  label: '待提交'
},
{
  key: 4,
  label: '未通过审核'
}
]
/**
 *@description 获得审核状态对应的文字
 *@param {Number} 状态值 1：已通过 2：待审核 3: 待提交 4: 未通过
 */
VrifyStatusUtil.GetStatusStr = function (value) {
  if (value === 1) return '通过审核'
  else if (value === 2) return '待审核'
  else if (value === 3) return '待提交'
  else if (value === 4) return '未通过审核'
}

export default VrifyStatusUtil
