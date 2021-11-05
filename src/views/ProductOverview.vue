<template>
  <div class="p-1 overflow-y-scroll container">
    <ProductTile
      v-for="(product, index) in products"
      :key="index"
      :product="product"
      :fullDisplay="true"
      @click="openProductDetailPage(product)"
    />
  </div>
</template>

<script lang="ts">
import { watchEffect } from "@vue/runtime-core";
import { productStore } from "@/store//productStore";
import { ref } from "vue";
import Product from "@/store/interfaces/Product";
import ProductTile from "@/components/ProductTile.vue";

export default {
  components: {
    ProductTile,
  },
  setup() {
    const products = ref<Product[]>();

    watchEffect(() => {
      products.value = productStore.getFilteredProducts();
    });

    function openProductDetailPage(product: Product): void {
      productStore.openProductDetailPage(product);
    }

    return {
      products,
      openProductDetailPage,
    };
  },
};
</script>

<style scoped>
.container {
  height: 500px;
}
</style>
