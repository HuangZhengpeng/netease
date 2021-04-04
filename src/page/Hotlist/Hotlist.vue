<template>
  <div class="hotList">
    <div class="hotListTop">
      <div class="BGUnder">
        <div class="hotListMask"></div>
        <div class="BGUpper"></div>
        <div class="hotTime">更新日期: {{ updateTime }}</div>
      </div>
    </div>
    <sheet :songs="songs"></sheet>
  </div>
</template>
<script>
import Sheet from "../../components/Sheet/Sheet.vue";
import { reqHotList } from "../../api/ajax";
export default {
  components: { Sheet },
  mounted() {
    reqHotList().then((response) => {
      // console.log(response);
      this.timenum = response.data.playlist.trackUpdateTime;
      this.songs = response.data.playlist.tracks;
    });
  },
  data() {
    return {
      songs: [],
      timenum: 0,
    };
  },
  computed: {
    updateTime() {
      let D = new Date(this.timenum);
      return D.getMonth() + 1 + "月" + D.getDate() + "日";
    },
  },
};
</script>

<style>
.hotList {
  width: 100%;
}
.hotListTop {
  /* position: relative; */
  width: 100%;
  height: 146px;
}
.BGUnder {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: initial;
  width: 100%;
  height: 100%;
  background-image: url(../../common/pics/hot_music_bg_2x.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  /* padding-left: 20px; */
}
.hotListMask {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}
.BGUpper {
  margin-left: 20px;
  width: 142px;
  height: 68px;
  background-image: url(../../common/pics/index_icon_2x.png);
  background-position: -24px -29px;
  background-size: 166px 97px;
  background-repeat: no-repeat;
  z-index: 1;
}
.hotTime {
  margin-left: 20px;
  color: white;
  margin-top: 12px;
  font-size: 12px;
  z-index: 1;
}
</style>