import { defineStore } from 'pinia';
import api from '@/apiConfig';
import { IArticle, IArticles } from '@/modules/LandingPage/interfaces/interfaces';

export const LandingPageStore = defineStore({
  id: 'LandingPageStore',
  state: () => ({
    listArticles: {} as IArticles,
    isLoader: false,
  }),
  actions: {
    async getListArticlesActions() {
      this.isLoader = true;
      await api
        .get('', {})
        .then((resp) => {
          const response = resp.data;
          response.articles = response.articles.map((item: IArticle) => ({
            ...item,
            author: item.author ? item.author : 'Anonymous',
          }));
          this.listArticles = response;
          return response;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      this.isLoader = false;
    },
  },

  getters: {
    getListArticles: (state) => state.listArticles,
  },
});
