<template>
  <main class="custom-content">
    <GiphyCard
      clickable
      v-for="(item, index) in getCategoriesGiphys"
      :key="index"
      :giphy="item"
      @click="handleClick(item)"
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
// Types
import { ICategory } from 'src/types';

const giphyStore = useGiphysStore();
const { getCategoriesGiphys } = storeToRefs(giphyStore);

function handleClick(item: ICategory) {
  console.log(item);
  
}

onMounted(async () => {
  await giphyStore.fetchCategoriesGiphys();
})
</script>
