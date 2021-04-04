<template>
  <ul class="bundlelist">
    <li
      class="bundle"
      v-for="(bundle, index) in bundles"
      :key="index"
      @click="intobundle(bundle)"
    >
      <bundle-cover :bundle="bundle"></bundle-cover>
      <p class="bundleText">
        {{ bundle.name }}
      </p>
    </li>
  </ul>
</template>
<script>
import BundleCover from "../BundleCover/BundleCover.vue";

export default {
  components: { BundleCover },
  props: ["bundles"],
  methods: {
    intobundle(bundle) {
        this.$router.push(`/bundle/${bundle.id}`);

      
    },
  },
};
</script>
<style>
/* .bundleswrap{
    width: 100%;

}
.bundlesTop{
    width: 100%;
}
.bundlesType{
    padding-left: 9px;
    border-left: solid 2px #dd001b;
    margin:17px 0;
    font-size: 17px;
    height: 20px;
    line-height: 20px;
} */
.bundlelist {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.bundle {
  width: 33%;
  margin-bottom: 16px;
}
.bundleText {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 6px 2px 0 6px;
  min-height: 30px;
  line-height: 1.2;
  font-size: 13px;
}
</style>