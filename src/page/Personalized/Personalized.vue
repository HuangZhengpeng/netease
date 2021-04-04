<template>
    <div>
        <div class="bundlewrap">
            <div class="sectionTop">
                <div class="sectionText">推荐歌单</div>
            </div>
            <bundle-list :bundles="bundles"></bundle-list>
            <!-- <ul class="bundlelist">
                <li class="bundle" v-for="(bundle,index) in bundles" :key="index" @click="intobundle(bundle)">
                    <bundle-cover :bundle="bundle"></bundle-cover>
                    <p class="bundleText">
                        {{bundle.name}}
                    </p>
                </li>
            </ul> -->
        </div>

        
        <div class="newSongs">
            <div class="sectionTop">
                <div class="sectionText">最新音乐</div>
            </div>
            <sheet :songs="songs"></sheet>
        </div>
    </div>
</template>
<script>
import Sheet from '../../components/Sheet/Sheet.vue'
import {reqBundleList, reqNewSong, } from "../../api/ajax"
import BundleCover from '../../components/BundleCover/BundleCover.vue';
import BundleList from '../../components/BundleList/BundleList.vue';
export default {
    mounted(){
        reqBundleList().then((response)=>{
            this.bundles=response.data.result
        });
        reqNewSong().then((response)=>{
            this.songs=response.data.result
            // console.log(this.songs);
        });
    },
  components: { Sheet, BundleCover, BundleList },
  data(){return{
      bundles:[],
      songs:[]
  }},
//   methods:{
//       intobundle(bundle){
//           this.$store.dispatch("setBundle",bundle)
//           this.$router.push("/bundle")
//       }
//   }
    
}
</script>
<style>
.bundlewrap{
    width: 100%;

}
.sectionTop{
    width: 100%;
}
.sectionText{
    padding-left: 9px;
    border-left: solid 2px #dd001b;
    margin:17px 0;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
}
/* .bundlelist{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

}
.bundle{
    width: 33%;
    margin-bottom: 16px;
} */
/* .bundleCover{
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
} */

.newSongs{
    width: 100%;
}
</style>