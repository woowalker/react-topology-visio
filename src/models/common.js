import api from '@/plugins/api'
import consts from '@/plugins/const'

export default {
  namespace: 'common',
  state: {
    $api: api,
    $consts: consts
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    }
  },
  effects: {
    *getOrgList({ payload, cb }, { call, put }) {  // eslint-disable-line
      const response = yield call(api['common/getOrgList'], payload)
      cb instanceof Function && cb(response)
      yield put({ type: 'save', payload: { orgList: response.Data } })
    }
  },
  reducers: {
    save (state, action) {
      return { ...state, ...action.payload }
    }
  }
}
