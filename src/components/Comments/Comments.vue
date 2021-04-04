<template>
  <ul>
    <li class="comment" v-for="(comment, index) in comments" :key="index">
      <user-logo :user="comment.user" :color="'#666'">
        <p slot="commentTime" class="commentTime">
          {{ parseDate(comment.time) }}
        </p>

        <div slot="thumbUp" class="thumbUp">
          <span class="likeCount" v-if="comment.likedCount > 0">{{
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
</template>
<script>
import UserLogo from "../UserLogo/UserLogo.vue";
export default {
  components: { UserLogo },

  props: {
    comments: Array,
  },
  mounted() {
    this.thumbUpImg = require("./imgs/thumbUp.svg");
  },
  data() {
    return {
      thumbUpImg: "",
      listHeader: ["listHeader0", "listHeader1", "listHeader2"], //0为隐藏
    };
  },
  methods: {
    parseDate(time) {
      let date = new Date(time);
      return (
        date.getFullYear() +
        "年" +
        (date.getMonth() + 1) +
        "月" +
        date.getDate() +
        "日"
      );
    },
  },
};
</script>
<style>
/* .listHeader1 {
  padding: 0 10px;
  height: 23px;
  background-color: #fff;
  color: #666;
  background-color: #eeeff0;
  font-size: 12px;
  line-height: 23px;
} */
.comment {
  margin: 10px;
}
.commentTime {
  font-size: 9px;
  color: #999;
}
.thumbUp {
  position: absolute;
  right: 0;
}
.likeCount {
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
}
</style>