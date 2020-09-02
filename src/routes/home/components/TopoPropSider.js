// 核心库
import React from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
// 组件库
import { Tabs } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import TopoPropView from './TopoPropView'
import TopoPropViewLine from './TopoPropViewLine'
import TopoPropViewMulti from './TopoPropViewMulti'
import TopoPropEvents from './TopoPropEvents'
import TopoPropAni from './TopoPropAni'
import TopoPropAniLine from './TopoPropAniLine'
import TopoPropData from './TopoPropData'
import TopoPropDoc from './TopoPropDoc'

const { TabPane } = Tabs

function TopoPropSiderMain (props) {
  const { currSelected } = props.home
  const { $consts } = props.common
  return (
    <Tabs
      defaultActiveKey='routes-home__prop-sider--componentView'
      size='small'
      className={classnames('routes-home__prop-sider--tabs', { 'display-none': !currSelected })}
    >
      <TabPane tab='外观' key='routes-home__prop-sider--componentView'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          {
            currSelected && currSelected.type === $consts['COMMON/NODE_TYPE_LINE']
              ? <TopoPropViewLine />
              : <TopoPropView />
          }
        </Scrollbars>
      </TabPane>
      <TabPane tab='事件' key='routes-home__prop-sider--componentEvt'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <TopoPropEvents />
        </Scrollbars>
      </TabPane>
      <TabPane tab='动效' key='routes-home__prop-sider--componentAni'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          {
            currSelected && currSelected.type === $consts['COMMON/NODE_TYPE_LINE']
              ? <TopoPropAniLine />
              : <TopoPropAni />
          }
        </Scrollbars>
      </TabPane>
      <TabPane tab='数据' key='routes-home__prop-sider--componentData'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <TopoPropData />
        </Scrollbars>
      </TabPane>
    </Tabs>
  )
}

function TopoPropSiderMulti (props) {
  const { selectedNodes } = props.home
  return (
    <Tabs
      defaultActiveKey='routes-home__prop-sider--componentViewMulti'
      size='small'
      className={classnames('routes-home__prop-sider--tabs', { 'display-none': !selectedNodes })}
    >
      <TabPane tab='外观' key='routes-home__prop-sider--componentViewMulti'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <TopoPropViewMulti />
        </Scrollbars>
      </TabPane>
    </Tabs>
  )
}

function TopoPropSiderBlank (props) {
  const { currSelected, selectedNodes } = props.home
  return (
    <Tabs
      defaultActiveKey='routes-home__prop-sider--componentDocSet'
      size='small'
      className={classnames('routes-home__prop-sider--tabs', { 'display-none': currSelected || selectedNodes })}
    >
      <TabPane tab='图文设置' key='routes-home__prop-sider--componentDocSet'>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <TopoPropDoc />
        </Scrollbars>
      </TabPane>
    </Tabs>
  )
}

function TopoPropSider (props) {
  return (
    <div className='routes-home__prop-sider'>
      <TopoPropSiderMain {...props} />
      <TopoPropSiderMulti {...props} />
      <TopoPropSiderBlank {...props} />
    </div>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoPropSider)
