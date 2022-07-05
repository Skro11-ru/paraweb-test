<template>
  <a class="article" :href="articlesItem.url" target="_blank">
    <div class="article__date">
      {{ articlesDate }}
    </div>
    <div class="article__title">
      {{ articlesItem.title }}
    </div>
    <div class="article__description">
      {{ articlesItem.description }}
    </div>
    <span class="article__author">
      {{ articlesItem.author }}
    </span>
  </a>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import moment from 'moment/moment';
import { IArticle } from '@/modules/LandingPage/interfaces/interfaces';

const article = defineProps<{ articlesItem: IArticle }>();
const articlesDate = computed(() =>
  moment(article.articlesItem.publishedAt).format('DD MMMM YYYY'),
);
</script>

<style lang="scss" scoped>
.article {
  display: inline-block;
  height: 252px;
  width: 100%;
  max-width: 572px;
  padding: 24px;
  background: #ffffff;
  border-radius: 20px;
  margin-bottom: 20px;

  @include transition;
  @media (max-width: $xl) {
    max-width: 100%;
  }
  &:hover {
    @include shadow;
  }
  &__date {
    @include font-article-date('desktop');
    @media (max-width: $xxs) {
      @include font-article-date('mobile');
    }
  }

  &__title {
    margin: 8px 0 16px 0;
    @include textEllipsis(1);

    @include font-article-title('desktop');
    @media (max-width: $xxs) {
      @include font-article-title('mobile');
    }
  }

  &__description {
    min-height: 72px;
    margin-bottom: 29px;

    @include font-article-description('desktop');
    @include textEllipsis(3);
    @media (max-width: $xxs) {
      @include font-article-description('mobile');
      min-height: 88px;

      @include textEllipsis(4);
    }
  }

  &__author {
    padding: 8px 20px;
    background: rgba(0, 80, 239, 0.06);
    border-radius: 10px;
    @include font-article-author('desktop');
    @media (max-width: $xxs) {
      @include font-article-author('mobile');
    }
  }
}
</style>
