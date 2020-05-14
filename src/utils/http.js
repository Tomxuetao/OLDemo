import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import { clearLoginInfo } from '@/utils'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers.credibleToken = localStorage.getItem('loginKey')
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  const data = response.data
  if (data.status) {
    return Promise.resolve(data.result)
  } else {
    switch (data && data.code) {
      case 102:
        clearLoginInfo()
        router.push({ name: 'login' })
        break
      case 103:
        clearLoginInfo()
        router.push({ name: 'login' })
        break
      case 105:
        clearLoginInfo()
        router.push({ name: 'login' })
        break
      case 401:
        clearLoginInfo()
        router.push({ name: 'login' })
        break
      case 503:
        clearLoginInfo()
        router.push({ name: 'login' })
        break
    }
    return Promise.reject(data)
  }
}, error => {
  if (error.response.status === 404) {
    router.push({ name: '404' })
  }
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return (process.env.NODE_ENV !== 'production' ? '/proxyApi' : '') + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefaultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefaultParams = true) => {
  const defaults = {
    t: new Date().getTime()
  }
  return openDefaultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefaultData 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefaultData = true, contentType = 'json') => {
  const defaults = {
    t: new Date().getTime()
  }
  data = openDefaultData ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
