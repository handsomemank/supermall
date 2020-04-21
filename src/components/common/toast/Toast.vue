<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>

</template>

<script>
export default {
  name: 'Toast',
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message,duration) {
      this.isShow = true;
      this.message = message

      setTimeout(() => {
        this.isShow = false;
        this.message = ''
      },duration)
    }
  }
  
}

</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 50px;
    z-index: 99;
    
    padding: 15px;
    border-radius: 5%;
    background-color: rgba(0,0,0,.7)
  }
</style>