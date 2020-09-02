// 核心库
import React, { useState } from 'react'
import { connect } from 'dva'
// 组件库
import { Input, Collapse, Tag, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
// 工具库
import uuid from '@/utils/uuid'

const { Panel } = Collapse

function TopoPropData (props) {
  const [inputKey, setInputKey] = useState(uuid())
  /**
   * 移除标签
   * @param {*} evt
   * @param {*} index
   */
  const handleRemoveTag = (evt, index) => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      currSelected.tags.splice(index, 1)
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
   * 添加标签
   * @param {*} value
   */
  const handleAddTag = (value) => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      const { tags } = currSelected
      if (tags.indexOf(value) === -1) {
        currSelected.tags.push(value)
        $topology.updateProps(false)
        props.dispatch({
          type: 'home/save',
          payload: {
            currSelected
          }
        })
      }
      setInputKey(uuid())
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
        <Tooltip title='标签可用于事件、动效面板中设置关联动画'>
          <QuestionCircleOutlined style={iconStyle} />
        </Tooltip>
        <span>{title}</span>
      </div>
    )
  }

  const defaultActiveKey = ['topoPropDataGroup-0']
  const data = props.home.currSelected || { tags: [] }
  return (
    <div>
      <div className='routes-home__prop-siderData--title'><span>节点ID:</span><span>{data.id}</span></div>
      <Collapse
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
      >
        <Panel key='topoPropDataGroup-0' header={renderCollapseHeader('标签')}>
          {
            data.tags.map((tag, index) => {
              return (
                <Tag
                  key={`${tag}_${index}`}
                  closable
                  onClose={(evt) => handleRemoveTag(evt, index)}
                  style={{ marginBottom: 8 }}
                >
                  {tag}
                </Tag>
              )
            })
          }
          <Input
            key={inputKey}
            onPressEnter={evt => handleAddTag(evt.target.value)}
            placeholder='回车添加标签'
          />
        </Panel>
      </Collapse>
    </div>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropData)
