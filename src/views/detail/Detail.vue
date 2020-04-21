<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="navBar"></DetailNavBar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="Shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>  
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowTop"></BackTop>
    <!-- <Toast :message="message" :show="show"></Toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetaiGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'

import { mapActions } from "vuex";

import {deBounce} from 'common/utils.js'

import {getDetail,Goods,Shop,GoodsParam,getRecommend,} from 'network/detail'
export default {
  name : 'Detail',
  data() {
    return {
      iid: null,
      goods: {},
      Shop: {},
      topImages: [],
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex : 0,
      isShowTop: false,
      // message: '',
      // show: false
    }
  },
  mounted() {
    this.$bus.$on('detailImageLoad', () => {
      this.$refs.scroll.refresh()
    })

    

  },
  created() {
    console.log(this.$store.state.cartList)
    // 1 保存动态路由传入的iid
    this.iid = this.$route.params.iid
    // 2 根据iid请求详细的数据
    getDetail(this.iid).then(res => {
      // 1获取定都的轮播图数据
      const data = res.data.result
      
      this.topImages = data.itemInfo.topImages
      
      console.log(data);
      // 2 通过封装好的对象来获取商品的信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      console.log(this.goods)
      // 3 创建店铺的详情数据并且保存
      this.Shop = new Shop(data.shopInfo)
      // 4 保存商品的详情数据
      this.detailInfo = data.detailInfo
      // 5 保存获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      // 6 保存取出的评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // 模块渲染需要一定的事件，不可能一赋值就从dom中拿到offsetTop的数据
      // 执行下一帧的操作
      // 出现高度不正确的时候，因为dom中的赌片还并没有完全加载完成
      // this.$nextTick(() => {
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })

       //利用给getThemeTopy防抖处理，避免多次调用
      this.getThemeTopY = deBounce(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)      
      },100)

    })   
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.data.list
    })

  },
  methods: {
    ...mapActions(['addCart']),

    addToCart() {
    //  获取商品需要展示的消息
      const obj = {
        iid: this.iid,
        desc: this.goods.desc,
        price: this.goods.price,
        title: this.goods.title,
        img: this.topImages[0],
        count: 0
      }
      // mapActions映射到方法中,带一个参数,相当于,dispatch将参数发送到vuex的方法
      this.addCart(obj).then(res => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },2000)
        this.$toast.show(res,1500)
        console.log(this.$store)
      })

      // this.$store.dispatch('addCart',obj).then(res => {
      //   console.log(res)
      // })
    },
    backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
    },

    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      console.log(this.themeTopYs[index])
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],500)
    },
    contentScroll(position) {
      // 1 获取y的值
      const positionY = -position.y
      // 2 positionY和主题中的值进行对比
      // [0,29636,30632,30961]
      let length = this.themeTopYs.length
      for(let i = 0; i < length-1; i++) {
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i;
          console.log(i)
          console.log(this.currentIndex)
          this.$refs.navBar.currentIndex = this.currentIndex
        }
      }
      this.isShowTop = (-position.y) > 1000
    }
  },
  components : {
    scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    scroll,
    BackTop,
    // Toast
  },
  // 一旦进入当前页面就刷新
  activated(){
    this.$refs.scroll.refresh()
  }

}
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    width: 100%;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height:calc(100% - 150px );
  }

</style>