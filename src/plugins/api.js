import axios from './axios'
import { API_DEFAULT_CONFIG } from '@/config'
import API_CONFIG from '@/services/api'
import { pick, assign, isEmpty } from 'lodash'

function assert (condition, msg) {
  if (!condition) throw new Error(`[ApiErr] ${msg}`)
}

class MakeApi {
  constructor (options) {
    this.api = {}
    this.apiBuilder(options)
  }

  apiBuilder ({
    sep = '|',
    debug = false,
    config = {}
  }) {
    Object.keys(config).forEach(namespace => {
      this._apiSingleBuilder({
        namespace,
        sep,
        debug,
        config: config[namespace]
      })
    })
  }

  _apiSingleBuilder ({
    namespace,
    sep,
    debug,
    config
  }) {
    config.forEach(api => {
      const { name, params, method, path } = api
      const apiName = `${namespace}${sep}${name}`
      const apiUrl = path

      debug && assert(name, `${apiUrl}: 接口name属性不能为空`)
      debug && assert(apiUrl.indexOf('/') === 0, `${apiUrl}: 接口路径path，首字符应为/`)

      Object.defineProperty(this.api, apiName, {
        /**
         * 使用 this.$api['common/datamap'](outerParams, outerOptions)
         * this.$api 是一个对象，['common/datamap'] 是对象属性
         *
         * @param outerParams: 如果 outerParams 中的属性名有与 services -> api -> common.js 中的 path 的路径名相同，则url会被替换，
         * 比如：'/dicts/:category' ，然后outerParams: { category: 'resetType' },
         * 则 _replaceURLparams 会将 url 替换成：'/dicts/resetType'
         *
         * @param outerOptions: 在axios中的级别是与 url 和 method 同级别的
         * 比如配置：{ noShowDefaultError: true }，则此配置可在response.config中取到
         *
         * _data 经过 pick 处理，意思是将 outerParams 中与 params 中的同名属性 pick 出来，
         * 这样一来传递给后端的参数，就以 services -> api 中的 js 文件中定义的 params 为准，避免传递不需要的参数给后端，
         * 比如：
         * outerParams: { account: 'admin', password: 'admin' }, method: 'PUT'
         * 此时如果在 services -> api -> common.js 中这样定义 params: { account: '', password: '', isOk: true }
         * 则此次的 axios 请求的 data 负载（PUT 类型请求）就是 { account: 'admin', password: 'admin', isOk: true }
         *
         * 然后 _normoalize 函数的作用则是：
         * 判断请求是否为'POST', 'PUT', 'PATCH', 'DELETE'之一，这四种请求对应的 options 请求参数名是 data
         * GET 请求对应的请求参数名是 params
         */
        value (outerParams, outerOptions) {
          /**
           * params 为 services -> api -> common.js 中定义的 params
           * this.$api['common/datamap'](outerParams, outerOptions)
           */
          const _params = isEmpty(outerParams) ? params : assign({}, params, outerParams)
          const _data = pick(_params, Object.keys(params))
          const url = _replaceURLparams(apiUrl, _params)
          return axios(_normoalize(assign({
            url,
            method
          }, outerOptions), _data))
        }
      })
    })
  }
}

/**
 * 替换 services -> api -> common.js 文件中的 path 属性中定义的字段
 * @param url
 * @param data
 * @returns {*}
 * @private
 */
function _replaceURLparams (url, data) {
  return url.replace(/:([\w\d]+)/ig, (reg, key) => {
    return data[key]
  })
}

/**
 * 设置 axios 的请求为 GET 还是 POST
 * 其中 GET 请求对应的请求参数名是 params
 * 其他诸如 POST、PUT等请求的请求参数名是 data
 * @param options
 * @param data
 * @returns {*}
 * @private
 */
function _normoalize (options, data) {
  const method = options.method.toUpperCase()
  if (['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method) > -1) {
    options.data = data
  } else {
    options.params = data
  }

  return options
}

export default new MakeApi({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG
})['api']
