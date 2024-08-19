<template>
  <main class="custom-content">
    <GiphyCard
      class="custom-card"
      v-for="(item, index) in getCategoriesGiphys"
      :key="index"
      :giphy="item"
    />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Categories'
});
// Core
import { onMounted } from 'vue';
// Components
import GiphyCard from 'src/components/GiphyCard.vue';
// Stores
import { useGiphysStore } from 'stores/giphys'
import { storeToRefs } from 'pinia';

const giphyStore = useGiphysStore();
const { getCategoriesGiphys } = storeToRefs(giphyStore);

onMounted(async () => {
  await giphyStore.fetchCategoriesGiphys();
})
</script>
