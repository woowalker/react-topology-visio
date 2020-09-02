// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, InputNumber, Collapse, Switch, Checkbox, Slider } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { PrefixPicker } from '@/components/colorPicker'
import LinePresetAnimation from './LinePresetAnimation'
// 工具库
import { set, debounce } from 'lodash'

const { Panel } = Collapse

function TopoPropAniLine (props) {
  /**
   * 设置事件值
   * @param {*} index
   * @param {*} keypath
   * @param {*} value
   */
  const formValueChange = (keypath, value) => {
    const { currSelected } = props.home
    if (currSelected) {
      set(currSelected, keypath, value)
      displayAnimate(false)
    }
  }

  /**
   * 设置背景颜色等调用频率高的操作，用防抖
   */
  const debounceValueChange = debounce(formValueChange, 200)

  /**
   * 更新动画属性并执行动画
   * @param {*} on
   */
  const displayAnimate = (on) => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      if (on) {
        currSelected.animateStart = Date.now()
      } else {
        currSelected.animateStart = 0
      }
      $topology.animate()
      $topology.updateProps(false)
      props.dispatch({
        type: 'home/save',
        payload: {
          currSelected
        }
      })
    }
  }

  /**
   * 渲染折叠版标题
   * @param {*} title
   */
  const renderCollapseHeader = (title) => {
    const iconStyle = {
      fontSize: '16px',
      marginRight: '4px'
    }
    return (
      <div className='routes-home__prop-sider--collapse-header'>
        <SettingOutlined style={iconStyle} />
        <span>{title}</span>
      </div>
    )
  }

  const defaultActiveKey = ['topoPropAniLineGroup-0']
  const data = props.home.currSelected || { animateFrames: [] }
  return (
    <Form name='topoPropAniLineForm'>
      <Collapse
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
      >
        <Panel key='topoPropAniLineGroup-0' header={renderCollapseHeader('动画')}>
          <Form.Item label='播放'>
            <Switch
              checked={data.animateStart}
              onChange={displayAnimate}
              size='small'
              className='routes-home__prop-siderAni--switch'
            />
            <div className='routes-home__prop-siderAni--auto'>
              <Checkbox
                checked={data.animatePlay || false}
                onChange={(evt) => formValueChange('animatePlay', evt.target.checked)}
                style={{ fontSize: 12 }}
              >
                自动播放
              </Checkbox>
            </div>
          </Form.Item>
          <Form.Item label='动画类型'>
            <LinePresetAnimation onChange={() => displayAnimate(false)} />
          </Form.Item>
          <Form.Item label='颜色'>
            <Input
              prefix={
                <PrefixPicker
                  initColor={data.animateColor || '#3d3d3d'}
                  onChange={(color) => debounceValueChange('animateColor', color.hex)}
                />
              }
              value={data.animateColor || ''}
              onChange={(evt) => formValueChange('animateColor', evt.target.value)}
            />
          </Form.Item>
          <Form.Item label='播放速度'>
            <Slider
              min={1}
              max={20}
              value={data.animateSpan}
              onChange={value => formValueChange('animateSpan', value)}
            />
          </Form.Item>
          <Form.Item label='圆点大小'>
            <InputNumber
              min={0}
              step={1}
              value={data.animateDotSize}
              onChange={value => formValueChange('animateDotSize', value)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label='循环次数'>
            <InputNumber
              min={0}
              step={1}
              value={data.animateCycle}
              onChange={value => formValueChange('animateCycle', value)}
              placeholder='<1 无限循环'
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item label='下个动画'>
            <Input
              value={data.nextAnimate}
              onChange={evt => formValueChange('nextAnimate', evt.target.value)}
              placeholder='动画标签'
            />
          </Form.Item>
        </Panel>
      </Collapse>
    </Form>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropAniLine)
