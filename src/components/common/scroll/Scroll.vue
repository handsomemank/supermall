<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type:Number,
      default: 0
    },
    // 上拉加载属性
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  // html渲染完成以后，对dom进行操作
  mounted() {
    // 1 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      // 开启所需要的监听
      click: true,
      pullUpLoad: this.pullUpLoad,
      probeType : this.probeType
    })
    // 2 监听滚动的位置
    // 判断probeType是不是为3或者2,才实现，否则无意义
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll',(position) => {
      // console.log(position)
      this.$emit('scroll',position)
      })
    }
    // 监听上拉事件
    if(this.pullUpLoad) {
        '监听滚动到底部'
      this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
      })
    }
    
  },
  methods: {
    scrollTo(x,y,time) {
      this.scroll && this.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
    

  }
}

</script>
<style scoped>
</style>