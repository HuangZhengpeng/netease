<template>
  <div>
    <div class="inputWraper">
      <div class="inputBG">
        <span class="searchIcon"></span>
        <input
          class="inputContent"
          type="text"
          placeholder="搜索歌曲、歌手、专辑"
          v-model="keywords"
          @keypress.enter="search"
          ref="inputContent"
        />
        <span class="xIcon" @click="clearSearch"></span>
      </div>
    </div>
    <div class="hotSearch">
      <div class="hotSearchHeader" v-show="headerShow">
        <p class="headerTitle">热门搜索</p>
        <ul class="headerList">
          <li
            class="headerLi"
            v-for="(hotword, index) in hotwords"
            :key="index"
            @click="searchHot(hotword.first)"
          >
            {{ hotword.first }}
          </li>
        </ul>
      </div>
      <sheet :songs="songs"></sheet>
    </div>
  </div>
</template>
<script>
import { reqSearch, reqHotWords } from "../../api/ajax";
import Sheet from "../../components/Sheet/Sheet.vue";
export default {
  components: { Sheet },
  mounted() {
    reqHotWords().then((response) => {
      this.hotwords = response.data.result.hots;
    });
    this.$refs.inputContent.addEventListener("compositionstart", () => {
      this.inputing = true;
    });
    this.$refs.inputContent.addEventListener("compositionend", () => {
      this.inputing = false;
    });
  },
  activated(){
    this.$refs.inputContent.focus()
  },
  data() {
    return {
      songs: [],
      keywords: "",
      hasMore: true,
      inputing: false,
      hotwords: [],
    };
  },
  computed: {
    headerShow() {
      return !(this.inputing || this.keywords.length > 0);
    },
  },
  methods: {
    search() {
      reqSearch(this.keywords)
        .then((response) => {
            // console.log(response);
          this.songs = response.data.result.songs;
          this.hasMore = response.data.result.hasMore;
        })
    },
    searchHot(keywords){
        this.keywords=keywords;
        this.search()
    },
    clearSearch(){
        this.keywords = ''
        this.$refs.inputContent.focus()
    }
  },
};
</script>

<style>
.inputWraper {
  height: 30px;
  padding: 15px 10px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
}
.inputBG {
  height: 30px;
  padding: 0 30px;
  background-color: #ebecec;
  border-radius: 15px 15px;
  position: relative;
}
.searchIcon {
  background-image: url("./imgs/search.svg");
  background-size: 13px 13px;
  width: 13px;
  height: 13px;
  display: inline-block;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}
.xIcon {
  background-image: url("./imgs/x.svg");
  background-size: 14px 14px;
  width: 14px;
  height: 14px;
  display: inline-block;
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
}
.inputContent {
  outline: none;
  border: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: inherit;
  width: 295px;
  font-size: 14px;
}
.hotSearch {
  width: 100%;
}
.hotSearchHeader {
  padding: 15px 10px 0 10px;
}
.headerTitle {
  font-size: 12px;
  color: #666;
  /* margin-bottom: 15px; */
}
.headerList {
  width: 100%;
}
.headerLi {
  border-radius: 60px;
  font-size: 14px;
  display: inline-block;
  padding: 10px;
  margin-top: 10px;
  /* background-color: #ccc; */
  border: solid 1px rgba(0, 0, 0, 0.05);
  color: #333;
}
</style>