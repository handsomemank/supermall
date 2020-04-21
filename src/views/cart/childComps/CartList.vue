<template>
  <div class="cart-list">
    <scroll class="content">
      <CartListItem v-for="(item,index) in cartList" 
                    :key="index" 
                    :product="item">
       </CartListItem>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem'
  
  
  import { mapGetters } from 'vuex'
  export default {
    name:"CartList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      scroll,
      CartListItem,
    },

  }

</script>
<style scoped>
  .cart-list {
    height: calc(100% - 225px );
  }

  .content {
    height:100%;
    position: relative;
    overflow: hidden;
  }
</style>