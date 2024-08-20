<template>
  <q-card class="giphy-card" :clickable="clickable">
    <q-checkbox
      v-if="favoritable"
      size="md" 
      v-model="saved"
      :val="giphy"
      checked-icon="favorite"
      unchecked-icon="favorite_border"
      color="red"
      class="favorite-button absolute-top-right q-ma-xs"
      @update:model-value="handleChange"
    />
    <q-img class="giphy-image" :src="giphy.image" loading="lazy">
      <div class="absolute-bottom text-h6 title">
        {{ giphy.title }}
      </div>
    </q-img>
  </q-card>
</template>

<script setup>
// Core
import { ref, watch } from 'vue';
// Stores
import { useGiphysStore } from 'src/stores/giphys';
import { storeToRefs } from 'pinia';

const giphyStore = useGiphysStore();
const { favorites } = storeToRefs(giphyStore);

const props = defineProps({
  giphy: {
    type: Object,
    required: true
  },
  favoritable: {
    type: Boolean,
    required: false,
    default: false
  },
  clickable: {
    type: Boolean,
    required: false,
    default: false
  },
  favorited: {
    type: Boolean,
    required: false
  },
})

const saved = ref(false);

function isSaved() {
  const index = favorites.value.map(item => item.id).indexOf(props.giphy.id);
  saved.value = props.favorited || index !== -1;
}

function handleChange() {
  if (saved.value) {
    favorites.value.push(props.giphy);
  } else {
    const index = favorites.value.map(item => item.id).indexOf(props.giphy.id);
    favorites.value.splice(index, 1);
  }
  giphyStore.saveFavoriteGiphys();
};


watch(
  () => favorites,
  () => { isSaved() },
  { deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.giphy-card {
  width: 100%;
  height: fit-content;

  &[clickable="true"] {
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.04);
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