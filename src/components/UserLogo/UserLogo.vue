<template>
  <div class="userLogo" @click="toAvatar">
    <div class="userPic" :style="`background-image: url(${user.avatarUrl})`">
      <img
        class="userBG"
        :src="user.avatarDetail.identityIconUrl"
        v-if="user.avatarDetail"
      />
    </div>
    <div class="userText">
      <div class="nicknameWraper">
        <span class="nickname" :style="`color:${color}`">{{ user.nickname }}</span>
        <img class="vip" :src="vipList[Number(user.vipRights.redVipLevel) - 1]" v-if="user.vipRights">
        <!-- <span
          class="vip"
          v-if="user.vipRights"
          :style="`background-image: url(./imgs/${
            vipList[Number(user.vipRights.redVipLevel) - 1]
          })`"
        ></span> -->
        <slot name="thumbUp"></slot>
      </div>
      <slot name="commentTime"></slot>


    </div>
    <!-- <slot name="commentContent"></slot> -->
  </div>
</template>
<script>
import { reqUserDetail } from "../../api/ajax";
export default {
  data() {
    return {
      //假设vip现在最高6级
      vipList: [
        require('./imgs/vip1.png'),
        require('./imgs/vip2.png'),
        require('./imgs/vip3.png'),
        require('./imgs/vip4.png'),
        require('./imgs/vip5.png'),
        require('./imgs/vip6.png'),
      ],
    };
  },
  props: {
    user: Object,
    color:String,
  },
  methods: {
    toAvatar() {
      reqUserDetail(this.user.userId).then((response) => {
        console.log("获得此用户信息");
      });
    },
  },
};
</script>

<style>
.userLogo {
  position: relative;
  /* bottom: 20px; */
  display: flex;
  align-items: center;
}

.userPic {
  position: relative;
  flex-shrink:0;
  height: 30px;
  width: 30px;
  background-size: 30px 30px;
  border-radius: 50%;
}
.userBG {
  position: absolute;
  height: 12px;
  width: 12px;
  right: -6px;
  bottom: 0;
}
.userText {
  margin-left: 10px;
  /* width: 100%; */

  /* display: flex;
  align-items: center; */

}
.nicknameWraper{
display: flex;
  align-items: center;
}
.nickname {
  color: hsla(0, 0%, 100%, 0.7);
  font-size: 14px;
}
.vip{
    position: relative;
    width: 32px;
    height: 11px;
    margin: 0 5px;
    background-size: 32px 11px;
}
</style>