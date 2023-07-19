<template>
  <side-bar />
</template>

<script>
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>

<style lang="scss">
@import url("https://use.fontawesome.com/releases/v5.15.4/css/all.css");
#app {
  color: #000;
  font-family: "montserrat";
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
