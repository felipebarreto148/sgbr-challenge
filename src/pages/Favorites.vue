<template>
  <main class="custom-content" v-if="!!favorites.length">
    <GiphyCard
      favoritable
      favorited
      v-for="(item, index) in favorites"
      :key="index"
      :giphy="item"
    />
  </main>
  <main v-else class="flex justify-center">
    <h1 class="title">Você não possui favoritos.</h1>
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

onMounted(async () => {
  await giphyStore.fetchFavoriteGiphys();
})
</script>

<style lang="scss" scoped>
.title {
  font: 500 22px "Poppins", sans-serif;
}
</style>