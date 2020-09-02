// 核心库
import React, { useState } from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, Select, Collapse, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
// 工具库
import uuid from '@/utils/uuid'

const { Panel } = Collapse
const { Option } = Select

function TopoPropEvents (props) {
  const [activeKey, setActiveKey] = useState([])

  /**
   * 添加事件
   */
  const handleAddEvent = () => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      const { events } = currSelected
      const uniqueKey = uuid()
      /**
       * type 0: 单击 1: 双击
       * action 0: 链接 1: 动画
       */
      events.push({
        type: 0,
        action: 0,
        value: '',
        uniqueKey
      })
      $topology.updateProps(false)
      props.dispatch({
        type: 'home/save',
        payload: {
          currSelected
        }
      })
      // 展开新增的面板
      setActiveKey([...activeKey, uniqueKey])
    }
  }

  /**
   * 删除事件
   * @param {*} e
   * @param {*} index
   */
  const handleDelEvent = (e, index) => {
    e.stopPropagation()
    const { $topology, currSelected } = props.home
    if (currSelected) {
      const { events } = currSelected
      events.splice(index, 1)
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
   * 设置事件值
   * @param {*} index
   * @param {*} keypath
   * @param {*} value
   */
  const formValueChange = (index, keypath, value) => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      const { events } = currSelected
      events[index][keypath] = value
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
   * 面板展开收起
   * @param {*} curr
   */
  const handleCollapseChange = (curr) => {
    setActiveKey(curr)
  }

  /**
   * 渲染折叠版标题
   * @param {*} evt
   * @param {*} index
   */
  const renderCollapseHeader = (index) => {
    const iconStyle = {
      fontSize: '16px',
      marginLeft: '8px'
    }
    return (
      <div className='routes-home__prop-sider--collapse-header'>
        <span>事件</span>
        <DeleteOutlined onClick={(e) => handleDelEvent(e, index)} style={iconStyle} />
      </div>
    )
  }

  const data = props.home.currSelected || { events: [] }
  return (
    <Form name='topoPropEventsForm'>
      <Button
        block
        type='primary'
        size='small'
        onClick={handleAddEvent}
        className='mg-t10 mg-b10'
      >
        添加事件
      </Button>
      <Collapse
        bordered={false}
        activeKey={activeKey}
        onChange={handleCollapseChange}
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
      >
        {
          data.events.map((evt, index) => {
            const { type, action, value } = evt
            return (
              <Panel key={evt.uniqueKey} header={renderCollapseHeader(index)}>
                <Form.Item label='事件类型'>
                  <Select
                    value={type}
                    onChange={(val) => formValueChange(index, 'type', val)}
                  >
                    <Option value={0}>单击</Option>
                    <Option value={1}>双击</Option>
                  </Select>
                </Form.Item>
                <Form.Item label='事件行为'>
                  <Select
                    value={action}
                    onChange={(val) => formValueChange(index, 'action', val)}
                  >
                    <Option value={0}>打开链接</Option>
                    <Option value={1}>执行动画</Option>
                  </Select>
                </Form.Item>
                <Form.Item label={action === 0 ? '事件类型' : '动画标签'}>
                  <Input
                    defaultValue={value}
                    onBlur={(evt) => formValueChange(index, 'value', evt.target.value)}
                    placeholder={action === 0 ? 'http://或者https://' : '缺省执行自身动画'}
                  />
                </Form.Item>
              </Panel>
            )
          })
        }
      </Collapse>
    </Form>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropEvents)
