<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length != 0">
    <div class="info-header">
      <div class="header-title">
        用户评价
        <i class="arrow-right">更多</i>
      </div>
    </div>
    
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <!-- 将时间戳（秒）转换成字符串 1991-1-11 -->
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      // 1 将时间戳转换成Date对象
      const date = new Date(value * 1000);
      return formatDate(date,"yyyy-MM-dd");
    }
  }
}

</script>
<style scoped>
  .comment-info {
    padding: 20px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-header {
    line-height: 50px;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0,0,0,.1);
  }

  .header-title {
    padding-left: 10px;
    font-size: 30px;
  }

  .info-user {
    margin-top: 20px;
    padding: 10px 0 5px;
  }

  .info-user img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .info-user span {  
    position: relative;
    font-size: 25px;
    top: -15px;
    margin-left: 10px;
  }

  .info-detail {
    padding: 0 5px 15px;
  }

  .info-detail p {
    font-size: 30px;
    color: #777;
    line-height: 1.5;
  }

  .info-detail .info-other {
    font-size: 30px;
    color: #999;
    margin-top: 18px;
  }

  .info-other .date {
    margin-right: 10px;
  }

  .info-imgs {

    margin-top: 10px;
  }

  .info-imgs img {
    margin-top: 10px;
    width: 300px;
    height: 250px; 
    margin-right: 5px;
  }
  .arrow-right {
    margin-right: 10px;
    float: right;
    font-size: 30px;
  }

</style>