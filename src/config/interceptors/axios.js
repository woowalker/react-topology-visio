import { get } from 'lodash'
import { message } from 'antd'
import { CONSOLE_REQUEST_ENABLE, CONSOLE_RESPONSE_ENABLE } from '@/config'
// import { history } from '@/plugins/history'

// 发送请求成功处理
export function requestSuccessFunc (requestObj) {
  CONSOLE_REQUEST_ENABLE && console.info('requestInterceptorFunc', `url: ${requestObj.url}`, requestObj)
  return requestObj
}

// 发送请求失败处理
export function requestFailFunc (requestError) {
  return Promise.reject(requestError)
}

// 请求成功返回处理
export function responseSuccessFunc (responseObj) {
  CONSOLE_RESPONSE_ENABLE && console.info('requestInterceptorFunc', 'data: ', responseObj.data)
  return responseObj.data
}

// 请求失败返回处理
export function responseFailFunc (responseError) {
  if (responseError.response) {
    switch (responseError.response.status) {
      // 登陆过期处理
      case 401:
        responseError.message = '登录过期，即将跳转登录页'
        // history.push('/dashboard')
        break
      default:
        responseError.message = get(responseError, 'response.data.message', '出错啦，请联系管理员')
    }
  } else { // 无返回的默认提示
    responseError.message = '网络问题，请刷新重试'
  }

  // 超时提示
  if (responseError.message.includes('timeout')) {
    responseError.message = '请求超时，请刷新重试'
  }

  /**
   * 全局错误提示，noShowDefaultError 设置就是 axios 中与 url、method 同级的自定义属性
   * 使用举例：api['common/datamap']({ category: 'dateType' }, { noShowDefaultError: true })
   */
  if (responseError.config && !responseError.config.noShowDefaultError) {
    message.error(responseError.message)
  }

  return Promise.reject(responseError)
}
