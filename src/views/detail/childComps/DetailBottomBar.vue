<template>
  <div id="detail_bottom_bar">
    <div class="bottom_left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom_right">
      <div class="cart" @click="addToCart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
}

</script>
<style scoped>
  #detail_bottom_bar {
  font-size: 30px;
  display: flex;
  position: fixed;
  background-color: #fff;
  bottom:0;
  left: 0;
  right: 0;
  height: 80px;
  text-align: center;
  box-shadow: 0 -0.04rem 0.4rem gray;
}
.bottom_left {
  padding: 10px;
  display: flex;
  flex: 1;
}
.bottom_left > div {
  flex: 1;
  border-right: 0.04rem solid rgba(128, 128, 128, 0.1);
}
.bottom_left .icon {
  display: block;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  width: 1rem;
  height: 1.3rem;
  margin: 0.12rem auto;
}
.service .icon {
  background-position: 0 -2.4rem;
}
.shop .icon {
  background-position: 0 -4.5rem;
}
.bottom_right {
  display: flex;
  flex: 1;
}
.bottom_right > div {
  flex: 1;
  line-height: 2.09rem;
}
.cart {
  padding: 20px;
  background-color: rgb(255, 240, 0);
}
.buy {
  padding: 20px;
  background-color: var(--color-tint);
  color: white;
}
  
</style>