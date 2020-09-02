export default {
  namespace: 'home',
  state: {
    $topology: null, // canvas 对象
    event: null, // 当前操作事件
    currSelected: null, // { type: '事件类型', data: {} } 选中节点的详情
    selectedNodes: null // [{}] 选中多个节点对象
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
