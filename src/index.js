import dva from 'dva'
// 在需要的地方导入 history.js 文件，可使用此插件进行组件外导航
import { history } from '@/plugins/history'
// loading 插件，自动处理接口的请求状态，详见 README.md
import createLoading from 'dva-loading'

import '@/styles/index.less'

// 1. Initialize
const app = dva({
  history
})

// 2. Plugins
app.use(createLoading())

// 3. Model
app.model(require('./models/common').default)

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
