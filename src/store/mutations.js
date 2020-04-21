import {
  ADD_COUNTER,
  ADD_TOCART
} from './mutation-types'

export default {
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TOCART](state,payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}