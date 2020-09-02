import React from 'react'
import ReactEchartsCore from 'echarts-for-react/lib/core'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/toolbox'

const ReactEcharts = (props) => {
  return (
    <ReactEchartsCore echarts={echarts} {...props} />
  )
}

export default ReactEcharts
