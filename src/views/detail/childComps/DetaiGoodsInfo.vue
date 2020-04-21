<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default: []
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        // 每加载一张图片，将counter的值赋值给counter
        // 当counter的值和监听到的图片总长度的值相等的时候
        // 发送刷新的请求给父组件，将执行scroll的refresh，让scroll获取页面的最新高度
        if (++this.counter === this.imagesLength) {
          this.$emit('imageLoad');
        }
	    }
    },
    watch: {
	    detailInfo() {
        // 监听属性，图片加载进来的数量
	      // 将获取到的图片的数量 保存到imageLength。
	    	this.imagesLength = this.detailInfo.detailImage[0].list.length
	    }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 50px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    
    padding: 0 20px;
  }

  .info-desc .start, .info-desc .end {
    width: 300px;
    height: 2px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 40px 0;
    font-size: 40px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 35px;
  }

  .info-list img {
    width: 100%;
  }
</style>
