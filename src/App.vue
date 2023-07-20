<template>
  <side-bar />
  <results />
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import Results from "@/components/Results.vue";

export default {
  components: {
    SideBar,
    Results,
  },
};
</script>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.15.4/css/all.css");
#app {
  display: flex;
  justify-content: space-around;
  color: #000;
  font-family: "montserrat";
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
