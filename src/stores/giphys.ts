// Core
import { defineStore } from 'pinia';
// Services
import { api } from 'boot/axios';
// Types
import { GiphyState, IGiphy, IGiphyObject } from 'src/types';

export const useGiphysStore = defineStore('giphys', {
  state: (): GiphyState => ({
    searcher: null,
    giphys: {
      data: [],
      offset: 0,
      limit: 25,
      total: 0,
      loading: false
    },
    favorites: [],
    categories: {
      data: [],
      loading: false
    },
  }),
  getters: {
    getGiphys: (state) => state.giphys.data,
    getFavoriteGiphys: (state) => state.favorites,
    getCategoriesGiphys: (state) => state.categories.data,
  },
  actions: {
    async fetchSearchableGiphys(search: string | null = null) {
      this.giphys.loading = true;
      const params = {
        limit: this.giphys.limit,
        offset: this.giphys.offset,
        lang: 'pt',
        q: search,
      }
      await api.get('/search', { params })
      .then((res) => {
        this.giphys.data = [
          ...this.giphys.data,
          ...res.data.data.map((item: IGiphy) => ({ 
            id: item.id,
            title: item.title,
            image: item.images.downsized.url,
          }))
        ];
        this.giphys.offset += this.giphys.limit;
        this.giphys.total = res.data.data.pagination.total_count;
      })
      .catch(() => {})
      .finally(() => {
        this.giphys.loading = false;
      })
    },
    async fetchGiphys() { 
      this.giphys.loading = true;
      const params = {
        limit: this.giphys.limit,
        offset: this.giphys.offset
      }
      await api.get('/trending', { params })
      .then((res) => {
        this.giphys.data = [
          ...this.giphys.data,
          ...res.data.data.map((item: IGiphy) => ({ 
            id: item.id,
            title: item.title,
            image: item.images.downsized.url,
          }))
        ];
        this.giphys.offset += this.giphys.limit;
        this.giphys.total = res.data.data.pagination.total_count;
      })
      .catch(() => {})
      .finally(() => {
        this.giphys.loading = false;
      })
    },
    async fetchCategoriesGiphys() { 
      this.categories.loading = true;
      await api.get('/categories')
      .then((res) => {
        this.categories.data = res.data.data;
      })
      .catch(() => {})
      .finally(() => {
        this.categories.loading = false;
      })
    },
    async fetchFavoriteGiphys() {
      const giphys: IGiphyObject[] = this.getFavorites();
      this.favorites = giphys;
    },
    async saveFavoriteGiphys() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    getFavorites(): IGiphyObject[] {
      const storedFavorites = localStorage.getItem('favorites');
    
      if (storedFavorites) {
        try {
          const parsedFavorites: IGiphyObject[] = JSON.parse(storedFavorites);
          if (Array.isArray(parsedFavorites)) {
            return parsedFavorites;
          } else {
            return [];
          }
        } catch (error) {
          return [];
        }
      }    
      return [];
    },
    resetGiphys() {
      this.giphys = {
        data: [],
        offset: 0,
        limit: 25,
        total: 0,
        loading: false
      }
    }
  },
});
