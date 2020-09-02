// 核心库
import React, { useEffect, useMemo } from 'react'
import { connect } from 'dva'
// 组件库
import { Form, InputNumber, Button } from 'antd'

function TopoPropCompose (props) {
  const initialValues = {
    nodeWidth: null,
    nodeHeight: null,
    maxWidth: 800,
    horizontalNum: null,
    horizontalGap: 30,
    verticalGap: 30
  }

  const [form] = Form.useForm()
  const posInfo = useMemo(() => {
    const { selectedNodes } = props.home
    if (selectedNodes) {
      const minTops = []
      const maxBottoms = []
      const minLefts = []
      const maxRights = []
      selectedNodes.forEach(node => {
        const { rect } = node
        minTops.push(rect.y)
        maxBottoms.push(rect.y + rect.height)
        minLefts.push(rect.x)
        maxRights.push(rect.x + rect.width)
      })
      const minTop = Math.min(...minTops)
      const maxBottom = Math.max(...maxBottoms)
      const minLeft = Math.min(...minLefts)
      const maxRight = Math.max(...maxRights)
      return {
        minTop,
        maxBottom,
        minLeft,
        maxRight
      }
    }
    return {
      minTop: 0,
      maxBottom: 0,
      minLeft: 0,
      maxRight: 0
    }
  }, [props.home.selectedNodes])

  useEffect(() => {
    const { selectedNodes } = props.home
    if (!selectedNodes) {
      form.resetFields()
    }
    if (selectedNodes) {
      const { minLeft = 0, maxRight = 0 } = posInfo || {}
      const maxWidth = maxRight - minLeft
      if (maxWidth) {
        form.setFieldsValue({ maxWidth })
      }
    }
  }, [props.home.selectedNodes])

  const onFinish = (values) => {
    const { $topology, selectedNodes } = props.home
    const { nodeWidth, nodeHeight, maxWidth, horizontalNum, horizontalGap, verticalGap } = values
    selectedNodes.forEach(node => {
      nodeWidth && (node.rect.width = nodeWidth)
      nodeHeight && (node.rect.height = nodeHeight)
    })

    const { minTop, minLeft } = posInfo
    // 计算一行最大个数
    let initWidth = 0
    let maxHorizontalCount = 0
    for (let i = 0, j = selectedNodes.length; i < j; i++) {
      const { width } = selectedNodes[i].rect
      initWidth += width + horizontalGap
      if (initWidth > maxWidth + horizontalGap) break
      maxHorizontalCount = i + 1
    }
    if (horizontalNum) maxHorizontalCount = horizontalNum
    // 一行最少一个节点
    maxHorizontalCount = maxHorizontalCount || 1
    // 计算每一行的节点中最高的节点高度
    const maxNodesHeight = []
    const maxVerticalCount = Math.ceil(selectedNodes.length / maxHorizontalCount)
    for (let i = 1; i <= maxVerticalCount; i++) {
      const nodesHeight = []
      const beginIndex = (i - 1) * maxHorizontalCount
      const endIndex = i * maxHorizontalCount > selectedNodes.length ? selectedNodes.length : i * maxHorizontalCount
      for (let j = beginIndex, k = endIndex; j < k; j++) {
        const { height } = selectedNodes[j].rect
        nodesHeight.push(height)
      }
      maxNodesHeight.push(Math.max(...nodesHeight))
    }

    selectedNodes.forEach((node, index, arr) => {
      const { rect } = node
      // 计算节点 x 轴位置，左对齐
      const prevNodesCount = index % maxHorizontalCount
      const prevNodes = arr.slice(index - prevNodesCount, index)
      const prevNodesWidth = prevNodes.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.rect.width + horizontalGap
      }, 0)
      rect.x = minLeft + (prevNodesCount !== 0 ? prevNodesWidth : 0)
      // 计算节点 y 轴位置，上对齐
      const prevLinesCount = Math.floor(index / maxHorizontalCount)
      const prevLines = maxNodesHeight.slice(0, prevLinesCount)
      const prevLinesHeight = prevLines.reduce(function (accumulator, currentValue) {
        return accumulator + (currentValue + verticalGap)
      }, 0)
      rect.y = minTop + prevLinesHeight
    })
    $topology.updateProps()
    props.dispatch({
      type: 'home/save',
      payload: {
        selectedNodes
      }
    })
  }

  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 }
  }
  const tailLayout = {
    wrapperCol: { offset: 7, span: 17 }
  }
  return (
    <Form
      {...layout}
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      name='topoPropComposeForm'
    >
      <Form.Item name='nodeWidth' label='节点宽度'>
        <InputNumber
          title='固定每个节点的宽度'
          className='routes-home__prop-sider--collapse-inputFull'
        />
      </Form.Item>
      <Form.Item name='nodeHeight' label='节点高度'>
        <InputNumber
          title='固定每个节点的高度'
          className='routes-home__prop-sider--collapse-inputFull'
        />
      </Form.Item>
      <Form.Item name='maxWidth' label='最大宽度'>
        <InputNumber
          title='超出最大宽度换行'
          className='routes-home__prop-sider--collapse-inputFull'
        />
      </Form.Item>
      <Form.Item name='horizontalNum' label='水平个数'>
        <InputNumber
          title='设置一行节点水平摆放个数，设置此值，则忽略最大宽度设置'
          className='routes-home__prop-sider--collapse-inputFull'
        />
      </Form.Item>
      <Form.Item name='horizontalGap' label='水平间距'>
        <InputNumber
          title='节点之间水平间距'
          className='routes-home__prop-sider--collapse-inputFull'
        />
      </Form.Item>
      <Form.Item name='verticalGap' label='垂直间距'>
        <InputNumber
          title='节点之间垂直间距'
          className='routes-home__prop-sider--collapse-inputFull'
        />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>开始排版</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropCompose)
