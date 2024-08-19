<template>
  <q-input outlined bottom-slots v-model="searcher" placeholder="Pesquise pelos giphys que te divertem." @update:model-value="handleInput">
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
    <template v-slot:append>
      <q-icon name="close" @click="clearSearch" class="cursor-pointer" />
    </template>
  </q-input>
  <q-infinite-scroll @load="handleGiphys" class="custom-content">
    <GiphyCard
      v-for="(item, index) in getGiphys"
      :key="index"
      :giphy="item"
    />
  </q-infinite-scroll>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Index'
});
// Core
import { onUnmounted, onMounted } from 'vue';
import { debounce } from 'lodash';
// Components
import GiphyCard from 'src/components/GiphyCard.vue';
// Stores
import { useGiphysStore } from 'stores/giphys'
import { storeToRefs } from 'pinia';

const giphyStore = useGiphysStore();
const { getGiphys, searcher } = storeToRefs(giphyStore);

const handleInput = debounce(async function() {
  giphyStore.resetGiphys();
  if (!!searcher.value) {
    await giphyStore.fetchSearchableGiphys(searcher.value);
  } else {
    await giphyStore.fetchGiphys();
  }
}, 500);

async function clearSearch() {
  searcher.value = null;
  giphyStore.resetGiphys();
  await giphyStore.fetchGiphys();
}

async function handleGiphys(index: number, done: () => void) {
  if (!!searcher.value) {
    await giphyStore.fetchSearchableGiphys(searcher.value)
    .finally(() => {
      done();
    })
  } else {
    await giphyStore.fetchGiphys()
    .finally(() => {
      done();
    })
  }
}

onMounted(() => {
  giphyStore.fetchFavoriteGiphys();
})

onUnmounted(() => {
  giphyStore.$reset();
})
</script>
