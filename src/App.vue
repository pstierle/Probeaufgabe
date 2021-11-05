<template>
  <div class="w-80 shadow-xl rounded">
    <div class="header text-center bg-blue-600 text-white py-2">
      {{ header.headerTitle }}
    </div>
    <ProductDetail :openProduct="openProduct" v-if="openProduct" />
    <ProductOverview v-if="!openProduct" />
    <div class="filter flex justify-evenly items-center bg-gray-200 py-2">
      <p
        v-for="(filter, index) in filters"
        :key="index"
        class="text-center w-1/3"
        @click="setCurrentFilter(filter)"
        :class="{
          'border-b-2 border-blue-600':
            currentFilter === filter && !openProduct,
        }"
      >
        {{ filter }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, watchEffect } from "@vue/runtime-core";
import ProductStore from "@/store/interfaces/ProductStore";
import { productStore } from "@/store//productStore";
import { ref } from "vue";
import Header from "./store/interfaces/Header";
import ProductOverview from "@/views/ProductOverview.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Product from "./store/interfaces/Product";

export default {
  components: {
    ProductOverview,
    ProductDetail,
  },
  setup() {
    const header = ref<Header>();
    const filters = ref<string[]>();
    const currentFilter = ref<string>(productStore.getState().currentFilter);
    const openProduct = ref<Product | undefined>(undefined);

    watchEffect(() => {
      header.value = productStore.getState().header;
      filters.value = productStore.getState().filters;
      currentFilter.value = productStore.getState().currentFilter;
      openProduct.value = productStore.getState().openProduct;
    });

    onMounted(() => {
      fetch(
        "https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json"
      )
        .then((response) => response.json())
        .then((data: ProductStore) => {
          productStore.init(data.products, data.filters, data.header);
          console.log(data);
        });
    });

    function setCurrentFilter(filter: string) {
      productStore.setFilter(filter);
      productStore.openProductDetailPage(undefined);
    }

    return {
      header,
      filters,
      currentFilter,
      openProduct,
      setCurrentFilter,
    };
  },
};
</script>

<style scoped>
</style>
