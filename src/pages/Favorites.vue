<template>
  <main class="custom-content">
    <GiphyCard
      v-for="(item, index) in favorites"
      :key="index"
      :giphy="item"
    />
  </main>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Favorites'
});
// Core
import { onMounted } from 'vue';
// Components
import GiphyCard from 'src/components/GiphyCard.vue';
// Stores
import { useGiphysStore } from 'stores/giphys'
import { storeToRefs } from 'pinia';

const giphyStore = useGiphysStore();
const { favorites } = storeToRefs(giphyStore);

onMounted(() => {
  giphyStore.fetchFavoriteGiphys();
})
</script>

<style lang="scss" scoped>
.giphy-card {
  width: fit-content;
  height: fit-content;
  min-width: 300px;
  max-width: 400px;

  .giphy-image {
    width: 100%;
    object-fit: contain;
  }

  .title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .favorite-button {
    z-index: 999;
  }
}
</style>