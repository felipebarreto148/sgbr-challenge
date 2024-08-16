import { defineStore } from 'pinia';

export const useGiphysStore = defineStore('giphys', {
  state: () => ({
    trendings: [],
    favorites: [],
    categories: [],
  }),
  getters: {
    getTrendingsGiphys: (state) => state.trendings,
    getFavoriteGiphys: (state) => state.favorites,
    getCategoriesGiphys: (state) => state.categories,
  },
  actions: {
    // TODO: permitir filtro por categoria e por pesquisa.
    async fetchTrendingsGiphys() { },
    async fetchFavoriteGiphys() { },
    async fetchCategoriesGiphys() { },

    async favoriteGiphy() { },
  },
});
