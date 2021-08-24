<template>
  <div class="recommends">
    <div v-for="item in recommends" :key="item.index" class="recommendItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
  .recommends{
    display: flex;
    text-align: center;
    font-size: 12px;
    border-bottom: 10px solid #eee;
    padding: 10px 0 20px;
  }

  .recommends .recommendItem{
    flex: 1;
    
  }

  .recommends .recommendItem img{
    width: 70px;
    margin-bottom: 10px;
  }
</style>