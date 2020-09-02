// 核心库
import React from 'react'
import { connect } from 'dva'
// 组件库
import { Layout } from 'antd'
import TopoHeader from '@/routes/home/components/TopoHeader'
import TopoContent from '@/routes/home/components/TopoContent'
import TopoToolSider from '@/routes/home/components/TopoToolSider'
import TopoPropSider from '@/routes/home/components/TopoPropSider'
// 样式
import '@/styles/antd/index.less'
import '@/styles/routes/home.less'

const { Header, Content, Sider } = Layout

function HomePage () {
  return (
    <Layout className='routes-home'>
      <Header className='routes-home__header'>
        <TopoHeader />
      </Header>
      <Layout>
        <Sider className='routes-home__sider'>
          <TopoToolSider />
        </Sider>
        <Content className='routes-home__content'>
          <TopoContent />
        </Content>
        <Sider width='240' className='routes-home__sider'>
          <TopoPropSider />
        </Sider>
      </Layout>
    </Layout>
  )
}

export default connect(({ common, home, loading }) => ({ common, home, loading }))(HomePage)
