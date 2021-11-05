<template>
  <div class="container p-3 overflow-auto">
    <ProductTile :fullDisplay="false" :product="openProduct" />
    <p>{{ openProduct.description }}</p>
    <div class="mt-2">
      <Button
        v-if="onWatchList"
        @click="removeFromWatchList(openProduct.id)"
        text="Vergessen"
      />
      <Button v-else @click="addToWatchList(openProduct.id)" text="Vormerken" />
    </div>
    <div>
      <p class="highlight mt-2">Beschreibung</p>
      <p>{{ openProduct.longDescription }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, ref, watchEffect } from "vue";
import Product from "@/store/interfaces/Product";
import ProductTile from "@/components/ProductTile.vue";
import Button from "@/components/Button.vue";
import { productStore } from "@/store/productStore";

export default {
  props: {
    openProduct: Object as PropType<Product>,
  },
  components: {
    ProductTile,
    Button,
  },
  setup(props: any) {
    const onWatchList = ref<Boolean>(
      productStore.getProductOnWatchList(props.openProduct.id)
    );

    watchEffect(() => {
      onWatchList.value = productStore.getProductOnWatchList(
        props.openProduct.id
      );
    });

    function addToWatchList(productID: number): void {
      productStore.addToWatchList(productID);
    }

    function removeFromWatchList(productID: number): void {
      productStore.removeFromWatchList(productID);
    }

    return {
      onWatchList,
      addToWatchList,
      removeFromWatchList,
    };
  },
};
</script>

<style scoped>
* {
  font-size: 12px;
  color: rgb(83, 83, 83);
}

.highlight {
  font-size: 14px;
  color: black;
  font-weight: 600;
}

.container {
  height: 500px;
}
</style>
