// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Select } from 'antd'

const { Option } = Select

function LinePresetAnimation (props) {
  const onChangeAnimate = (animateType, data) => {
    data.animateType = animateType
  }

  const handleAnimateTypeChange = (type) => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      onChangeAnimate(type, currSelected)
      $topology.updateProps(false)
      props.dispatch({
        type: 'home/save',
        payload: {
          currSelected
        }
      })
    }
    props.onChange instanceof Function && props.onChange(type)
  }

  const data = props.home.currSelected || {}
  return (
    <Select value={data.animateType} onChange={handleAnimateTypeChange}>
      <Option value={undefined}>无</Option>
      <Option value='beads'>水珠流动</Option>
      <Option value='dot'>圆点</Option>
      <Option value='comet'>彗星</Option>
    </Select>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(LinePresetAnimation)
