<template>
  <div class="cart_list_item">
    <!-- <cart-check-button
      @click.native="checkClick"
      :isChecked="item.checked"
      ref="checkButtonRef"
    /> -->
    <div class="check-content">
      <CheckButton :is-checked = "product.checked" @click.native = "checkClick" >
        
      </CheckButton>
    </div>
    <div class="item_img">
      <img :src="product.img" alt="" />
    </div>
    <div class="item_info">
      <p class="item_title">{{ product.title }}</p>
      <p class="item_desc">{{ product.desc }}</p>
      <span class="item_price">￥{{ product.price }}</span>
      <span class="item_count">x{{ product.count }}</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    props: {
      product: {
        type: Object,
        default: {}
      }
    },
    components: {
      CheckButton,
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      }

    }
  }

</script>
<style>
  .cart_list_item {
    width: 100%;
    height: 180px;
    border-bottom: 2px solid rgba(128, 128, 128, 0.4);
    display: flex;
    padding: 0.4rem;
    padding-left: 0rem;
  }

  .item_img {
    width: 100%;
    height: 100%;
  }
  .item_img img {
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
  }

  .item_info {
    position: relative;
    width: calc(80% - 3.5rem - 1.2rem - 0.4rem);
    margin-left: 0.4rem;
  }
  .item_info p {
    display: inline-block;
    width: 100%;  
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }
  .item_title {
    font-size: 30px;
    padding-bottom: 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item_desc {
    font-size: 24px;
    color: gray;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item_price {
    position: absolute;
    left: 0;
    bottom: 0.4rem;
    font-size: 30px;
    color: orangered;
  }
  .item_count {
    position: absolute;
    right: 0.4rem;
    bottom: 0.4rem;
    font-size: 0.75rem;
    font-size: 35px;
  }
  .check-content{
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    align-items: center;
  }
</style>