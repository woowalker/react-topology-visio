import React from 'react'
import { connect } from 'dva'
import ReactEcharts from '@/components/echarts'

function DashboardPage (props) {
  function getOption () {
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    }
  }

  return (
    <div>
      <h2>{props.dashboard.welcome}</h2>
      <ReactEcharts option={getOption()} />
    </div>
  )
}

DashboardPage.propTypes = {
}

export default connect(({ dashboard }) => ({ dashboard }))(DashboardPage)
