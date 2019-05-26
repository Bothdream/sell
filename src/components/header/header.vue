<template>
  <div class="header">
     <!-- 内容 -->
     <div class="content-wrapper">
     	<div class="avatar">
     	    <!-- 直接使用src找不到，刚开始的时候seller.avatar不存在 -->
     		<img :src="seller.avatar" width="64" height="64">
     	</div>
     	<div class="content">
     		<div class="title">
     			<span class="brand"></span>
     			<span class="name">{{seller.name}}</span>
     		</div>
     		<div class="description">
     			{{seller.description}}/{{seller.deliveryTime}}分钟送达
     		</div>
	     	<!-- seller.supports必须判断，一开始seller.supports为空，seller.supports[0]将会显示为定义 -->
	     	<div v-if="seller.supports" class="support">
	     		<span class="icon" :class="classMap[seller.supports[0].type]"></span>
	     		<span class="text">{{seller.supports[0].description}}</span>
	     	</div>
     	</div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
           <span class="count">{{seller.supports.length}}个</span>
           <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
     <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 浮层 -->
    <div class="detail" v-show="detail">
         <div class="detail-wrapper clearfix">
             <div class="detail-main">
               <!-- 店铺名称 -->
               <h1 class="name">{{seller.name}}</h1>
               <!-- 星评 -->
               <div class="star-wrapper">
                 <v-star :size="48" :score="seller.score" ></v-star>
               </div>
               <!-- 优惠信息 -->
               <div class="title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
               </div>
               <!-- 具体优惠信息 -->
               <ul v-if="seller.supports" class="supports">
                   <li v-for="item in seller.supports" class="support">
                     <span class="icon" :class="classMap[item.type]"></span>
                     <span class="text">{{item.description}}</span>
                   </li>
               </ul>
               <!-- 商家公告 -->
               <div class="bulletin">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
               </div>
               <div class="bulletin-content">
                    {{seller.bulletin}}
               </div>
             </div>
         </div>
         <div class="detail-close" @click="closeDetail">
           <i class="icon-close"></i>
         </div>
    </div>
  </div>
</template>

<script>
   import  star from "../star/star";
   export default {
   	   props: {
   	   	  seller: {
             type:Object
   	   	  }
   	   },
       data () {
          return {
             detail:false
          };
       },
       methods:{
          showDetail () {
            this.detail = true;
          },
          closeDetail () {
            this.detail = false;
          }
       },
   	   created () {
   	   	 this.classMap = ["decrease","discount","special","invoice","guarantee"];
   	   },
       components:{
          "v-star":star
       }
   }
</script>

<style lang="stylus" type="stylesheet/stylus">
    @import '../../common/stylus/mixin.styl'
    .header
       position:relative
       overflow:hidden
       color:#fff	
       background-color:rgba(7,17,27,0.5)
       .content-wrapper
         position:relative
       	 padding:24px 12px 18px 24px;
       	 font-size: 0 
       	 .avatar
       	    display:inline-block
       	    vertical-align:top	
       	 	img 
       	 	  border-radius: 2px;
       	 .content
       	 	display:inline-block
       	 	margin-left: 16px
       	 	.title
       	 	  margin:2px 0 8px 0	
       	 	  .brand
       	 	  	display:inline-block
       	 	  	vertical-align:top
       	 	  	width:30px
       	 	  	height:18px 
       	 	  	bg-image("brand")
       	 	  	background-size: 30px 18px
       	 	  	background-repeat:no-repeat
       	 	  .name
       	 	  	margin-left:6px
       	 	  	font-size:16px
       	 	  	font-weight:bold
       	 	  	line-height:18px	
       	 	.description 
       	 	  font-size:12px
       	 	  font-weight:200
       	 	  line-height:12px 	  
       	 	  margin-bottom:10px
       	 	.support
       	 	  .icon
       	 	  	display:inline-block
       	 	  	width:12px
       	 	  	height:12px
       	 	  	background-size:12px 12px
       	 	  	background-repeat:no-repeat
       	 	  	vertical-align:top
       	 	  	&.decrease 
       	 	  	 bg-image('decrease_1')
       	 	  	&.discount 
       	 	  	 bg-image('discount_1')
       	 	  	&.guarantee 
       	 	  	 bg-image('guarantee_1')
       	 	  	&.invoice 
       	 	  	 bg-image('invoice_1')
       	 	  	&.special 
       	 	  	  bg-image('special_1')
       	 	  .text
       	 	  	margin-left:4px
       	 	  	font-size:10px
       	 	  	font-weight:200
       	 	  	line-height:12px	
       	 .support-count
           position:absolute
           right:12px
           bottom:18px
           height:24px
           padding:0px 8px 
           border-radius: 14px
           line-height:24px
           background-color:rgba(0,0,0,0.2)
           text-align:center
           cursor: pointer
           .count 
             vertical-align:top
             font-size:10px
           .icon-keyboard_arrow_right
             font-size:10px
             margin-left:2px 
             line-height:24px 
       .bulletin-wrapper
         position:relative
         height:28px
         padding:0px 12px
         background-color:rgba(7,17,27,0.2) 
         white-space:nowrap /* 不能放在.bulletin-text内*/
         overflow:hidden /* 不能放在.bulletin-text内*/
         text-overflow:ellipsis /*不能放在.bulletin-text 内*/    	 
         cursor: pointer
         .bulletin-title
           display:inline-block
           vertical-align:top
           margin-top:8px /*(28 - 12) / 2 */
           width:22px
           height:12px
           bg-image("bulletin")
           background-size:22px 12px
           background-repeat:no-repeat
         .bulletin-text
           font-size:10px
           font-weight:200
           line-height:28px 
           padding: 0 4px
         .icon-keyboard_arrow_right
           position:absolute
           font-size:10px 
           right:12px
           top:8px /*?*/
       .background
         position:absolute
         width:100%
         height:100%
         top:0
         left:0
         z-index:-1
         filter:blur(10px)
       .detail 
         position:fixed
         top:0
         left:0
         z-index:100
         width:100%
         height:100%
         background-color:rgba(7,17,27,0.8)
         overflow-y:scroll
         .detail-wrapper
           min-height:100%
           width:100%
           .detail-main
             margin-top:64px
             padding-bottom:64px /*32px + 64 / 2 font-size*/
             .name
               font-size:16px
               font-weight:700
               line-height:16px
               text-align:center
             .star-wrapper
               margin-top:16px
               margin-bottom:28px
               text-align:center
             .title
               display:flex
               width:80%
               margin: 0 auto 24px auto
               .line
                 flex:1
                 position:relative
                 top:-6px
                 border-bottom:1px solid rgba(255,255,255,0.2)
               .text
                 padding:0 12px
                 font-size:14px
             .supports
               padding:0 36px 28px 36px
               .support
                 font-size:0px
                 margin:0 12px 12px 12px
                 .icon
                   display:inline-block
                   width:16px
                   height:16px
                   background-repeat:no-repeat
                   background-size:16px 16px
                   vertical-align:top
                   &.decrease 
                     bg-image('decrease_1')
                   &.discount 
                     bg-image('discount_1')
                   &.guarantee 
                     bg-image('guarantee_1')
                   &.invoice 
                     bg-image('invoice_1')
                   &.special 
                      bg-image('special_1')
                 .text
                   display:inline-block
                   margin-left:6px
                   font-size:12px
                   font-weight:200
                   padding-top:2px
                   line-height:12px
                 &:last-child
                  margin-bottom:0px
             .bulletin
               display:flex
               width:80%
               margin:0 auto
               .line
                 flex:1
                 position:relative
                 top:-6px
                 border-bottom:1px solid rgba(255,255,255,0.2)
               .text
                 font-size:14px
                 line-height:14px
                 padding:0 12px
             .bulletin-content
               padding:24px 48px 0 48px
               font-size:12px
               line-height:24px
               font-weight:200
               text-align:justify
         .detail-close
           width:32px
           height:32px
           font-size:32px
           color:rgba(255,255,255,0.5)
           margin: -64px auto 0 auto
           position:relative
           clear:both
</style>
