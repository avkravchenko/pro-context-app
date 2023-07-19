<template>
  <div class="sidebar">
    <ul class="navigation">
      <li v-for="(list, index) in navigation" :key="'list' + index">
        <div class="list-wrapper">
          <i
            @click="toggleItems(index)"
            class="far"
            :class="{
              'fa-square': !list.complete,
              'fa-check-square': list.complete,
              'show-after':
                !list.complete && list.subnav.some((item) => item.clicked),
            }"
          ></i>
          <p @click="toggleList(index)" class="title">{{ list.title }}</p>
          <i
            class="fas"
            :class="{
              'fa-chevron-right': !list.open,
              'fa-chevron-down': list.open,
            }"
          ></i>
        </div>
        <DropDown :list="list" :listIndex="index" />
      </li>
    </ul>
  </div>
</template>

<script>
import DropDown from "@/components/DropDown.vue";
export default {
  computed: {
    navigation() {
      return this.$store.getters.navigation;
    },
  },
  methods: {
    toggleList(listIndex) {
      this.$store.commit("toggleList", listIndex);
    },
    toggleItems(listIndex) {
      this.$store.commit("toggleItems", listIndex);
    },
  },
  components: {
    DropDown,
  },
};
</script>

<style lang="scss" scoped>
.far {
  position: relative;
}

.show-after::after {
  content: "•";
  position: absolute;
  right: 4.4px;
  top: -0.5px;
}
.sidebar {
  width: 100%;
  max-width: 350px;
  min-height: 100vh;
  background-color: #fefefe;
  box-shadow: 10px 0 20px rgba($color: #000000, $alpha: 0.2);

  .navigation {
    list-style: none;
    border-bottom: 1px solid #dedede;

    li {
      position: relative;
      color: #555;
      border-top: 1px solid #dedede;
      cursor: pointer;

      .list-wrapper {
        display: flex;
        padding: 1rem;
        align-items: center;
        justify-content: space-between;
        color: #000;
        cursor: pointer;

        .title {
          flex: 1;
          margin-left: 1rem;
        }
      }
    }
  }
}
</style>
