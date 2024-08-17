<template>
  <q-card class="giphy-card">
    <q-checkbox 
      size="md" 
      v-model="saved" 
      :val="giphy"
      checked-icon="favorite"
      unchecked-icon="favorite_border"
      color="red"
      class="favorite-button absolute-top-right q-ma-xs"
      @update:model-value="handleChange"
    />
    <q-img class="giphy-image" :src="giphy.image">
      <div class="absolute-bottom text-h6 title">
        {{ giphy.title }}
      </div>
    </q-img>
  </q-card>
</template>

<script setup>
// Core
import { ref, onMounted } from 'vue';
// Stores
import { useGiphysStore } from 'src/stores/giphys';
import { storeToRefs } from 'pinia';

const giphyStore = useGiphysStore();
const { favorites } = storeToRefs(giphyStore);

const props = defineProps({
  giphy: {
    type: Object,
    required: true
  }
})

const saved = ref(false);

function isSaved() {
  saved.value = favorites.value.some((item) => item.id === props.giphy.id);
}

function handleChange() {
  if (saved.value) {
    favorites.value.push(props.giphy);
  } else {
    favorites.value = favorites.value.filter(fav => fav.id !== props.giphy.id);
  }
  giphyStore.saveFavoriteGiphys();
};

onMounted(() => {
  isSaved();
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