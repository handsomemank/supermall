<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div  slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <CartList class="cart-list"></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'


  // 调用Vuex中的mapGetters辅助函数用于管理getter中返回的值直接映射到当前组件的计算属性中使用
  // 避免一直this.$store点点点
  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: { 
      ...mapGetters(['cartLength','cartList'])
      
    }
  }

</script>
<style scoped>
  .nav-bar {
   background-color: var(--color-tint);
   color:#fff;
   font-weight: 600px;
   font-size: 35px;
  }
  .cart {
   height:100vh
  }
  
</style>>
