<template>
  <div class="results-wrapper">
    <ul class="results-lists">
      <li
        class="results-lists__items"
        v-for="(list, listIndex) in navigation"
        :key="'list' + listIndex"
      >
        {{ list.title }}
        <button @click="toggleConsolidated(listIndex)">shuffle</button>
        <div>
          <div v-if="!showConsolidated">
            <div
              v-for="(item, itemIndex) in list.subnav"
              :key="'item' + item.title"
            >
              <div v-if="item.clicked">
                <div
                  @click="decreaseQuantity(listIndex, itemIndex)"
                  class="color-box"
                  v-for="n in item.quantity"
                  :key="'color-box-' + n"
                  :style="{ backgroundColor: item.color }"
                ></div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="color-box"
              v-for="(color, colorIndex) in shuffledColors[listIndex]"
              :key="'color-box-' + colorIndex"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showConsolidated: false,
      shuffledColors: [],
    };
  },
  computed: {
    ...mapGetters(["navigation"]),
  },
  methods: {
    decreaseQuantity(listIndex, itemIndex) {
      this.$store.commit("decreaseQuantity", { listIndex, itemIndex });
    },
    consolidateAndShuffleColors(listIndex) {
      const list = this.navigation[listIndex];
      const consolidatedItems = list.subnav.filter((item) => item.clicked);
      const totalConsolidatedQuantity = consolidatedItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      const colors = consolidatedItems.flatMap((item) =>
        new Array(item.quantity).fill(item.color)
      );
      for (let i = colors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [colors[i], colors[j]] = [colors[j], colors[i]];
      }

      this.shuffledColors[listIndex] = colors.slice(
        0,
        totalConsolidatedQuantity
      );
    },
    toggleConsolidated(listIndex) {
      this.showConsolidated = !this.showConsolidated;
      if (this.showConsolidated) {
        this.consolidateAndShuffleColors(listIndex);
      }
    },
    getConsolidatedItems(listIndex) {
      return this.navigation[listIndex].subnav.filter((item) => item.clicked);
    },
  },
};
</script>

<style lang="scss" scoped>
.results-wrapper {
  flex: 1;
  margin: 1rem 0 0 10rem;

  .results-lists__items {
    margin-top: 2rem;
  }
  .results-lists {
    list-style: none;
  }

  .color-box {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-left: 5px;
    margin-top: 1rem;
    vertical-align: middle;
  }
}
</style>
