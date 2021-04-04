<template>
  <div>
    <div class="bundleHeader">
      <div class="bundleBG" :style="`background-image: url(${blurUrl});`"></div>
      <div class="bundleBox">
        <bundle-cover :bundle="bundle"></bundle-cover>
        <!-- <div class="bundleCover">
          <img class="bundleImg" :src="bundle.picUrl" alt="" />
          <span class="playAmount">
            {{ (bundle.playCount * 0.0001).toFixed(1) }}万
          </span>
        </div> -->
      </div>
      <div class="bundleName">
        <p class="bundleText_other">
          {{ bundle.name }}
        </p>
        <div class="creatorPosition">
          <user-logo
            :user="creator"
            :color="'hsla(0, 0%, 100%, 0.7)'"
          ></user-logo>
        </div>
      </div>
    </div>
    <div class="bundleListWraper">
      <p class="listHeader">歌曲列表</p>
      <sheet :songs="songs"></sheet>
    </div>
    <div class="comments" v-if="hotComments.length>0">
      <p class="listHeader">精彩评论</p>
      <comments :comments="hotComments" ></comments>
    </div>
    <div class="comments" v-if="comments.length>0">
      <p class="listHeader">最新评论</p>
      <comments :comments="comments" ></comments>
    </div>
    <!-- <comments :commentsObj="{comments:comments, commentName:'最新评论', headerStyle:1}" ></comments> -->
    <!-- <div class="comments">
      <p class="listHeader">精彩评论</p>
      <ul>
        <li class="comment" v-for="(comment, index) in hotComments" :key="index">
          <user-logo :user="comment.user" :color="'#666'">
            <p slot="commentTime" class="commentTime">
              {{ parseDate(comment.time) }}
            </p>

            <div slot="thumbUp" class="thumbUp">
              <span class="likeCount" v-if="comment.likedCount>0">{{
                comment.likedCount
              }}</span>
              <div
                class="thumbUpIcon"
                :style="`background-image: url(${thumbUpImg})`"
              ></div>
            </div>
          </user-logo>
          <p class="commentContent">{{ comment.content }}</p>
        </li>
      </ul>
    </div> -->
    <!-- <div class="comments">
      <p class="listHeader">最新评论</p>
      <ul>
        <li class="comment" v-for="(comment, index) in comments" :key="index">
          <user-logo :user="comment.user" :color="'#666'">
            <p slot="commentTime" class="commentTime">
              {{ parseDate(comment.time) }}
            </p>

            <div slot="thumbUp" class="thumbUp">
              <span class="likeCount" v-if="comment.likedCount>0">{{
                comment.likedCount
              }}</span>
              <div
                class="thumbUpIcon"
                :style="`background-image: url(${thumbUpImg})`"
              ></div>
            </div>
          </user-logo>
          <p class="commentContent">{{ comment.content }}</p>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script>
import { reqList, reqHotComments, reqListComments, reqListDetail } from "../../api/ajax";
import BundleCover from '../../components/BundleCover/BundleCover.vue';
import Comments from '../../components/Comments/Comments.vue';
import Sheet from "../../components/Sheet/Sheet.vue";
import UserLogo from '../../components/UserLogo/UserLogo.vue';
// import {  } from "../../api/ajax";
export default {
  components: { Sheet, Comments, UserLogo, BundleCover },
  deactivated() {
    this.$destroy();
  },
  data() {
    return {
      creator: {},
      songs: [],
      fullSongs: [],
      hotComments: [],
      comments: [],
      // bundle:{},
    };
  },
  mounted() {
    let bundleId=this.$route.params.id
      reqListDetail(bundleId).then((response) => {
        // console.log(response.data.playlist);
        this.$store.dispatch("setBundle", response.data.playlist);
        // this.$router.push("/bundle");
      });
    reqList(bundleId).then((response) => {
      this.creator = response.data.playlist.creator;
      this.songs = response.data.playlist.tracks;
      this.fullSongs = response.data.playlist.trackIds;
    });
    reqHotComments({ id: bundleId, type: 2 }).then((response) => {
      // console.log(response.data);
      this.hotComments = response.data.hotComments;
    });
    reqListComments({ id: bundleId, limit: 20, offset: 0 }).then(
      (response) => {
        this.comments = response.data.comments;
      }
    );
  },
  computed: {
    bundle() {
      return this.$store.state.bundle;
    },
    blurUrl() {
      return (
        this.bundle.coverImgUrl + "?imageView&thumbnail=50y50&quality=15&tostatic=0"
      );
    },
  },

};
</script>

<style>
.bundleBG {
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
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 200px;
  overflow: hidden;
  opacity: 1;
  z-index: 0;
  filter: blur(30px);
}
.bundleHeader {
  height: 126px;
  padding: 30px 15px;
  overflow: hidden;
  position: relative;
}
.bundleBox {
  width: 126px;
  height: 126px;
  float: left;
}
/* .bundleCover {
  width: 100%;
  position: relative;
}
.bundleImg {
  width: 100%;
}
.playAmount {
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
  background-size: 11px 10px;
  background-position: 0 4px;
} */

.bundleName {
  position: relative;
  float: left;
  width: 180px;
  height: 126px;
  margin-left: 20px;
}
.bundleText_other {
  padding-top: 1px;
  font-size: 17px;
  line-height: 1.3;
  color: #fefefe;
  height: 44px;
}
.creatorPosition {
  position: absolute;
  bottom: 20px;
  width: 100%;
}

.bundleListWraper {
  background-color: white;
  z-index: 2;
  position: relative;
}
.listHeader {
  padding: 0 10px;
  height: 23px;
  background-color: #fff;
  color: #666;
  background-color: #eeeff0;
  font-size: 12px;
  line-height: 23px;
}

/* .comments {
}
.comment {
  margin: 10px;
}
.commentTime {
  font-size: 9px;
  color: #999;
}
.thumbUp{
    position: absolute;
    right: 0;
}
.likeCount{
    float: left;
    font-size: 11px;
    color: #999;
    margin-right: 5px;
}
.thumbUpIcon {
    float: left;
  background-size: 14px 14px;
  width: 14px;
  height: 14px;

}
.commentContent {
  margin-left: 40px;
  padding: 5px 0;
  color: #333;
  font-size: 15px;
  line-height: 22px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
} */
</style>