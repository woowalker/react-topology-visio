// 核心库
import React, { useState } from 'react'
import { connect } from 'dva'
// 组件库
import { Menu, Popover, Button, Upload, Modal, message } from 'antd'
import { EyeOutlined, LockOutlined, UnlockOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'
import PreviewContent from './PreviewContent'
// 工具库
import FileSaver from 'file-saver'
import { curveTypes, arrowTypes } from './svgs'

const { SubMenu } = Menu

function TopoHeader (props) {
  const [visible, setVisible] = useState(false)

  /**
   * 顶部左侧菜单栏
   * @param {*} param0
   */
  const handleMenuClick = ({ key }) => {
    const { $topology } = props.home
    const docName = $topology.data.name || '空白图文'
    switch (key) {
      case 'header-menu__saveFile':
        {
          const jsonStr = JSON.stringify($topology.data)
          const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' })
          FileSaver.saveAs(blob, `${docName}.json`)
        }
        break
      case 'header-menu__openFile':
        break
      case 'header-menu__downloadPNG':
        $topology.saveAsImage(docName, 'png', null)
        break
      case 'header-menu__downloadSVG':
        $topology.saveAsImage(docName, 'svg', null)
        break
      case 'header-menu_undo':
        $topology.undo()
        break
      case 'header-menu_redo':
        $topology.redo()
        break
      case 'header-menu_cut':
        $topology.cut()
        break
      case 'header-menu_copy':
        $topology.copy()
        break
      case 'header-menu_paste':
        $topology.paste()
        break
      default:
        break
    }
  }

  /**
   * 顶部右侧锁定画布
   */
  const handleLockCanvas = () => {
    const { $topology } = props.home
    const currLocked = $topology.data.locked
    $topology.data.locked = !currLocked
    $topology.updateProps()
    props.dispatch({
      type: 'home/save',
      payload: {
        $topology
      }
    })
  }

  /**
   * 默认连线类型、起终点箭头
   * @param {*} type
   */
  const renderOverLay = (type) => {
    const mapObj = { content: 'content', data: [] }
    switch (type) {
      case 'fromArrowType':
        mapObj.title = '默认起点箭头：'
        mapObj.content = 'contentLeft'
        mapObj.data = arrowTypes
        break
      case 'toArrowType':
        mapObj.title = '默认终点箭头：'
        mapObj.content = 'contentRight'
        mapObj.data = arrowTypes
        break
      default:
        mapObj.title = '默认连线类型：'
        mapObj.content = 'content'
        mapObj.data = curveTypes
        break
    }
    return (
      <div className='routes-home__header-popover'>
        <p>{mapObj.title}</p>
        {
          mapObj.data.map(curve => {
            return (
              <div
                key={curve.value}
                title={curve.title}
                onClick={() => handleOverLayClick(type, curve.value)}
                className='routes-home__header-popover--item'
              >
                {curve[mapObj.content]}
              </div>
            )
          })
        }
      </div>
    )
  }

  /**
   * 设置默认连线类型
   * @param {*} type
   * @param {*} value
   */
  const handleOverLayClick = (type, value) => {
    const { $topology } = props.home
    $topology.data[type] = value
    $topology.updateProps()
    props.dispatch({
      type: 'home/save',
      payload: {
        $topology
      }
    })
  }

  /**
   * 画布缩放比例
   * @param {*} scale
   */
  const scaleOverLay = (scale) => {
    return (
      <div className='routes-home__header-popover'>
        <span className='mg-r20'>{`${scale * 100}%`}</span>
        <PlusOutlined onClick={() => setCanvasScale(true)} className='mg-r10 cursor-pointer' />
        <MinusOutlined onClick={() => setCanvasScale(false)} className='mg-r10 cursor-pointer' />
        <Button onClick={() => setCanvasScale(1)}>重置</Button>
      </div>
    )
  }

  /**
   * 设置画布缩放比例
   */
  const setCanvasScale = (plus) => {
    const { $topology } = props.home
    let currScale = $topology.data.scale
    if (plus === true && currScale < 5) {
      currScale += 0.25
    } else if (plus === false && currScale > 0.25) {
      currScale -= 0.25
    } else {
      currScale = 1
    }
    $topology.scaleTo(currScale)
    $topology.updateProps()
    props.dispatch({
      type: 'home/save',
      payload: {
        $topology
      }
    })
  }

  /**
   * 上传 json 文件
   * @param {*} file
   */
  const beforeUpload = (file) => {
    const isJsonFile = file.type === 'application/json'
    if (!isJsonFile) {
      message.error('只能上传.json文件')
      return false
    }
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = (evt) => {
      console.log(evt.target.result)
      const { $topology } = props.home
      $topology.open(evt.target.result)
    }
    return false
  }

  const { data } = props.home.$topology || {
    data: {
      locked: false,
      lineName: 'curve',
      fromArrowType: '',
      toArrowType: 'triangleSolid',
      scale: 1
    }
  }
  const defaultLine = curveTypes.find(curve => curve.value === data.lineName)
  const defaultFromArrow = arrowTypes.find(arrow => arrow.value === data.fromArrowType)
  const defaultToArrow = arrowTypes.find(arrow => arrow.value === data.toArrowType)
  return (
    <div className='routes-home__header-zone'>
      <div className='routes-home__header-left'>
        <div className='routes-home__header-logo'>
          <img src={require('../../../assets/images/logo.png')} alt='logo' />
          <span>Topology Visio</span>
        </div>
        <Menu
          onClick={handleMenuClick}
          selectedKeys={[]}
          mode='horizontal' className='routes-home__header-menu'
        >
          <SubMenu title='文件'>
            <Menu.Item key='header-menu__saveFile'>保存</Menu.Item>
            <Menu.Item key='header-menu__openFile'>
              <Upload
                name='JSONUpload'
                showUploadList={false}
                beforeUpload={beforeUpload}
              >
                <span>打开文件</span>
              </Upload>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='header-menu__downloadPNG'>下载为PNG</Menu.Item>
            <Menu.Item key='header-menu__downloadSVG'>下载为SVG</Menu.Item>
          </SubMenu>
          <SubMenu title='编辑'>
            <Menu.Item key='header-menu_undo'>
              <span>撤销</span>
              <span>Ctrl + Z</span>
            </Menu.Item>
            <Menu.Item key='header-menu_redo'>
              <span>重做</span>
              <span>Ctrl + Shift + Z</span>
            </Menu.Item>
            <Menu.Divider key='header-menu_divider1' />
            <Menu.Item key='header-menu_cut'>
              <span>剪切</span>
              <span>Ctrl + X</span>
            </Menu.Item>
            <Menu.Item key='header-menu_copy'>
              <span>复制</span>
              <span>Ctrl + C</span>
            </Menu.Item>
            <Menu.Item key='header-menu_paste'>
              <span>黏贴</span>
              <span>Ctrl + V</span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div className='routes-home__header-right'>
        <div onClick={() => setVisible(true)} className='routes-home__header-preview'>
          <EyeOutlined />
          <span>预览</span>
        </div>
        <div
          title={data.locked ? '点击解锁' : '点击锁定'}
          onClick={handleLockCanvas}
          className='routes-home__header-lock'
        >
          {data.locked ? <LockOutlined style={{ color: '#ff7875' }} /> : <UnlockOutlined />}
        </div>
        <div className='routes-home__header-scale'>
          <Popover content={scaleOverLay(data.scale)}>
            <div style={{ flex: 1, textAlign: 'center' }}>{`视图：${data.scale * 100}%`}</div>
          </Popover>
        </div>
        <div className='routes-home__header-line'>
          <Popover content={renderOverLay('lineName')}>
            <div className='routes-home__header-curve'>
              {defaultLine.content}
            </div>
          </Popover>
          <Popover content={renderOverLay('fromArrowType')}>
            <div className='routes-home__header-curve'>
              {defaultFromArrow.contentLeft}
            </div>
          </Popover>
          <Popover content={renderOverLay('toArrowType')}>
            <div className='routes-home__header-curve'>
              {defaultToArrow.contentRight}
            </div>
          </Popover>
        </div>
      </div>
      <Modal
        destroyOnClose
        title='流程预览'
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        bodyStyle={{ height: 'calc(100% - 55px)' }}
        className='routes-home__header-previewModal'
      >
        <PreviewContent data={data} />
      </Modal>
    </div>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoHeader)
