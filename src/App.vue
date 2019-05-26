<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
           <a v-link="{path:'/goods'}">商品</a>
         </div>
        <div class="tab-item">
           <a v-link="{path:'/seller'}">商家</a>
        </div>
        <div class="tab-item">
           <a v-link="{path:'/ratings'}">评论</a>
        </div>
    </div>
    <router-view :seller="seller" keep-alive></router-view>
</template>

<script>
   import header  from "./components/header/header";
   import {urlParse} from "src/common/js/util";
   const ERR_OK = 0;
   export default {
     data() { //父组件传递数据给v-header组件
        return {
          seller: {
            id:(()=>{
                let queryUrl = urlParse();
                return queryUrl.id;
            })()
          }
        };
     },
     created() {
         this.$http.get("/api/seller").then((response) => {
             response = response.body;
             if (response.errno === ERR_OK){
                 //拓展属性，新增了一个id属性
                 this.seller = Object.assign({},this.seller,response.data);
             } 
         });
     },
     components:{
        "v-header":header
     }
   }
</script>

<style lang="stylus" type="stylesheet/stylus">
 @import "./common/stylus/mixin.styl"
.tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
             flex:1
             text-align:center       
             & > a
                  display:block 
                  font-size:14px
                  color:rgb(77,85,93)
                  &.active
                          color:rgb(240,20,20)
</style>
