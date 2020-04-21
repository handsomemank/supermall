<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <TabControl class="tab-control" 
                :titles="['流行','新款','经典']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isTabFiexd"
              >              
    </TabControl>
    <Scroll :pullUpLoad="true" 
            class="content" 
            ref="scroll" 
            :probeType="3" 
            @scroll="contentScroll" 
            @pullingUp = 'loadMore'>
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','经典']"
                  @tabClick="tabClick"
                  ref="tabControl2">              
      </TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <!-- 监听组件的根元素，务必加上native -->
    <BackTop @click.native="backClick" v-show="isShowTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import recommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import navbar from 'components/common/navbar/NavBar.vue'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import {getHomeMultidata,getHomeGoods} from "network/home.js"
import {mixins} from 'common/mixin.js'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowTop: false,
      tabOffSetTop: 0,
      isTabFiexd: false,
      itemImageListener: null,
      
    }
  },
  components : {
    
    HomeSwiper,
    recommendView,
    FeatureView,
    
    TabControl,
    navbar,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    //1  请求多个数据
    this.getHomeMultidata(),
    //2 请求商品的数据  
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
    
  },

  // mixins : [itemListenerMixin],
  mounted() {
    
    //1 监听item中图片加载完成 
    
    // 2 tabControl
    // this.tabOffSetTop = this.$refs.TabControl.offsetTop
    // console.log(this.$refs.scroll.TabControl.$el)
    this.$bus.$on('itemImageLoad',() => {
      this.$refs.scroll.refresh()
    })
    
  },

  deactivated() {
    // 取消全局事件的监听
    
    
  },

  methods: {
    // 事件监听相关的方法
    tabClick(index){
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2: 
          this.currentType = 'sell'
          break  
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
        
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      // position.y > 1000
      // 1 判断backTop什么时候出现
      this.isShowTop = (-position.y) > 1000
      //2  决定tabControl是否吸顶（position： fixed）
      this.isTabFiexd = (-position.y) > this.tabOffSetTop
    },
    loadMore(){
      // this.getHomeGoods(this.currentType)
      // this.$refs.scroll.scroll.refresh()

      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()

    },

    // 下列都是网络请求相关的代码
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    },
    swiperImageLoad() {
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop)
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  }
}

</script>
<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* 在使用浏览器原生滚动时候，才用fiexd */
    /* background-color:pink; */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;

  }
  .content {
    top: 70px;
    position: absolute;
    left: 0px;
    right: 0px;
    overflow: hidden;
    bottom: 80px;
  }

  /* .content {
    height: calc(100% - 50px);
    overflow: hidden;
  } */
  #home {
    height: 100vh;
    position: relative;
  }


</style>