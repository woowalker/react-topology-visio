// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, InputNumber, Collapse, Switch, Checkbox } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import NodePresetAnimation from './NodePresetAnimation'
// 工具库
import { set } from 'lodash'

const { Panel } = Collapse

function TopoPropAni (props) {
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

  const defaultActiveKey = ['topoPropAniGroup-0']
  const data = props.home.currSelected || { animateFrames: [] }
  return (
    <Form name='topoPropAniForm'>
      <Collapse
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
      >
        <Panel key='topoPropAniGroup-0' header={renderCollapseHeader('动画')}>
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
          <Form.Item label='时长'>
            <span>{data.animateDuration} ms</span>
          </Form.Item>
          <Form.Item label='特效'>
            <NodePresetAnimation onChange={() => displayAnimate(false)} />
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

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropAni)
