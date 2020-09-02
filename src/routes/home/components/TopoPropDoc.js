// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, Popconfirm, Collapse } from 'antd'
import { PrefixPicker } from '@/components/colorPicker'
import { DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import ImgUpload from '@/components/imgUpload'
// 工具库
import { debounce } from 'lodash'

const { Panel } = Collapse

function TopoPropDoc (props) {
  /**
   * 设置事件值
   * @param {*} index
   * @param {*} keypath
   * @param {*} value
   */
  const formValueChange = (keypath, value) => {
    const { $topology } = props.home
    if ($topology) {
      $topology.data[keypath] = value
      keypath === 'bkImage' && $topology.clearBkImg()
      $topology.updateProps()
      props.dispatch({
        type: 'home/save',
        payload: {
          $topology
        }
      })
    }
  }

  const clearBkImg = () => {
    const { $topology } = props.home
    if ($topology) {
      $topology.data.bkImage = ''
      $topology.clearBkImg()
      $topology.updateProps()
      props.dispatch({
        type: 'home/save',
        payload: {
          $topology
        }
      })
    }
  }

  /**
   * 设置背景颜色等调用频率高的操作，用防抖
   */
  const debounceValueChange = debounce(formValueChange, 200)

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
        <QuestionCircleOutlined style={iconStyle} />
        <span>{title}</span>
      </div>
    )
  }

  const { data } = props.home.$topology || { data: {} }
  const tipsStyle = {
    position: 'absolute',
    width: '100%',
    bottom: 0
  }
  return (
    <Form name='topoPropDocForm' style={{ marginTop: 10 }}>
      <Form.Item label='图文名称'>
        <Input
          defaultValue={data.name || '空白图文'}
          onBlur={(evt) => formValueChange('name', evt.target.value)}
        />
      </Form.Item>
      <Form.Item label='背景颜色'>
        <Input
          prefix={
            <PrefixPicker
              initColor={data.bkColor || '#ffffff'}
              onChange={(color) => debounceValueChange('bkColor', color.hex)}
            />
          }
          value={data.bkColor || ''}
          onChange={(evt) => formValueChange('bkColor', evt.target.value)}
          className='routes-home__prop-sider--collapse-inputNum'
        />
      </Form.Item>
      <Form.Item label='背景图片'>
        <ImgUpload preset={data.bkImage || ''} success={(image) => formValueChange('bkImage', image)} />
        {
          data.bkImage
            ? (
              <Popconfirm
                title='删除背景图片？'
                onConfirm={clearBkImg}
                okText='确认'
                cancelText='取消'
              >
                <DeleteOutlined
                  className='mg-l5'
                  style={{ fontSize: 18, verticalAlign: 'bottom' }}
                />
              </Popconfirm>
            )
            : null
        }
      </Form.Item>
      <Collapse
        bordered={false}
        defaultActiveKey='topoPropDocGroup-0'
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
        style={tipsStyle}
      >
        <Panel key='topoPropDocGroup-0' header={renderCollapseHeader('小提示')}>
          <ul className='routes-home__prop-siderDoc--tip'>
            <li>← ↑ → ↓ ：移动5个像素</li>
            <li>Ctrl + Z：撤销</li>
            <li>Ctrl + SHIFT + Z：重做</li>
            <li>Ctrl + 鼠标点击：多选</li>
            <li>Ctrl + 鼠标滚轮：缩放画布</li>
            <li>Ctrl + ← ↑ → ↓ ：移动1个像素</li>
            <li>Ctrl + 鼠标拖拽空白：移动整个画布</li>
            <li>Shift/Alt + 鼠标拖拽节点：独立拖拽（子）节点</li>
          </ul>
        </Panel>
      </Collapse>
    </Form>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropDoc)
