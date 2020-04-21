<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton :is-checked="isSelectAll" 
                   class="check-button"
                   @click.native = "checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">
      合计： {{totalPrice}}
    </div>

    <dir class="caclulate" @click="calcClick">
      去计算 ({{checkLength}})
    </dir>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex' 

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      //调用isSelectAll计算属性,如有存在没有被全选,则为false,如果被全选了为true
      // if调用是默认为 true的情况,意味着,全选的话,点击下去,触发所有全选的变成未选择
      // 反之,如果有没有全部被选择,则点击下去触发所有商品都变成已选择
      if(this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false
        })
      }else {
        this.cartList.forEach(item => {
          item.checked = true
        })
      }
    },
    calcClick(){
      if(!this.isSelectAll) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),

    totalPrice() {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue,item) => {
        return preValue + item.price * item .count
      },0)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false
      // 返回没有被选中的属性，如果有存在没有被选中的属性则为 true,我们想要满足的条件是false,所以前面加个!
      return ! (this.cartList.filter(item =>!item.checked).length)
      // filter的方法是遍历每一个对象,而find如果遍历到满足条件的对象就直接停止
      // return !(this.cartList.find(item => !item.checked).length)
    }
  }
}

</script>
<style scoped>
  .bottom-bar {
    height: 75px;
    background-color: #eee;
    position: relative;   
    display: flex;
    align-items: center;
    
  }
  .check-content {
    width: 200px;

  }

  .check-content span {
    margin-left: 10px;
    font-size: 25px;
    
    
  }
  .check-button {
    
  }

  .price {
    font-size: 25px;
    flex: 1;
  }

  .caclulate {
    line-height: 75px;
    width: 22%;
    font-size: 25px;
    background-color: red;
    color: #fff;
    text-align: center;
  }

</style>