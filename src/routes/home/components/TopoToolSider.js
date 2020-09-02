// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Input, Tabs } from 'antd'
import { Scrollbars } from 'react-custom-scrollbars'
import TopoTools from './TopoTools'

const { Search } = Input
const { TabPane } = Tabs

function TopoToolSider (props) {
  return (
    <div className='routes-home__tool-sider'>
      <Search
        placeholder='组件搜索'
        onSearch={value => console.log(value)}
        className='routes-home__tool-sider--search'
      />
      <Tabs
        defaultActiveKey='routes-home__tool-sider--componentSys'
        size='small'
        className='routes-home__tool-sider--tabs'
      >
        <TabPane tab='系统组件' key='routes-home__tool-sider--componentSys'>
          <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
            <TopoTools />
          </Scrollbars>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(TopoToolSider)
