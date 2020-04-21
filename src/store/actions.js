import {
  ADD_COUNTER,
  ADD_TOCART
} from './mutation-types'

export default {
  addCart(context,payload) {
    return new Promise((resolve, reject) => {
      // 1payLoad新添加的商品
      // 1查找之前的数组中是否有该商品
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      // 2 判断product是否存在，存在则+1，不存在则将新传递进来的值+1
      if(product) {
        context.commit(ADD_COUNTER,product)
        resolve('当前数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_TOCART,payload)    
        resolve('添加了新的商品')
      }
    })
  }
}