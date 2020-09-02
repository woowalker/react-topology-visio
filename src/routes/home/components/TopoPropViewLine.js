// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, Select, InputNumber, Collapse, Row, Col } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { PrefixPicker } from '@/components/colorPicker'
// 工具库
import { set, debounce } from 'lodash'
import { arrowTypes, lineTypes, curveTypes } from './svgs'

const { Panel } = Collapse
const { Option } = Select
const { TextArea } = Input

function TopoPropViewLine (props) {
  /**
   * 设置表格数据
   * @param {*} keypath
   * @param {*} value
   */
  const formValueChange = (keypath, value) => {
    const { $topology, currSelected } = props.home
    if (currSelected) {
      set(currSelected, keypath, value)
      $topology.updateProps()
      props.dispatch({
        type: 'home/save',
        payload: {
          currSelected
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
        <SettingOutlined style={iconStyle} />
        <span>{title}</span>
      </div>
    )
  }

  const defaultActiveKey = ['topoPropViewLineGroup-0', 'topoPropViewLineGroup-1', 'topoPropViewLineGroup-2', 'topoPropViewLineGroup-3']
  const data = props.home.currSelected || { rect: {}, font: {} }
  return (
    <Form name='topoPropViewLineForm' layout='vertical'>
      <Collapse
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
      >
        <Panel key='topoPropViewLineGroup-0' header={renderCollapseHeader('位置')}>
          {/** 起点X、起点Y */}
          <Row>
            <Col span='12'>
              <Form.Item label='起点：X(px)'>
                <InputNumber
                  value={data.from.x || ''}
                  onChange={(value) => formValueChange('from.x', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='起点：Y(px)'>
                <InputNumber
                  value={data.from.y || ''}
                  onChange={(value) => formValueChange('from.y', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 终点X、终点Y */}
          <Row>
            <Col span='12'>
              <Form.Item label='终点：X(px)'>
                <InputNumber
                  value={data.to.x || ''}
                  onChange={(value) => formValueChange('to.x', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='终点：Y(px)'>
                <InputNumber
                  value={data.to.y || ''}
                  onChange={(value) => formValueChange('to.y', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 起点箭头、终点箭头 */}
          <Row>
            <Col span='12'>
              <Form.Item label='起点箭头'>
                <Select
                  value={data.fromArrow || ''}
                  onChange={(value) => formValueChange('fromArrow', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  {
                    arrowTypes.map(arrow => (
                      <Option key={arrow.value} value={arrow.value}>
                        <div title={arrow.title} style={{ width: '100%', height: 30 }}>
                          {arrow.contentLeft}
                        </div>
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='终点箭头'>
                <Select
                  value={data.toArrow || ''}
                  onChange={(value) => formValueChange('toArrow', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  {
                    arrowTypes.map(arrow => (
                      <Option key={arrow.value} value={arrow.value}>
                        <div title={arrow.title} style={{ width: '100%', height: 30 }}>
                          {arrow.contentRight}
                        </div>
                      </Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/** 起点箭头颜色、终点箭头颜色 */}
          <Row>
            <Col span='12'>
              <Form.Item label='起点箭头颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={data.fromArrowColor || '#000000'}
                      onChange={(color) => debounceValueChange('fromArrowColor', color.hex)}
                    />
                  }
                  value={data.fromArrowColor || '#000000'}
                  onChange={(evt) => formValueChange('fromArrowColor', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='终点箭头颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={data.toArrowColor || '#000000'}
                      onChange={(color) => debounceValueChange('toArrowColor', color.hex)}
                    />
                  }
                  value={data.toArrowColor || '#000000'}
                  onChange={(evt) => formValueChange('toArrowColor', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 起点箭头大小、终点箭头大小 */}
          <Row>
            <Col span='12'>
              <Form.Item label='起点箭头大小'>
                <InputNumber
                  min={0}
                  step={1}
                  value={data.fromArrowSize || 1}
                  onChange={(value) => formValueChange('fromArrowSize', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='终点箭头大小'>
                <InputNumber
                  min={0}
                  step={1}
                  value={data.toArrowSize || 1}
                  onChange={(value) => formValueChange('toArrowSize', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
        <Panel key='topoPropViewLineGroup-1' header={renderCollapseHeader('样式')}>
          {/** 线条类型、曲线类型 */}
          <Row>
            <Col span='12'>
              <Form.Item label='线条类型'>
                <Select
                  value={data.dash || 0}
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
              <Form.Item label='曲线类型'>
                <Select
                  value={data.name || 'curve'}
                  onChange={(value) => formValueChange('name', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                >
                  {
                    curveTypes.map(curve => {
                      return (
                        <Option key={curve.value} value={curve.value}>
                          <div title={curve.title} style={{ width: '100%', height: 30 }}>
                            {curve.content}
                          </div>
                        </Option>
                      )
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/** 线条颜色、线条宽度 */}
          <Row>
            <Col span='12'>
              <Form.Item label='线条颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={data.strokeStyle || '#3d3d3d'}
                      onChange={(color) => debounceValueChange('strokeStyle', color.hex)}
                    />
                  }
                  value={data.strokeStyle || ''}
                  onChange={(evt) => formValueChange('strokeStyle', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='线条宽度(px)'>
                <InputNumber
                  value={data.lineWidth || 1}
                  onChange={(value) => formValueChange('lineWidth', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 边框颜色、边框宽度 */}
          <Row>
            <Col span='12'>
              <Form.Item label='边框颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={data.borderColor || '#3d3d3d'}
                      onChange={(color) => debounceValueChange('borderColor', color.hex)}
                    />
                  }
                  value={data.borderColor || ''}
                  onChange={(evt) => formValueChange('borderColor', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='边框宽度(px)'>
                <InputNumber
                  value={data.borderWidth || 0}
                  onChange={(value) => formValueChange('borderWidth', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 透明度 */}
          <Form.Item label='透明度(0 - 1)'>
            <InputNumber
              min={0}
              max={1}
              step={0.1}
              value={data.globalAlpha || 1}
              onChange={(value) => formValueChange('globalAlpha', value)}
              className='routes-home__prop-sider--collapse-inputNum'
            />
          </Form.Item>
        </Panel>
        <Panel key='topoPropViewLineGroup-2' header={renderCollapseHeader('文字')}>
          {/** 字体、大小 */}
          <Row>
            <Col span='12'>
              <Form.Item label='字体'>
                <Input
                  value={data.font.fontFamily || ''}
                  onChange={(evt) => formValueChange('font.fontFamily', evt.target.value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='大小'>
                <InputNumber
                  value={data.font.fontSize || ''}
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
                      initColor={data.font.color || '#ffffff'}
                      onChange={(color) => debounceValueChange('font.color', color.hex)}
                    />
                  }
                  value={data.font.color || '#ffffff'}
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
                      initColor={data.font.background || '#ffffff'}
                      onChange={(color) => debounceValueChange('font.background', color.hex)}
                    />
                  }
                  value={data.font.background || '#ffffff'}
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
                  value={data.font.fontStyle || 'normal'}
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
                  value={data.font.fontWeight || 'normal'}
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
                  value={data.font.textAlign || 'center'}
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
                  value={data.font.textBaseline || 'middle'}
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
                  value={data.font.lineHeight || 1}
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
                  value={data.font.textMaxLine || 0}
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
                  value={data.textOffsetX || 0}
                  onChange={(value) => formValueChange('textOffsetX', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='垂直偏移(px)'>
                <InputNumber
                  value={data.textOffsetY || 0}
                  onChange={(value) => formValueChange('textOffsetY', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 内容 */}
          <Row>
            <Col span='24'>
              <Form.Item label='内容'>
                <TextArea
                  value={data.text || ''}
                  onChange={(evt) => formValueChange('text', evt.target.value)}
                  rows={2}
                />
              </Form.Item>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Form>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropViewLine)
