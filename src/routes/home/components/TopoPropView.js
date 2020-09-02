// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Form, Input, Select, InputNumber, Collapse, Row, Col, Checkbox, Divider } from 'antd'
import { SettingOutlined, PlusSquareOutlined } from '@ant-design/icons'
import { PrefixPicker } from '@/components/colorPicker'
import ImgUpload from '@/components/imgUpload'
// 工具库
import { set, debounce } from 'lodash'
import { lineTypes } from './svgs'

const { Panel } = Collapse
const { Option } = Select
const { TextArea } = Input

function TopoPropView (props) {
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

  const defaultActiveKey = ['topoPropViewGroup-0', 'topoPropViewGroup-1', 'topoPropViewGroup-2', 'topoPropViewGroup-3']
  const data = props.home.currSelected || { rect: {}, font: {} }
  return (
    <Form name='topoPropViewForm' layout='vertical'>
      <Collapse
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIconPosition='right'
        className='routes-home__prop-sider--collapse'
      >
        <Panel key='topoPropViewGroup-0' header={renderCollapseHeader('位置和大小')}>
          {/** X轴、Y轴 */}
          <Row>
            <Col span='12'>
              <Form.Item label='X(px)'>
                <InputNumber
                  value={data.rect.x || ''}
                  onChange={(value) => formValueChange('rect.x', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='Y(px)'>
                <InputNumber
                  value={data.rect.y || ''}
                  onChange={(value) => formValueChange('rect.y', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 节点宽、高 */}
          <Row>
            <Col span='12'>
              <Form.Item label='宽(px)'>
                <InputNumber
                  value={data.rect.width || ''}
                  onChange={(value) => formValueChange('rect.width', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='高(px)'>
                <InputNumber
                  value={data.rect.height || ''}
                  onChange={(value) => formValueChange('rect.height', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 圆角、旋转 */}
          <Row>
            <Col span='12'>
              <Form.Item label='圆角(0 - 1)'>
                <InputNumber
                  min={0}
                  max={1}
                  step={0.1}
                  value={data.borderRadius || 0}
                  onChange={(value) => formValueChange('borderRadius', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='旋转(°)'>
                <InputNumber
                  min={0}
                  max={360}
                  value={data.rotate || 0}
                  onChange={(value) => formValueChange('rotate', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 内边距左、右 */}
          <Row>
            <Col span='12'>
              <Form.Item label='内边距-左'>
                <InputNumber
                  value={data.paddingLeft || 0}
                  onChange={(value) => formValueChange('paddingLeft', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='内边距-右'>
                <InputNumber
                  value={data.paddingRight || 0}
                  onChange={(value) => formValueChange('paddingRight', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 内边距上、下 */}
          <Row>
            <Col span='12'>
              <Form.Item label='内边距-上'>
                <InputNumber
                  value={data.paddingTop || 0}
                  onChange={(value) => formValueChange('paddingTop', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='内边距-下'>
                <InputNumber
                  value={data.paddingBottom || 0}
                  onChange={(value) => formValueChange('paddingBottom', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          <p className='routes-home__prop-sider--collapse-tipFont'>内边距：输入数字表示像素；输入%表示百分比</p>
        </Panel>
        <Panel key='topoPropViewGroup-1' header={renderCollapseHeader('样式')}>
          {/** 线条类型、背景颜色 */}
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
              <Form.Item label='背景颜色'>
                <Input
                  prefix={
                    <PrefixPicker
                      initColor={data.fillStyle || '#ffffff'}
                      onChange={(color) => debounceValueChange('fillStyle', color.hex)}
                    />
                  }
                  value={data.fillStyle || '#ffffff'}
                  onChange={(evt) => formValueChange('fillStyle', evt.target.value)}
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
        <Panel key='topoPropViewGroup-2' header={renderCollapseHeader('文字')}>
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
        <Panel key='topoPropViewGroup-3' header={renderCollapseHeader('图片')}>
          <p className='routes-home__prop-sider--collapse-tipFont'>图片、字体图标同时存在时，图片优先</p>
          {/** 填充图片选择 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span className='fz-12 mg-r5'>图片选择：</span>
            <ImgUpload preset={data.image || ''} success={(image) => formValueChange('image', image)} />
          </div>
          {/** 图片显示宽、高 */}
          <Row>
            <Col span='12'>
              <Form.Item label='宽(px)'>
                <InputNumber
                  value={data.imageWidth || ''}
                  onChange={(value) => formValueChange('imageWidth', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
            <Col span='12'>
              <Form.Item label='高(px)'>
                <InputNumber
                  value={data.imageHeight || ''}
                  onChange={(value) => formValueChange('imageHeight', value)}
                  className='routes-home__prop-sider--collapse-inputNum'
                />
              </Form.Item>
            </Col>
          </Row>
          {/** 锁定图片宽高比 */}
          <Row>
            <Col span='24'>
              <Form.Item>
                <Checkbox
                  checked={data.imageRatio || false}
                  onChange={(evt) => formValueChange('imageRatio', evt.target.checked)}
                  style={{ fontSize: 12 }}
                >
                  保持图片宽高比
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Divider style={{ margin: '0 0 5px 0' }} />
          {/** 填充图标选择 */}
          <Form.Item>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className='fz-12 mg-r5'>填充图标：</span>
              <PlusSquareOutlined style={{ fontSize: 30 }} />
            </div>
          </Form.Item>
          {/** 图标大小、颜色 */}
          <Col span='12'>
            <Form.Item label='图标大小'>
              <InputNumber
                value={data.iconSize || ''}
                onChange={(value) => formValueChange('iconSize', value)}
                className='routes-home__prop-sider--collapse-inputNum'
              />
            </Form.Item>
          </Col>
          <Col span='12'>
            <Form.Item label='图标颜色'>
              <Input
                prefix={
                  <PrefixPicker
                    initColor={data.iconColor || '#ffffff'}
                    onChange={(color) => debounceValueChange('iconColor', color.hex)}
                  />
                }
                value={data.iconColor || ''}
                onChange={(evt) => formValueChange('iconColor', evt.target.value)}
                className='routes-home__prop-sider--collapse-inputNum'
              />
            </Form.Item>
          </Col>
        </Panel>
      </Collapse>
    </Form>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropView)
