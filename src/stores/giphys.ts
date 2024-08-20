// Core
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar'
// Services
import { api } from 'boot/axios';
// Types
import { GiphyState, IGiphy, IGiphyObject, ICategory } from 'src/types';

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
      giphys: [],
      offset: 0,
      limit: 25,
      total: 0,
      selected: null,
      loading: false
    },
  }),
  getters: {
    getGiphys: (state) => state.giphys.data,
    getFavoriteGiphys: (state) => state.favorites,
    getCategories: (state) => state.categories.data.map((item: ICategory) => ({
      ...item,
      id: item.gif.id,
      title: item.name,
      image: item.gif.images.downsized.url,
    })),
    getGiphysByCategory: (state) => state.categories.giphys,
    selectedCategory: (state) => state.categories.selected
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
        this.categories.data = res.data.data as ICategory[];
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
      LocalStorage.set('favorites', JSON.stringify(this.favorites));
    },
    async fetchGiphysByCategory(search: string | null = null) {
      this.categories.loading = true;
      const params = {
        limit: this.categories.limit,
        offset: this.categories.offset,
        lang: 'pt',
        q: search,
      }
      await api.get('/search', { params })
      .then((res) => {
        this.categories.giphys = [
          ...this.categories.giphys,
          ...res.data.data.map((item: IGiphy) => ({ 
            id: item.id,
            title: item.title,
            image: item.images.downsized.url,
          }))
        ];
        this.categories.offset += this.categories.limit;
        this.categories.total = res.data.data.pagination.total_count;
      })
      .catch(() => {})
      .finally(() => {
        this.categories.loading = false;
      })
    },
    getFavorites(): IGiphyObject[] {
      const storedFavorites = LocalStorage.getItem('favorites');
    
      if (storedFavorites) {
        try {
          const parsedFavorites: IGiphyObject[] = JSON.parse(storedFavorites.toString());
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
    },
    setSelectedCategory(category: ICategory | null = null) {
      this.categories.selected = category;
    }
  },
});
