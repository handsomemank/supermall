<template>
  <div class="recommend" >
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link" >
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>    
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default(){
        return []
      }
    }
  }
}

</script>
<style>
.recommend {
  display: flex;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 30px;
  width: 100%;
  font-size: 30px;

  border-bottom: 15px #eee  solid;
}
.recommend-item {
  flex: 1;
  
}
</style>