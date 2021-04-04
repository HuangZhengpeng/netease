<template>
  <div class="player">
    <div class="playerMask" @click.stop="togglePlay"></div>
    <div class="BGwarp">
      <div
        class="mainBGimg"
        :style="`background-image:url(${blurPicUrl})`"
      ></div>
    </div>
    <div class="songWarp">
      <div class="songSquare">
        <div
          class="songRound"
          :style="{ animationPlayState: isPlaying ? 'running' : 'paused' }"
        >
          <img :src="picUrl" class="songImg" onerror="src='./imgs/northlight.jpeg'" />
          <div class="songOuter"></div>
        </div>
        <div class="songNeedle"></div>
        <div class="songPlay" v-show="!isPlaying"></div>
      </div>
    </div>
    <div class="lrc">
      <p class="lrcTitle">
        {{ song.name }} - <span class="lrcName">{{ artist }}</span>
      </p>
      <div class="shade"></div>
      <div class="lyricsWraper">
        <ul
          class="lyrics"
          ref="lyrics"
          :style="`transform:translateY(${lrcPosition})`"
        >
          <li
            class="lyric"
            v-for="(lyric, index) in lyrics"
            :key="index"
            :class="{ lyric_highlight: index == nthLyric }"
            ref="lyricElement"
          >
            <p>{{ lyric.text }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="downLoadWrap">
      <div class="downLoad" @click="downLoadSong">下载歌曲(谷歌和火狐可用)</div>
    </div>
    <div class="relatedInfo" :class="{relatedInfo_down: infoDown}">
      <div class="relatedInfoTop" :class="{relatedInfoTop_down: infoDown}" @touchstart="infoTouchstart" @touchend="infoTouchend">
        <div class="relatedBar" :class="{relatedBar_down: infoDown}"></div>
        <div class="relatedButtonWrap">
          <div class="relatedButton" v-if="simiList" :class="{relatedButton_highlight:!infoDown && relatednth==0}" @click="changeRelatedTab(0)">相关歌单</div>
          <div class="relatedButton" v-if="simiSong" :class="{relatedButton_highlight:!infoDown && relatednth==1}" @click="changeRelatedTab(1)">相似歌曲</div>
          <div class="relatedButton" v-if="hotComments" :class="{relatedButton_highlight:!infoDown && relatednth==2}" @click="changeRelatedTab(2)">精彩评论</div>
        </div>
      </div>
      <div class="relatedWraper">
        <div class="relatedMain" ref="relatedMain">
          <div class="relatedList"  v-if="simiList.length>0" >
            <p class="relatedTile">包含这首歌的歌单</p>
            <div class="relatedSimiListWraper">
              <bundle-list :bundles="simiList"></bundle-list>
            </div>
          </div>
          <div class="relatedSong"  v-if="simiSong.length>0" >
            <p class="relatedTile">喜欢这首歌的人也听</p>
            <sheet :songs="simiSong" @infogodown="infogodown"></sheet>
          </div>
          <div class="relatedComments"  v-if="hotComments.length>0" >
            <p class="relatedTile">精彩评论</p>
            <comments :comments="hotComments"></comments>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll"//'@better-scroll/core'比较扯淡，时灵时不灵的
import {createAndDownloadFile} from "../../modules/download"
import { mapActions, mapState } from "vuex";
import { lrchighlight } from "../../modules/lrcCompiler";
import BundleList from '../../components/BundleList/BundleList.vue';
import Sheet from '../../components/Sheet/Sheet.vue';
import Comments from '../../components/Comments/Comments.vue';

export default {
  components: { BundleList, Sheet, Comments },
  mounted() {
    //把从sheet里通过query传过来的id传进歌曲初始化函数里
    this.$store.dispatch("init_song",this.$route.query.id)

    //歌曲播放结束回调函数
    this.audioElement.onended = () => {
      this.isPlaying = false;
      this.jump(0)
    };

    //歌曲暂停回调
    this.audioElement.onpause=()=>{
      this.isPlaying = false;
    }
    //歌曲开始回调
    this.audioElement.onplay=()=>{
      // this.infoDown=true;
      this.isPlaying = true;
    }
    //better-scroll用在上拉列表(歌曲相关信息)里
    this.BS=new BScroll(".relatedWraper",{
      scrollY:true,
      click:true,
      probeType: 2,
    });
    this.BS.on("scroll",()=>{
      this.changeRelatedInfoTab()
    })
    this.BS.on("scrollEnd",()=>{
      this.changeRelatedInfoTab()
    })
  },
  //退出的之前清空歌曲并且销毁player组件（因为用了keep-alive，否则导致多个sheet并存？）
  deactivated() {
    this.$store.dispatch("clearSong");
    this.$destroy();
  },
  data() {
    return {
      lrcPosition: 0,//歌词位置
      nthLyric: 0,//需要高亮的第n条歌词
      isPlaying: true,
      rotateDeg: 0,//旋转图片角度
      infoDown:true,//上拉列表(歌曲相关信息)（此歌曲的关联信息）是否在下边
      startx:0,//控制上拉列表(歌曲相关信息)起始位置
      starty:0,
      jump:Function,//歌词跳转回调
      BS:{},//betterscroll
      relatedpos:[],//上拉列表(歌曲相关信息)各个部分位置
      relatedY:0,//上拉列表(歌曲相关信息)位置
      relatednth:0,//上拉列表(歌曲相关信息)对应的tab需要高亮的部分

    };
  },
  watch: {
    lyrics: function () {
      this.jump=lrchighlight(this.audioElement, this.highlightCallback, this.lyrics);
    },
    //刷新bs
    simiList:function(){
      this.$nextTick().then(()=>{
        this.BS.refresh()
        this.relatedpos=[].slice.call(this.$refs.relatedMain.children).map(child=>child.offsetTop)
      })
    },
    simiSong:function(){
      this.$nextTick().then(()=>{
        this.BS.refresh()
        this.relatedpos=[].slice.call(this.$refs.relatedMain.children).map(child=>child.offsetTop)
      })
    },
    hotComments:function(){
      this.$nextTick().then(()=>{
        this.BS.refresh()
        this.relatedpos=[].slice.call(this.$refs.relatedMain.children).map(child=>child.offsetTop)
      })
    },
  },
  computed: {
    ...mapState(["song", "lyrics", "audioElement", "simiList", "simiSong", "hotComments"]),
    //每条歌词位置
    lrcPositions(){
      return this.$refs.lyricElement.map(lyric=>{
        return lyric.offsetTop
      })
    },
    picUrl() {
      if (this.song.al) {
        return this.song.al.picUrl;
      } else if (this.song.picUrl) {
        return this.song.picUrl;
      }
    },
    blurPicUrl() {
      return this.picUrl + "?imageView&thumbnail=50y50&quality=15&tostatic=0";
    },
    artist() {
      let song = this.song;
      if (song.song) {
        return song.song.artists[0].name;
      } else if (song.ar) {
        return song.ar[0].name;
      } else if (song.artists) {
        return song.artists[0].name;
      } else {
        return "未知歌手";
      }
    },
  },
  methods: {
    ...mapActions(["play", "pause"]),
    //处理由于点击tab导致改变上拉列表(歌曲相关信息)相应位置
    changeRelatedTab(relatednth){
      this.relatednth=relatednth//立刻highlight相关tab项（非必要）
      this.BS.scrollTo(0,-this.relatedpos[relatednth],200)

    },
    //处理滑动上拉列表(歌曲相关信息)导致相应tab高亮
    changeRelatedInfoTab(){
      let pos=-this.BS.y
      let i=0
      while( pos>=this.relatedpos[i+1]){
        if(i<this.relatedpos.length){
          i++
        }
      }
      this.relatednth=i
    },
    togglePlay() {
      if (this.audioElement.paused) {
        this.play();
      } else {
        this.pause();
      }
    },
    //高亮歌词回调函数，nthLyric为需要高亮的歌词的编号
    highlightCallback(nthLyric) {
      this.lrcPosition = -this.lrcPositions[nthLyric]+32+"px"//-(nthLyric - 1) * 32 + "px";
      this.nthLyric = nthLyric;
    },
    //下载歌曲
    downLoadSong() {
      createAndDownloadFile(this.song.name+".mp3", this.audioElement.src);
    },
    //上拉列表(歌曲相关信息)中，触屏开始的回调
    infoTouchstart(event){
        this.startx=event.changedTouches[0].clientX
        this.starty=event.changedTouches[0].clientY
    },
    //上拉列表(歌曲相关信息)中，触屏结束的回调
    infoTouchend(event){
        let endx=event.changedTouches[0].clientX
        let endy=event.changedTouches[0].clientY
        let dx=endx-this.startx//dx>0向右
        let dy=endy-this.starty//dy>0向下
      if(this.infoDown){
        if(dy<=0 && Math.abs(dx)<=Math.abs(dy)){
          this.infoDown=false;
          console.log("goUp");
        }
      }else{
        if(dy>0 && Math.abs(dx)<=Math.abs(dy)){
          console.log("goDown");
          this.infoDown=true;
        }

      }
    },
    //player页面点击了其它歌曲，立刻下拉上拉列表(歌曲相关信息)
    infogodown(){
      console.log("shit");
      this.infoDown=true
    }
  },
};
</script>
<style>
.player {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: hidden;
}
.playerMask {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
}
.BGwarp {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.mainBGimg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  -webkit-transform: scale(1.5);
  -ms-transform: scale(1.5);
  transform: scale(1.5);
  -webkit-transform-origin: center;
  -ms-transform-origin: center;
  transform-origin: center center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  opacity: 1;
  z-index: 1;
  filter: blur(30px);
}
.songWarp {
  position: relative;
  width: 100%;
  margin-top: 115px;
  z-index: 2;
}
.songSquare {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  height: 247px;
  width: 247px;
}
.songRound {
  position: absolute;
  height: 247px;
  width: 247px;
  animation: DiscRotate 30s infinite linear;
  /* transform: rotate(45deg); */
  /* transition: transform 1s; */
}
/* .discRotate{
    animation: DiscRotate 1s infinite linear;
} */
@keyframes DiscRotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.songOuter {
  position: absolute;
  background-image: url("../../common/pics/outer.png");
  background-size: 247px 247px;
  background-repeat: no-repeat;
  height: 247px;
  width: 247px;
}
.songImg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  height: 65%;
}
.songNeedle {
  position: relative;
  left: 110px;
  top: -65px;
  background-image: url("../../common/pics/needle-ab.png");
  background-size: 80px 126px;
  height: 126px;
  width: 80px;
  background-repeat: no-repeat;
  transform: rotate(-5deg);
}
.songPlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-image: url("../../common/pics/play.png");
  width: 56px;
  height: 56px;
  background-size: 56px 56px;
}

.lrc {
  position: relative;
  height: 115px;
  width: 100%;
  margin-top: 25px;
  font: 16px/1.5 Helvetica, sans-serif, STHeiTi;
  color: hsla(0, 0%, 100%, 0.6);
  overflow: hidden;
  z-index: 3;
}
.lrcTitle {
  text-align: center;
  z-index: 4;
  color: #fefefe;
}
.lrcName {
  color: hsla(0, 0%, 100%, 0.6);
}
.shade {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 50%;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), #000);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), #000);
  color: #333;
}
.lyricsWraper {
  padding: 0 35px;
  height: 100px;
  overflow: hidden;
}
.lyrics {
  text-align: center;
  z-index: 4;
  transition: transform 1s;
}
.lyric {
  margin: 8px 0;
}
.lyric_highlight {
  color: #fefefe;
}

.downLoadWrap{
  position: fixed;
  bottom: 60px;
  width: 100%;
  z-index: 4;

}
.downLoad {
  margin: 0 20px;
  /* width: 100%; */
  height: 40px;
  border-radius: 20px;
  color: #fff;
  background-color: #ff3a3a;
  font-size: 18px;
  text-align: center;
  line-height: 40px;
  /* padding: 11px; */
}

.relatedInfo{
  position: fixed;
  width: 100%;
  height: 88%;
  bottom: 0;
  z-index: 6;
  background-color: white;
  transition: transform 0.5s;
}
.relatedInfo_down{
  transform: translateY(100%);
  /* background-color: #ccc; */
}
.relatedInfoTop{
  position: absolute;
  width: 100%;
  transform: translateY(-100%);
  height: 50px;
  background-color: white;
  border-radius: 24px 24px 0 0;
  color: #000;
}
.relatedInfoTop_down{
  background-color: rgba(255, 255, 255, 0.1);
  color: hsla(0,0%,100%,.2);

}

.relatedButtonWrap{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.relatedButton{
  font-size: 16px;
  padding-bottom: 9px;
}
.relatedButton_highlight{
  color: red;
  border-bottom: solid red 2px;

}
/* .relatedBarWraper{
  height: 30px;
  width: 100%;
} */
.relatedBar{
  margin: 10px auto;
  /* background-color: hsla(0,0%,100%,.2); */
  background-color: rgba(0,0,0,0.1);
  width: 50px;
  height: 5px;
  border-radius: 2px;

}
.relatedBar_down{
  background-color: hsla(0,0%,100%,.2);
}

.relatedWraper{
  height: 100%;
  /* position: relative; */
  overflow: hidden;
}
.relatedMain{
  padding-top: 10px;
  width: 100%;
}

.relatedTile{
    color: #333;
    font-weight: 700;
    /* padding-left: 10px; */
    padding: 10px 0 10px 10px;
    font-size: 17px;
    line-height: 18px;
    /* margin: 10px 0; */
}
.relatedSimiListWraper{
  /* width: 100%; */
    padding: 0 10px;

}
</style>