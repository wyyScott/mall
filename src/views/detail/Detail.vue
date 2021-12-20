<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @loadImage="imgLoad"/>
      <detail-param-info :param-info="itemParams"/>
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "components/common/scroll/Scroll";

  import {getGoodsDetail, Goods, Shop} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {}
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.发送网络请求获取商品详情(由于detail没有keep-alive，所以不要在activated中发送网络请求)
      this.getGoodsDetail()
    },
    methods: {
      getGoodsDetail() {
        getGoodsDetail(this.iid).then(res => {
          const data = res.result
          //1.获取轮播图
          this.topImages = data.itemInfo.topImages
          //2.先整合商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          //3.店铺信息
          this.shop = new Shop(data.shopInfo)
          //4.商品详情
          this.detailInfo = data.detailInfo
          //5.商品参数
          this.itemParams = data.itemParams
          //6.评论信息
          if (data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      imgLoad() {
        //重新计算better-scroll的高度
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
 #detail {
   position: relative;
   z-index:9;
   background-color: #fff;
   height: 100vh;
 }

  .content {
    height: calc(100% - 44px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>