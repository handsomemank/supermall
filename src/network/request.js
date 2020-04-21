import axios from 'axios'

export function request(config) {
  // 创建实例，方便多次请求
  const instance = axios.create({
    //1创建axios的实例
    baseURL:'http://152.136.185.210:8000/api/h8',
    timeout: 2000
  })

  // axios的拦截器
  axios.interceptors.request.use(res => {
    return res.data
  },err => {
    console.log(err)
  })

  return instance(config)

}