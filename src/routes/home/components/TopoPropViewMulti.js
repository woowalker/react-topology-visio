// 核心库
import React, { useState, useMemo } from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, Select, InputNumber, Collapse, Row, Col } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { PrefixPicker } from '@/components/colorPicker'
import TopoPropCompose from './TopoPropCompose'
// 工具库
import { set, cloneDeep, debounce } from 'lodash'
import { lineTypes } from './svgs'

const { Panel } = Collapse
const { Option } = Select

function TopoPropViewMulti (props) {
  const [colors, setColors] = useState({
    strokeStyle: '#222222',
    font: {
      color: '#222222',
      background: '#ffffff'
    }
  })
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
      const middle = (maxRight - minLeft) / 2 + minLeft
      const center = (maxBottom - minTop) / 2 + minTop
      return {
        minTop,
        maxBottom,
        minLeft,
        maxRight,
        middle,
        center
      }
    }
    return {
      minTop: 0,
      maxBottom: 0,
      minLeft: 0,
      maxRight: 0,
      middle: 0,
      center: 0
    }
  }, [props.home.selectedNodes])

  /**
   * 设置表格数据
   * @param {*} keypath
   * @param {*} value
   */
  const formValueChange = (keypath, value) => {
    const { $topology, selectedNodes } = props.home
    if (selectedNodes) {
      selectedNodes.forEach(node => {
        set(node, keypath, value)
      })
      $topology.updateProps()
      props.dispatch({
        type: 'home/save',
        payload: {
          selectedNodes
        }
      })
      // 设置 state 状态
      const cloneColors = cloneDeep(colors)
      set(cloneColors, keypath, value)
      setColors(cloneColors)
    }
  }

  /**
   * 设置背景颜色等调用频率高的操作，用防抖
   */
  const debounceValueChange = debounce(formValueChange, 200)

  /**
   * 设置对齐方式
   * @param {*} align
   */
  const handleAlignSet = (align) => {
    const { $topology, selectedNodes } = props.home
    if (selectedNodes) {
      const { minLeft, maxRight, minTop, maxBottom, middle, center } = posInfo
      switch (align) {
        case 'left':
          selectedNodes.forEach(({ rect }) => { rect.x = minLeft })
          break
        case 'right':
          selectedNodes.forEach(({ rect }) => { rect.x = maxRight - rect.width })
          break
        case 'top':
          selectedNodes.forEach(({ rect }) => { rect.y = minTop })
          break
        case 'bottom':
          selectedNodes.forEach(({ rect }) => { rect.y = maxBottom - rect.height })
          break
        case 'middle':
          selectedNodes.forEach(({ rect }) => { rect.x = middle - rect.width / 2 })
          break
        case 'center':
          selectedNodes.forEach(({ rect }) => { rect.y = center - rect.height / 2 })
          break
        default:
          break
      }
      $topology.updateProps()
      props.dispatch({
        type: 'home/save',
        payload: {
          selectedNodes
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

  const defaultActiveKey = ['topoPropViewMultiGroup-0', 'topoPropViewMultiGroup-1', 'topoPropViewMultiGroup-2', 'topoPropViewMultiGroup-3']
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={defaultActiveKey}
      expandIconPosition='right'
      className='routes-home__prop-sider--collapse'
    >
      <Panel key='topoPropViewMultiGroup-0' header={renderCollapseHeader('对齐')}>
        <div className='routes-home__prop-sider--collapse-alignWrap'>
          <img onClick={() => handleAlignSet('left')} src={require('../../../assets/align/align_left.png')} alt='左对齐' title='左对齐' />
          <img onClick={() => handleAlignSet('right')} src={require('../../../assets/align/align_right.png')} alt='右对齐' title='右对齐' />
          <img onClick={() => handleAlignSet('top')} src={require('../../../assets/align/align_top.png')} alt='上对齐' title='上对齐' />
          <img onClick={() => handleAlignSet('bottom')} src={require('../../../assets/align/align_bottom.png')} alt='下对齐' title='下对齐' />
          <img onClick={() => handleAlignSet('middle')} src={require('../../../assets/align/align_middle.png')} alt='垂直居中' title='垂直居中' />
          <img onClick={() => handleAlignSet('center')} src={require('../../../assets/align/align_center.png')} alt='水平居中' title='水平居中' />
        </div>
      </Panel>
      <Panel key='topoPropViewMultiGroup-1' header={renderCollapseHeader('排版')}>
        <TopoPropCompose />
      </Panel>
      <Panel key='topoPropViewMultiGroup-2' header={renderCollapseHeader('样式')}>
        <Form name='TopoPropViewMultiForm_style' layout='vertical'>
          {/** 线条类型、透明度 */}
          <Row>
            <Col span='12'>
              <Form.Item label='线条类型'>
                <Select
                  onChange={(value) => formValueChange('dash', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  {
                    lineTypes.map(line => {
                      return (
                        <Option key={`${line.title}_${line.value}`} value={line.value}>
                          <div title={line.title} style={{ width: '100%', height: 30 }}>
                            {line.content}
                          </div>
                        </Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='透明度(0 - 1)'>
                <InputNumber
                  min={0}
                  max={1}
                  step={0.1}
                  onChange={(value) => formValueChange('globalAlpha', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 线条颜色、宽度 */}
          <Row>
            <Col span='12'>
              <Form.Item label='线条颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={colors.strokeStyle}
                      onChange={(color) => debounceValueChange('strokeStyle', color.hex)}
                    />
                  }
                  value={colors.strokeStyle}
                  onChange={(evt) => formValueChange('strokeStyle', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='线条宽度(px)'>
                <InputNumber
                  onChange={(value) => formValueChange('lineWidth', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Panel>
      <Panel key='topoPropViewMultiGroup-3' header={renderCollapseHeader('文字')}>
        <Form name='TopoPropViewMultiForm_font' layout='vertical'>
          {/** 字体、大小 */}
          <Row>
            <Col span='12'>
              <Form.Item label='字体'>
                <Input
                  onChange={(evt) => formValueChange('font.fontFamily', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='大小'>
                <InputNumber
                  onChange={(value) => formValueChange('font.fontSize', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 颜色、背景 */}
          <Row>
            <Col span='12'>
              <Form.Item label='颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={colors.font.color}
                      onChange={(color) => debounceValueChange('font.color', color.hex)}
                    />
                  }
                  value={colors.font.color}
                  onChange={(evt) => formValueChange('font.color', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='背景'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={colors.font.background}
                      onChange={(color) => debounceValueChange('font.background', color.hex)}
                    />
                  }
                  value={colors.font.background}
                  onChange={(evt) => formValueChange('font.background', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 倾斜、加粗 */}
          <Row>
            <Col span='12'>
              <Form.Item label='倾斜'>
                <Select
                  onChange={(value) => formValueChange('font.fontStyle', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  <Option value='normal'>正常</Option>
                  <Option value='italic'>倾斜</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='加粗'>
                <Select
                  onChange={(value) => formValueChange('font.fontWeight', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  <Option value='normal'>正常</Option>
                  <Option value='bold'>加粗</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/** 水平对齐、垂直对齐 */}
          <Row>
            <Col span='12'>
              <Form.Item label='水平对齐'>
                <Select
                  onChange={(value) => formValueChange('font.textAlign', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  <Option value='left'>左对齐</Option>
                  <Option value='center'>居中</Option>
                  <Option value='right'>右对齐</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='垂直对齐'>
                <Select
                  onChange={(value) => formValueChange('font.textBaseline', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  <Option value='top'>顶部对齐</Option>
                  <Option value='middle'>居中</Option>
                  <Option value='bottom'>底部对齐</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/** 行高、最大行数 */}
          <Row>
            <Col span='12'>
              <Form.Item label='行高(倍)'>
                <InputNumber
                  min={1}
                  max={5}
                  step={1}
                  onChange={(value) => formValueChange('font.lineHeight', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='最大行数'>
                <InputNumber
                  max={500}
                  step={1}
                  onChange={(value) => formValueChange('font.textMaxLine', value)}
                  placeholder='0:自动匹配高度'
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 水平偏移、垂直偏移 */}
          <Row>
            <Col span='12'>
              <Form.Item label='水平偏移(px)'>
                <InputNumber
                  onChange={(value) => formValueChange('textOffsetX', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='垂直偏移(px)'>
                <InputNumber
                  onChange={(value) => formValueChange('textOffsetY', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropViewMulti)
