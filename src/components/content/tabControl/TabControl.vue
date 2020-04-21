<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
    
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    titles: {
      type: Array,
      default(){
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}

</script>
<style>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 35px;
    height: 90px;
    line-height: 90px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    padding: 10px;
    border-bottom: 5px solid var(--color-tint);
  }

  .tab-control-item span {
    
  }
</style>