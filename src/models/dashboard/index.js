export default {
  namespace: 'dashboard',
  state: {
    welcome: '欢迎使用echarts'
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },
  effects: {},
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
