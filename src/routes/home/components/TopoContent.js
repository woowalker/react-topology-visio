// 核心库
import React, { useEffect, useState } from 'react'
import { connect } from 'dva'
// 组件库
import echarts from 'echarts/lib/echarts'
import { Topology } from '@topology/core'
import { register as registerFlow } from '@topology/flow-diagram'
import { register as registerActivity } from '@topology/activity-diagram'
import { register as registerClass } from '@topology/class-diagram'
import { register as registerSequence } from '@topology/sequence-diagram'
import { register as registerChart } from '@topology/chart-diagram'
import { Menu } from 'antd'
// 工具库
import { debounce } from 'lodash'

// 注册图形库
registerFlow()
registerActivity()
registerClass()
registerSequence()
registerChart(echarts)

function TopoContent (props) {
  const resetSelected = (event) => {
    props.dispatch({
      type: 'home/save',
      payload: {
        event,
        currSelected: null,
        selectedNodes: null
      }
    })
  }

  const updateSelected = (event, data) => {
    props.dispatch({
      type: 'home/save',
      payload: {
        event,
        currSelected: data,
        selectedNodes: null
      }
    })
  }

  const updateMultiSelected = (event, data) => {
    props.dispatch({
      type: 'home/save',
      payload: {
        event,
        currSelected: null,
        selectedNodes: data
      }
    })
  }

  /**
   * debounce 提高拖拉表现效果
   */
  const debounceUpdate = debounce(updateSelected, 100)
  const debounceUpdateMulti = debounce(updateMultiSelected, 100)

  /**
   * 画板事件消息
   * @param {*} event
   * @param {*} data
   */
  const onMessage = (event, data) => {
    const { $consts } = props.common
    switch (event) {
      /**
       * 点击空白
       * 清空选中对象
       */
      case $consts['COMMON/CANVAS_EVT_SPACE']:
        resetSelected(event)
        break
      /**
       * node: 选中一个节点
       * addNode: 添加节点
       * line: 选中连线
       * addLine: 添加连线
       */
      case $consts['COMMON/CANVAS_EVT_NODE']:
      case $consts['COMMON/CANVAS_EVT_ADDNODE']:
      case $consts['COMMON/CANVAS_EVT_LINE']:
      case $consts['COMMON/CANVAS_EVT_ADDLINE']:
        debounceUpdate(event, data)
        break
      /**
       * multi: 多选
       */
      case $consts['COMMON/CANVAS_EVT_MULTI']:
        debounceUpdateMulti(event, data)
        break
      /**
       * 移动、缩放、旋转
       */
      case $consts['COMMON/CANVAS_EVT_MOVE']:
      case $consts['COMMON/CANVAS_EVT_RESIZEPENS']:
      case $consts['COMMON/CANVAS_EVT_ROTATED']:
        if (data && data.length <= 1) {
          debounceUpdate(event, data[0])
        }
        break
      /**
       * 动画执行结束
       * { type: 'node/line', data: node/line }
       */
      case $consts['COMMON/CANVAS_EVT_ANIMATEEND']:
        break
      default:
        break
    }
  }

  const canvasOptions = {
    on: onMessage
  }

  const initCanvas = () => {
    /**
     * 为什么要用setTimeout，因为在第一次加载 DOM 完毕之后，canvas 取到的 div 的宽高都还是不准的
     * 所以需要稍微延迟一下，以保证取到所挂载的 div 的正确的宽高，避免一开始就出现滚动条
     */
    setTimeout(() => {
      // 创建画布
      var canvas = new Topology('topo-canvas', canvasOptions)
      canvas.render()

      // 存储画布实例
      props.dispatch({
        type: 'home/save',
        payload: {
          $topology: canvas
        }
      })
    }, 200)
  }

  useEffect(initCanvas, [])

  /**
   * 鼠标右键菜单
   */
  const [visible, setVisible] = useState(false)
  const [posStyle, setPosStyle] = useState({ top: 0, left: 0 })

  const checkContextMenu = () => {
    const { event, currSelected, selectedNodes } = props.home
    const { $consts } = props.common
    const commonMenus = [
      <Menu.Item key='menu_undo'>
        <span>撤销</span>
        <span>Ctrl + Z</span>
      </Menu.Item>,
      <Menu.Item key='menu_redo'>
        <span>重做</span>
        <span>Ctrl + Shift + Z</span>
      </Menu.Item>,
      <Menu.Divider key='menu_divider1' />,
      <Menu.Item key='menu_cut'>
        <span>剪切</span>
        <span>Ctrl + X</span>
      </Menu.Item>,
      <Menu.Item key='menu_copy'>
        <span>复制</span>
        <span>Ctrl + C</span>
      </Menu.Item>,
      <Menu.Item key='menu_paste'>
        <span>黏贴</span>
        <span>Ctrl + V</span>
      </Menu.Item>
    ]
    if (!event || event === $consts['COMMON/CANVAS_EVT_SPACE']) {
      return commonMenus
    }
    // 组合、取消组合
    const waitGroup = selectedNodes && selectedNodes.length
    const waitUnGroup = currSelected && currSelected.children && currSelected.children.length
    // 解锁、上锁
    const unLocks = (selectedNodes || []).find(node => !node.locked)
    const waitLock = (currSelected && !currSelected.locked) || unLocks
    const locks = (selectedNodes || []).find(node => node.locked)
    const waitUnLock = (currSelected && currSelected.locked) || locks

    return [
      <Menu.Item key='menu_top'><span>置顶</span></Menu.Item>,
      <Menu.Item key='menu_bottom'><span>置底</span></Menu.Item>,
      <Menu.Divider key='menu_divider2' />,
      waitGroup ? <Menu.Item key='menu_group'><span>组合</span></Menu.Item> : null,
      waitUnGroup ? <Menu.Item key='menu_unGroup'><span>取消组合</span></Menu.Item> : null,
      waitLock ? <Menu.Item key='menu_lock'><span>锁定</span></Menu.Item> : null,
      !waitLock && waitUnLock ? <Menu.Item key='menu_unLock'><span>解锁</span></Menu.Item> : null,
      (waitGroup || waitUnGroup || waitLock || waitUnLock) ? <Menu.Divider key='menu_divider3' /> : null,
      <Menu.Item key='menu_delete'><span>删除</span></Menu.Item>,
      <Menu.Divider key='menu_divider4' />,
      [...commonMenus]
    ]
  }

  const showContextMenu = (evt) => {
    evt.preventDefault()
    setVisible(true)
    const { currentTarget, pageX, pageY } = evt
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = currentTarget
    const top = `${pageY - offsetTop}px`
    const left = `${pageX - offsetLeft}px`
    let bottom = ''
    // 400: 右键菜单的最高高度，鼠标位置接近底部时候，右键菜单需要在上方显示
    if (pageY > (offsetHeight + offsetTop - 400)) {
      bottom = `${offsetHeight + offsetTop - pageY}px`
    }
    let right = ''
    // 170: 右键菜单的宽度，鼠标位置接近右侧时候，右键菜单需要在左边显示
    if (pageX > (offsetWidth + offsetLeft - 170)) {
      right = `${offsetWidth + offsetLeft - pageX}px`
    }
    let posStyle
    if (bottom && right) {
      posStyle = { bottom, right }
    } else if (bottom) {
      posStyle = { bottom, left }
    } else if (right) {
      posStyle = { top, right }
    } else {
      posStyle = { top, left }
    }
    setPosStyle(posStyle)
  }

  const hideContextMenu = () => {
    setVisible(false)
  }

  const handleMenuClick = ({ key }) => {
    const { $topology, event, currSelected, selectedNodes } = props.home
    const { $consts } = props.common
    switch (key) {
      case 'menu_top':
        if (event === $consts['COMMON/CANVAS_EVT_MULTI'] && selectedNodes) {
          selectedNodes.forEach(node => {
            $topology.top(node)
          })
          $topology.updateProps()
        } else if (currSelected) {
          $topology.top(currSelected)
          $topology.updateProps()
        }
        break
      case 'menu_bottom':
        if (event === $consts['COMMON/CANVAS_EVT_MULTI'] && selectedNodes) {
          selectedNodes.forEach(node => {
            $topology.bottom(node)
          })
          $topology.updateProps()
        } else if (currSelected) {
          $topology.bottom(currSelected)
          $topology.updateProps()
        }
        break
      case 'menu_group':
        if (selectedNodes) {
          $topology.combine(selectedNodes)
          $topology.updateProps()
        }
        break
      case 'menu_unGroup':
        if (currSelected) {
          $topology.uncombine(currSelected)
          $topology.updateProps()
        }
        break
      case 'menu_lock':
        if (currSelected) {
          currSelected.locked = true
          $topology.updateProps()
        }
        if (selectedNodes) {
          selectedNodes.forEach(node => { node.locked = true })
          $topology.updateProps()
        }
        break
      case 'menu_unLock':
        if (currSelected) {
          currSelected.locked = false
          $topology.updateProps()
        }
        if (selectedNodes) {
          selectedNodes.forEach(node => { node.locked = false })
          $topology.updateProps()
        }
        break
      case 'menu_delete':
        $topology.delete()
        break
      case 'menu_undo':
        $topology.undo()
        break
      case 'menu_redo':
        $topology.redo()
        break
      case 'menu_cut':
        $topology.cut()
        break
      case 'menu_copy':
        $topology.copy()
        break
      case 'menu_paste':
        $topology.paste()
        break
      default:
        break
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', hideContextMenu)
    return () => {
      document.body.removeEventListener('click', hideContextMenu)
    }
  })

  return (
    <div onContextMenu={showContextMenu} className='routes-home__canvas-wrap'>
      <div id='topo-canvas' className='routes-home__canvas-panel' />
      <Menu
        selectedKeys={[]}
        onClick={handleMenuClick}
        className={`routes-home__canvas-contextMenu ${visible ? 'show' : ''}`}
        style={posStyle}
      >
        {checkContextMenu()}
      </Menu>
    </div>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoContent)
