// 核心库
import React, { useEffect } from 'react'
// 组件库
import echarts from 'echarts/lib/echarts'
import { Topology } from '@topology/core'
import { register as registerFlow } from '@topology/flow-diagram'
import { register as registerActivity } from '@topology/activity-diagram'
import { register as registerClass } from '@topology/class-diagram'
import { register as registerSequence } from '@topology/sequence-diagram'
import { register as registerChart } from '@topology/chart-diagram'
// 工具库
import { cloneDeep } from 'lodash'

// 注册图形库
registerFlow()
registerActivity()
registerClass()
registerSequence()
registerChart(echarts)

function PreviewContent (props) {
  const initCanvas = () => {
    setTimeout(() => {
      const canvas = new Topology('preview-canvas')
      const canvasData = cloneDeep(props.data)
      canvasData.locked = true
      canvas.open(canvasData)
    }, 200)
  }

  useEffect(initCanvas, [])

  return (
    <div id='preview-canvas' style={{ width: '100%', height: '100%' }} />
  )
}

export default PreviewContent
