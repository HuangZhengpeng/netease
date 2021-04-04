<template>
  <ul class="sheet">
    <li
      class="song"
      v-for="(song, index) in songs"
      :key="index"
      @click="playMusic(song)"
    >
      <div class="songWraper">
        <p class="songTitle">{{ song.name }}</p>
        <div class="songDetail">
          <div class="sq"></div>
          <span class="singer">{{ artist(song) + "-" + song.name }}</span>
        </div>
      </div>
      <div class="play"></div>
    </li>
  </ul>
</template>
<script>
export default {
  props: ["songs"],
  methods: {
    //传参，跳转到player
    playMusic(song) {
      if(this.$route.path!="/player"){
        this.$router.push({
          name:"player",
          query:{id:song.id}
        })
      }else{
        this.$emit("infogodown")
        this.$store.dispatch("init_song",song.id)
        this.$router.replace({
          query:{...this.$route.query,id:song.id}
        })
      }
    },
    artist(song) {
      if (song.song) {
        return song.song.artists[0].name;
      } else if (song.ar) {
        return song.ar[0].name;
      } else if(song.artists){
        return song.artists[0].name
      }else {
        return "未知歌手";
      }
    },
  },
};
</script>
<style>
.song {
  margin: 0 10px;
  padding: 10px 0;
  overflow: hidden;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
}
.songWraper {
  float: left;
}
.songTitle {
  font-size: 17px;
  color: #333;
}
.songDetail {
  font-size: 12px;
  color: #888;
  height: 18px;
  line-height: 18px;
}
.sq {
  display: inline-block;
  vertical-align: middle;
  width: 12px;
  height: 8px;
  background-image: url(../../common/pics/index_icon_2x.png);
  background-position: 0 0;
  background-size: 166px 97px;
  background-repeat: no-repeat;
}
.singer {
  display: inline-block;
  vertical-align: middle;
}
.play {
  float: right;
  margin: 10px 0;
  width: 22px;
  height: 22px;
  background-image: url(../../common/pics/index_icon_2x.png);
  background-position: -24px 0;
  background-size: 166px 97px;
  background-repeat: no-repeat;
}
</style>