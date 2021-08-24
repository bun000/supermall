<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center"><p>购物街</p></div>
    </nav-bar>
    <tab-control
        class="tab-control1"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        v-show="isTopShow"
        ref="tabControl1"
      />
    <scroll
      class="content"
      :probeType="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      ref="scroll"
    >
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommend" />
      <feature-views />
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />      
    </scroll>

    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import { getMultiData, getHomeGoods } from "network/home";
import { debounce } from "common/utils"

import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureViews from "views/home/childComps/FeatureViews";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    NavBar,
    RecommendView,
    FeatureViews,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: "pop",
      isShow:false,
      isTopShow:false,
      tabOffsetTop: 0,
      saveY:0,
    };
  },
  activated(){    
    this.$refs.scroll.scrollTo(0,this.saveY)
    this.$refs.scroll.refresh()
  },
  deactivated(){    
    this.saveY = this.$refs.scroll.getScrollY()
  },
  created() {
    // 1. 请求多个数据
    this.getMultiData();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    
  },
  mounted(){
    // 监听图片加载完成
    let refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on('itemImageLoad',()=>{
      refresh()
    })  
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      this.$refs.tabControl2.currentIndex = index
      this.$refs.tabControl1.currentIndex = index
    },

    // 监听滚动位置
    contentScroll(position) {
      this.isShow = (-position.y) > 1000

      this.isTopShow = (-position.y) > this.tabOffsetTop
    },

    // 监听上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)      
    },
    
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop      
    },

    getMultiData() {
      getMultiData().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      });      
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    }
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

 .tab-control1{
  position: relative;
  top: 44px;
  z-index: 9;
}

/* .tab-control {
    position: relative;
    z-index: 9;
  } */
</style>