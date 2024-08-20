<template>
  <main class="custom-content" v-if="!selectedCategory">  
    <GiphyCard
      clickable
      v-for="(item, index) in getCategories"
      :key="index"
      :giphy="item"
      @click="handleClick(item)"
    />
  </main>
  <main class="flex flex-col q-gutter-lg" v-else>
    <q-btn flat @click="giphyStore.setSelectedCategory()" icon="arrow_back" :label="selectedCategory.name" />
    <q-infinite-scroll @load="handleGiphys" class="custom-content">
      <GiphyCard
        favoritable
        v-for="(item, index) in getGiphysByCategory"
        :key="index"
        :giphy="item"
      />
    </q-infinite-scroll>
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Categories'
});
// Core
import { onMounted, onUnmounted } from 'vue'
// Components
import GiphyCard from 'src/components/GiphyCard.vue';
// Stores
import { useGiphysStore } from 'stores/giphys'
import { storeToRefs } from 'pinia';
// Types
import { ICategory } from 'src/types';

const giphyStore = useGiphysStore();
const { getCategories, selectedCategory, getGiphysByCategory } = storeToRefs(giphyStore);

function handleClick(item: ICategory) {
  giphyStore.setSelectedCategory(item);
}

async function handleGiphys(index: number, done: () => void) {
  await giphyStore.fetchGiphysByCategory(selectedCategory.value?.name_encoded)
  .finally(() => {
    done();
  })
}

onMounted(async () => {
  await giphyStore.fetchCategoriesGiphys();
})

onUnmounted(() => {
  giphyStore.$reset();
})
</script>
