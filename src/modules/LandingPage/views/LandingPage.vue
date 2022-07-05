<template>
  <div ref="content" class="wrap" @scroll="scrollHandler">
    <header class="header" :class="{ 'shadow-scroll': showHeaderShadow }">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <img src="/src/assets/images/img-header-logo.svg" alt="logo" />
          </router-link>
        </div>
        <div class="contact">
          <a class="contact__item_mobile" href="tel:8(800)000-00-00">
            <img src="/src/assets/icons/icon-phone.svg" alt="icon-phone" />
          </a>
          <a class="contact__item_mobile" href="mailto:sales@logo.ru">
            <img src="/src/assets/icons/icon-mail.svg" alt="icon-mail" />
          </a>
          <a class="contact__item" href="tel:8(800)000-00-00">8 800 000 00 00 </a>

          <a class="contact__item" href="mailto:sales@logo.ru">sales@logo.ru </a>
        </div>
      </div>
    </header>
    <section class="slider">
      <CarouselComponent />
    </section>
    <section class="articles container">
      <div class="articles__filters" ref="filters">
        <div class="filter__author" :class="{ 'shadow-scroll': showFiltersShadow }">
          <img src="/src/assets/icons/icon-user.svg" alt="icon-user" />

          <v-select v-model="selectedAuthor" :options="authorList" placeholder="Выбор автора">
          </v-select>
        </div>
        <div class="filter__date" :class="{ 'shadow-scroll': showFiltersShadow }">
          <Datepicker
            v-model="startDate"
            locale="ru"
            format="dd.MM.yy"
            hide-input-icon
            auto-apply
            :enable-time-picker="false"
            placeholder="От"
          ></Datepicker>

          <span class="separator"></span>
          <Datepicker
            v-model="finalDate"
            :min-date="startDate"
            locale="ru"
            format="dd.MM.yy"
            hide-input-icon
            auto-apply
            :enable-time-picker="false"
            placeholder="До"
          ></Datepicker>
        </div>
      </div>
      <LoaderComponent v-if="loader" />
      <ul v-if="isShowListArticles" class="articles__list">
        <li v-for="article in listArticles" :key="article.url" class="articles__item">
          <ArticlesItem :articles-item="article" />
        </li>
      </ul>
      <span v-if="!isShowListArticles && !loader">Список пуст :(</span>
    </section>
    <footer class="footer">
      <div class="container">
        <div class="logo-and-nav">
          <div class="logo-and-nav__logo">
            <router-link to="/">
              <img src="/src/assets/images/img-footer-logo.svg" alt="logo" />
            </router-link>
          </div>
          <div class="nav">
            <div class="nav__group-1">
              <a class="nav__item" href="/">Готовые решения</a>
              <a class="nav__item" href="/">О нас</a>
            </div>
            <div class="nav__group-2">
              <a class="nav__item" href="/">Блог</a> <a class="nav__item" href="/">Контакты</a>
            </div>
          </div>
        </div>
        <div class="copyright-and-social">
          <div class="copyright-and-social__copyright">© ООО «Лого», 2008—2022</div>
          <div class="copyright-and-social__social">
            <a href="/" class="social-link">
              <img src="/src/assets/icons/icon-telegram.svg" alt="icon-telegram" />
            </a>
            <a href="/" class="social-link">
              <img src="/src/assets/icons/icon-vk.svg" alt="icon-vk" />
            </a>
            <a href="/" class="social-link">
              <img src="/src/assets/icons/icon-twitter.svg" alt="icon-twitter" />
            </a>
            <a href="/" class="social-link">
              <img src="/src/assets/icons/icon-youtube.svg" alt="icon-youtube" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import moment from 'moment/moment';
import vSelect from 'vue-select';
import { LandingPageStore } from '@/modules/LandingPage/store/store';
import ArticlesItem from '@/modules/LandingPage/components/Articles/ArticlesItem.vue';
import CarouselComponent from '@/modules/LandingPage/components/Carousel/CarouselComponent.vue';
import '@vuepic/vue-datepicker/dist/main.css';
import 'vue-select/dist/vue-select.css';
import LoaderComponent from '@/modules/LandingPage/components/Loader/LoaderComponent.vue';
import { IArticle } from '@/modules/LandingPage/interfaces/interfaces';

const store = LandingPageStore();
onMounted(() => {
  store.getListArticlesActions();
});
const loader = computed(() => store.isLoader);

// The appearance of a shadow on the header and filters on scroll
const showHeaderShadow = ref(false);
const showFiltersShadow = ref(false);
const filters = ref();
const scrollHandler = (e) => {
  if (e.target.scrollTop > 30) {
    showHeaderShadow.value = true;
  } else if (e.target.scrollTop < 30) {
    showHeaderShadow.value = false;
  }
  if (window.innerWidth > 390) {
    showFiltersShadow.value = filters.value.getBoundingClientRect().y === 105;
  } else {
    showFiltersShadow.value = filters.value.getBoundingClientRect().y === 72;
  }
};

// Filtering the articles based on the selected author and the selected date range.
const startDate = ref();
const finalDate = ref();
const selectedAuthor = ref();

const listArticles = computed(() => {
  const articles = toRaw(store.getListArticles.articles);
  if (articles) {
    if (startDate.value && !finalDate.value) {
      return selectedAuthor.value
        ? articles.filter(
            (article: IArticle) =>
              moment(article.publishedAt).isAfter(moment(startDate.value)) &&
              article.author === selectedAuthor.value,
          )
        : articles.filter((article: IArticle) =>
            moment(article.publishedAt).isAfter(moment(startDate.value)),
          );
    }
    if (!startDate.value && finalDate.value) {
      return selectedAuthor.value
        ? articles.filter(
            (article: IArticle) =>
              moment(article.publishedAt).isBefore(moment(finalDate.value)) &&
              article.author === selectedAuthor.value,
          )
        : articles.filter((article: IArticle) =>
            moment(article.publishedAt).isBefore(moment(finalDate.value)),
          );
    }
    if (startDate.value && finalDate.value) {
      return selectedAuthor.value
        ? articles.filter(
            (article: IArticle) =>
              moment(article.publishedAt).isAfter(moment(startDate.value)) &&
              moment(article.publishedAt).isBefore(moment(finalDate.value)) &&
              article.author === selectedAuthor.value,
          )
        : articles.filter(
            (article: IArticle) =>
              moment(article.publishedAt).isAfter(moment(startDate.value)) &&
              moment(article.publishedAt).isBefore(moment(finalDate.value)),
          );
    }
    if (selectedAuthor.value) {
      return articles.filter((article: IArticle) => article.author === selectedAuthor.value);
    }
    return articles;
  }
  return [];
});

const authorList = computed(() =>
  Array.from(new Set(listArticles.value.map((item: IArticle) => item.author))),
);

const isShowListArticles = computed(() => !!listArticles.value.length && !loader.value);
</script>

<style lang="scss" scoped>
.shadow-scroll {
  box-shadow: -1px 0 18px 0 rgb(0 0 0 / 48%);
  transition: box-shadow 0.5s ease;
}

.wrap {
  background-color: #f7f9ff;
  max-width: 1440px;
  margin: auto;
  height: 100%;
  overflow-y: auto;
}

.header {
  display: flex;
  height: 88px;
  max-width: 1440px;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  background-color: #ffffff;
  z-index: 2;

  @media (max-width: $xxs) {
    height: 55px;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1165px;
  margin: 0 auto;
  @media (max-width: $xl) {
    padding: 0 20px;
    max-width: 100%;
  }
  @media (max-width: $xs) {
    padding: 0 16px;
  }
}

.logo {
  @media (max-width: $xxs) {
    width: 100px;
  }
}

.contact {
  display: flex;
  &__item {
    @include font-header-contact('desktop');
    &:not(:last-child) {
      margin-right: 40px;
    }
    @media (max-width: $xs) {
      display: none;
    }
    &_mobile {
      @media (min-width: $xs) {
        display: none;
      }
      &:first-child {
        margin-right: 20px;
      }
    }
  }
}

.slider {
  background: linear-gradient(100.68deg, #5991ff 13.6%, #0050ef 94.69%);
  max-width: $xxxxl;
  margin: 88px auto 0 auto;
  @media (max-width: $md) {
    height: 366px;
  }
  @media (max-width: $xxs) {
    height: 366px;
    margin: 55px auto 0 auto;
    position: relative;
    top: 16px;
  }
}

.articles {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: $xxs) {
    margin-top: 10px;
  }
  &__filters {
    position: sticky;
    top: 105px;
    display: flex;
    margin-top: 40px;
    margin-bottom: 56px;
    @media (max-width: $xl) {
      flex-direction: column;
      width: 100%;
    }
    @media (max-width: $xxs) {
      @include font-filter('mobile');
      margin-bottom: 30px;
      top: 72px;
    }
  }
  &__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 auto;
    @media (max-width: $xl) {
      justify-content: center;
    }
  }

  &__item {
    @media (max-width: $xl) {
      width: 100%;
    }
  }
}

.filter {
  display: flex;

  &__author {
    display: flex;
    align-items: center;
    margin-right: 20px;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid transparent;
    padding: 9px 15px;
    @include transition;
    @media (max-width: $xl) {
      margin-right: 0;
      margin-bottom: 16px;
    }
    @media (max-width: $xxs) {
      padding: 7px 15px;
    }
    &:hover {
      border: 1px solid #aaaeb7;
      transition: none;
    }
    :deep() {
      .vs__dropdown-toggle {
        border: none;
      }
      .v-select {
        width: 285px;
        @media (max-width: $xl) {
          width: 100%;
        }
      }
      .vs__open-indicator {
        fill: #0050ef;
      }
      .vs__dropdown-toggle {
        cursor: pointer;
      }
      .vs__dropdown-menu {
        @include font-filter('desktop');
        border: none;
        left: -35px;
        width: 335px;
        @media (max-width: $xl) {
          width: 100%;
        }
        @media (max-width: $xxs) {
          @include font-filter('mobile');
        }
      }
      .vs__selected {
        @include font-filter('desktop');
        @media (max-width: $xxs) {
          @include font-filter('mobile');
        }
      }
      .vs__search {
        cursor: pointer;

        &::placeholder {
          @include font-filter('desktop');
          @media (max-width: $xxs) {
            @include font-filter('mobile');
          }
        }
      }
    }
  }
  &__date {
    width: fit-content;
    display: flex;
    align-items: center;
    height: 53px;
    background: #ffffff;
    border-radius: 10px;
    @include font-filter('desktop');
    @media (max-width: $xl) {
      width: 100%;
    }
    @media (max-width: $xxs) {
      @include font-filter('mobile');
      height: 50px;
    }
    :deep() {
      .dp__main {
        @media (max-width: $xl) {
          width: 100%;
        }
      }
      .dp__input {
        border: 1px solid transparent;
        width: 162px;
        @include transition;
        @media (max-width: $xl) {
          width: 100%;
        }
        &:hover {
          border: 1px solid #aaaeb7;
          transition: none;
        }
      }
      .dp__pointer {
        color: inherit;
        &::placeholder {
          opacity: 1;
          @include font-filter('desktop');
          @media (max-width: $xxs) {
            @include font-filter('mobile');
          }
        }
      }
    }
  }
}

.separator {
  width: 11px;
  height: 2px;
  border-radius: 2px;
  background-color: #888888;
}

.footer {
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin-top: 60px;
  padding: 48px 0;
  background-color: #011846;
  @media (max-width: $md) {
    padding: 24px 0;
  }
  @media (max-width: $xxs) {
    margin-top: 35px;
  }
  .container {
    flex-direction: column;
    height: 100%;
  }
}

.logo-and-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 65px;
  @media (max-width: $md) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 32px;
  }
  &__logo {
    @media (max-width: $md) {
      margin-bottom: 32px;
    }
    @media (max-width: $xxs) {
      width: 130px;
    }
  }
}

.nav {
  display: flex;
  &__item {
    @include font-footer-nav('desktop');
    @media (max-width: $xxs) {
      @include font-footer-nav('mobile');
    }
    &:not(:last-child) {
      margin-right: 48px;
    }
  }
  &__group-1 {
    margin-right: 48px;
    @media (max-width: $md) {
      margin-right: 40px;

      display: flex;
      flex-direction: column;
      .nav__item {
        margin-right: 0;
        &:first-child {
          margin-bottom: 16px;
        }
      }
    }
  }
  &__group-2 {
    @media (max-width: $md) {
      display: flex;
      flex-direction: column;
      .nav__item {
        &:first-child {
          margin-bottom: 16px;
        }
      }
    }
  }
}

.copyright-and-social {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: $xs) {
    flex-direction: column;
    align-items: flex-start;
  }
  &__copyright {
    @include font-footer-copyright('desktop');
    @media (max-width: $xxs) {
      @include font-footer-copyright('mobile');
    }
    @media (max-width: $xs) {
      margin-top: 20px;
      order: 1;
    }
  }

  &__social {
    display: flex;
  }
}

.social-link {
  &:not(:last-child) {
    margin-right: 16px;
  }
}
</style>
