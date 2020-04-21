<template>
  <div class="back-top">
    <!-- 组件内监听事件必须加上.native原生监听 -->
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  // 
  methods: {
  
  }
}

</script>
<style>
  .back-top {
    position: fixed;
    right: 10px;
    bottom : 85px
  }
</style>