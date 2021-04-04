<template>
  <div>
    <header class="header" v-show="!$route.meta.hideOther">
      <div class="topfix">
        <img class="topimg" src="./common/pics/icon.svg" alt="网易云音乐">
      </div>
    </header>
    <div class="tabwraper" v-show="!$route.meta.hideOther">
      <router-link class="tab" to="/personalized" replace>
        <div class="tabtext" :class="{tabtext_selected:$route.path=='/personalized'}">推荐音乐</div>
      </router-link>
      <router-link class="tab" to="/hotlist" replace>
        <div class="tabtext" :class="{tabtext_selected:$route.path=='/hotlist'}">热歌榜</div>
      </router-link>
      <router-link class="tab" to="/search" replace>
        <div class="tabtext" :class="{tabtext_selected:$route.path=='/search'}">搜索</div>
      </router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  // mounted(){
  //   // this.$store.dispatch("createAudio",document.createElement("audio"))
  // },
  data(){
    return{
      tabnum:1,
    }
  },
}
</script>

<style scoped>
.header{
  width: 100%;
  height: 84px;
  background-color:#d43c33;
}
.topfix{
  height: 100%;
  margin-left: 10px;
  position: relative;
}
.topimg{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 142px;
  height: 25px;
}
.tabwraper{
  width: 100%;
  height: 40px;
  display: flex;
  border-bottom: solid 1px rgba(0,0,0,.1);
}
.tab{
  width: 33.33%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.tabtext{
  padding: 12.5px 5px;
  font-weight: 400;
  color: #333;
  font-size: 15px;

}
.tabtext_selected{
  color: #dd001b;
  border-bottom: solid 2px #dd001b;
}
</style>