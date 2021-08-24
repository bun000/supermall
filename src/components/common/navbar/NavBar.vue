<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name:"NavBar"
}
</script>

<style>
  .nav-bar{
    display: flex;
    line-height: 44px;
    box-shadow: 0 2px 3px rgba(167, 120, 128,.2);
    text-align: center;
    width: 100%;

    z-index: 1;
  }

  .left,.right{
    width: 60px;
  }

  .center{
    flex: 1;    
  }
</style>