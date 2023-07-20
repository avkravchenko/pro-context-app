<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <ul v-show="list.open" class="sub-items">
      <li
        class="sub-item"
        v-for="(item, index) in list.subnav"
        :key="'item' + index"
      >
        <i
          @click="checkItem(listIndex, index)"
          class="far"
          :class="{
            'fa-square': !item.clicked,
            'fa-check-square': item.clicked,
          }"
        ></i>
        <div class="title" @click="item.open = !item.open">
          {{ item.title }}
        </div>
        <input
          class="input"
          type="text"
          :value="item.quantity"
          @input="updateQuantity(listIndex, index, $event.target.value)"
        />
        <input
          type="color"
          @change="updateColor(listIndex, index, $event.target.value)"
          class="color-picker"
          :value="item.color"
          name="color"
          id="color"
        />
      </li>
    </ul>
  </transition>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["list", "listIndex"],
  methods: {
    updateQuantity(listIndex, itemIndex, newQuantity) {
      // To prevent non-numeric values, you can add validation here.
      // For example, if you only want positive integers, you can do:
      if (newQuantity < 0) {
        newQuantity = 0;
      }

      newQuantity = +newQuantity;

      this.$store.commit("changeQuantity", {
        listIndex,
        itemIndex,
        newQuantity,
      });
    },
    updateColor(listIndex, itemIndex, newColor) {
      this.$store.commit("changeColor", {
        listIndex,
        itemIndex,
        newColor,
      });
    },
    checkItem(listIndex, itemIndex) {
      this.$store.commit("checkItem", { listIndex, itemIndex });
    },
    enter(el) {
      el.style.height = "auto";
      const height = getComputedStyle(el).height;
      el.style.height = 0;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = height;
      });
    },
    afterEnter(el) {
      el.style.height = "auto";
    },
    leave(el) {
      el.style.height = getComputedStyle(el).height;
      getComputedStyle(el);
      setTimeout(() => {
        el.style.height = 0;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sub-items {
  list-style: none;

  .sub-item {
    display: flex;
    padding: 0 1rem 0 2rem;
    align-items: center;
    justify-content: space-between;
    color: #000;
    cursor: pointer;

    .subnav {
      padding-left: 20px;
    }

    .title {
      flex: 1;
      padding: 10px 0;
      text-indent: 20px;
    }

    .color-picker {
      border: none;
      background: none;
      outline: none;
      inline-size: 22px;
      block-size: 26px;
    }

    .input {
      border: none;
      max-width: 2rem;

      &:focus-visible {
        outline: none;
      }
    }
  }
}

/*
    The CSS classes for the opening and closing animation.
  */
.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}
</style>
