// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Select } from 'antd'
import { Node } from '@topology/core/src/models/node'

const { Option } = Select

function NodePresetAnimation (props) {
  const onChangeAnimate = (animateType, data) => {
    data.animateType = animateType
    data.animateFrames = []
    data.animateDuration = 0
    // 推入动画帧
    const state = Node.cloneState(data)
    switch (data.animateType) {
      case 'upDown':
        state.rect.y -= 10
        state.rect.ey -= 10
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        })
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        })
        data.animateFrames.push({
          duration: 200,
          linear: true,
          state: Node.cloneState(state)
        })
        break
      case 'leftRight':
        state.rect.x -= 10
        state.rect.ex -= 10
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        })
        state.rect.x += 20
        state.rect.ex += 20
        data.animateFrames.push({
          duration: 80,
          linear: true,
          state: Node.cloneState(state)
        })
        state.rect.x -= 20
        state.rect.ex -= 20
        data.animateFrames.push({
          duration: 50,
          linear: true,
          state: Node.cloneState(state)
        })
        state.rect.x += 20
        state.rect.ex += 20
        data.animateFrames.push({
          duration: 30,
          linear: true,
          state: Node.cloneState(state)
        })
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(data)
        })
        break
      case 'heart':
        state.rect.x -= 5
        state.rect.ex += 5
        state.rect.y -= 5
        state.rect.ey += 5
        state.rect.width += 5
        state.rect.height += 10
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        })
        data.animateFrames.push({
          duration: 400,
          linear: true,
          state: Node.cloneState(data)
        })
        break
      case 'success':
        state.strokeStyle = '#237804'
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        })
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        })
        state.strokeStyle = '#237804'
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        })
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(data)
        })
        state.strokeStyle = '#237804'
        state.fillStyle = '#389e0d22'
        data.animateFrames.push({
          duration: 3000,
          linear: true,
          state
        })
        break
      case 'warning':
        state.strokeStyle = '#fa8c16'
        state.dash = 2
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state
        })
        state.strokeStyle = '#fa8c16'
        state.dash = 0
        data.animateFrames.push({
          duration: 500,
          linear: true,
          state: Node.cloneState(state)
        })
        state.strokeStyle = '#fa8c16'
        state.dash = 2
        data.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state)
        })
        break
      case 'error':
        state.strokeStyle = '#cf1322'
        state.fillStyle = '#cf132222'
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state
        })
        break
      case 'show':
        state.strokeStyle = '#fa541c'
        state.rotate = -10
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        })
        state.rotate = 10
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        })
        state.rotate = 0
        data.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state)
        })
        break
      default:
        data.animateFrames = []
        break
    }
    // 计算动画时长
    for (const item of data.animateFrames) {
      data.animateDuration += item.duration
    }
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
      <Option value='upDown'>上下跳动</Option>
      <Option value='leftRight'>左右跳动</Option>
      <Option value='heart'>心跳</Option>
      <Option value='success'>成功</Option>
      <Option value='warning'>警告</Option>
      <Option value='error'>错误</Option>
      <Option value='show'>强调</Option>
    </Select>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(NodePresetAnimation)
