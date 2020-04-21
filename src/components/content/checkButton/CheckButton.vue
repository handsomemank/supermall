<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: true
    }
  }
}

</script>
<style scoped>
.check-button {
  border: 3px solid #aaa;
  border-radius: 50%;
}
.check-button img {
  width: 30px;
  height: 30px;
}

.check {
  border-color: red;
  background-color: red;
}

</style>