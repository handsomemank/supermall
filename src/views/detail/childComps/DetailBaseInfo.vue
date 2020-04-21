<template>
<!-- 渲染先先判断请求过来的数据是否为空 -->
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
    props: {
		  goods: {
		    type: Object,
        default() {
		      return {}
        }
      }
    }
	}
</script>

<style scoped>
  .base-info {
    margin-top: 20px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-title {
    font-size: 45px;
    color: #222
  }

  .info-price {
    margin-top: 28px;
    margin-bottom: 28px;
  }

  .info-price .n-price {
    font-size: 55px;
    color: var(--color-high-text);
  }

  .info-price .o-price {
    font-size: 45px;
    margin-left: 5px;
    text-decoration: line-through;
  }

  .info-price .discount {
    font-size: 28px;
    padding: 2px 5px;
    color: #fff;
    background-color: var(--color-high-text);
    border-radius: 8px;
    margin-left: 5px;

    /*让元素上浮一些: 使用相对定位即可*/
    position: relative;
    top: -8px;
  }

  .info-other {
    margin-top: 15px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    line-height: 30px;
    display: flex;
    font-size: 36px;
    border-bottom: 1px solid rgba(100,100,100,.1);
    justify-content: space-between;
  }

  .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }

  .info-service-item img {
    width: 30px;
    height: 30px;
    position: relative;
    top: 2px;
    margin-right: 10px;
  }

  .info-service-item span {
    font-size: 30px;
    color: #333;
  }
</style>
