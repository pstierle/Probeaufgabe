<template>
  <div
    class="
      flex
      items-center
      justify-between
      border-black
      rounded
      mt-2
      overflow-hidden
      p-2
      hover:cursor-pointer
    "
    :class="{
      border: fullDisplay,
      onWatchList: onWatchList && fullDisplay,
    }"
  >
    <img
      v-if="product.available"
      class="h-14"
      :src="product.imageURL"
      :alt="product.imageURL"
    />
    <div class="w-9/12 flex flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="highlight text-lg">{{ product.name }}</p>
        <p>{{ formatDate(new Date(product.releaseDate)) }}</p>
      </div>
      <p v-if="fullDisplay">{{ product.description }}</p>
      <div class="flex items-center justify-between mt-1">
        <p v-if="product.available">
          <span class="highlight">Preis:</span> {{ product.price.value }}
          {{ product.price.currency }}
        </p>
        <div class="flex items-center">
          <img
            v-for="index in fullStars"
            :key="index"
            src="../assets/star.png"
            alt=""
            class="w-4"
          />
          <img v-if="!even" src="../assets/half_star.png" alt="" class="w-4" />
          <img
            v-for="index in emptyStars"
            :key="index"
            src="../assets/empty_star.png"
            alt=""
            class="w-4"
          />
        </div>
      </div>
    </div>
    <img
      v-if="!product.available"
      class="w-14"
      :src="product.imageURL"
      :alt="product.imageURL"
    />
  </div>
</template>

<script lang="ts">
import { PropType, ref, watchEffect } from "vue";
import Product from "@/store/interfaces/Product";
import { productStore } from "@/store/productStore";

export default {
  props: {
    product: Object as PropType<Product>,
    fullDisplay: { type: Boolean },
  },
  setup(props: any) {
    const onWatchList = ref<Boolean>(
      productStore.getProductOnWatchList(props.product.id)
    );

    const roundedRating = Math.round(props.product.rating * 2) / 2;
    const even: Boolean = roundedRating % 2 === 0;
    const fullStars = ~~roundedRating;
    const emptyStars = even
      ? 5 - Math.floor(roundedRating)
      : 4 - Math.floor(roundedRating);

    watchEffect(() => {
      onWatchList.value = productStore.getProductOnWatchList(props.product.id);
    });

    function formatDate(date: Date): string {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(".");
    }

    return {
      onWatchList,
      roundedRating,
      fullStars,
      even,
      emptyStars,
      formatDate,
    };
  },
};
</script>

<style scoped>
* {
  font-size: 11px;
  color: rgb(83, 83, 83);
}

.highlight {
  font-size: 13px;
  color: black;
  font-weight: 600;
}

.onWatchList {
  background-color: #d1c4e9;
}
</style>
