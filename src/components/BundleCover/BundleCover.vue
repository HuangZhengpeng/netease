<template>
  <div class="bundleCover">
    <img class="bundleImg" :src="bundle.coverImgUrl ? bundle.coverImgUrl : bundle.picUrl" alt="" />
    <span class="playAmount">
      {{ (bundle.playCount * 0.0001).toFixed(1) }}万
    </span>
  </div>
</template>
<script>
export default {
    props:["bundle"],
}
</script>
<style>
.bundleCover{
    width: 100%;
    position: relative;

}
.bundleImg{
    width: 100%;

}
.playAmount{
    position: absolute;
    right: 5px;
    top: 2px;
    height: 18px;
    line-height: 18px;
    padding-left: 11px;
    color: white;
    font-size: 10px;
    background-image: url("../../common/pics/headphone.svg");
    background-repeat: no-repeat;
    background-size:11px 10px;
    background-position: 0 4px;
}
</style>