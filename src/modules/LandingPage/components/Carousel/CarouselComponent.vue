<template>
  <Swiper
    :slides-per-view="1"
    :space-between="50"
    :modules="[Navigation, Pagination, A11y]"
    :pagination="{ clickable: true, dynamicBullets: false }"
  >
    <SwiperSlide v-for="slide in slideList" :key="slide.id" class="slide">
      <div class="slide__background">
        <img class="slide__img_desktop" :src="slide.imgDesktop" alt="img-slider" />
        <img class="slide__img_mobile" :src="slide.imgMobile" alt="img-slider" />
      </div>
      <div class="slide__content">
        <h2 class="slide__title" v-html="slide.title"></h2>
        <p class="slide__text" v-html="slide.text"></p>
        <a class="slide__link" :href="slide.link">{{ slide.buttonText }}</a>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';

const slideList = [
  {
    id: 1,
    title: `Как бизнесу сохранять &nbsp; IT-кадры на фоне кризиса`,
    text: 'Инструменты, которые могут использовать компании для удержания сотрудников',
    imgDesktop: 'src/assets/images/img-slider-desktop.png',
    imgMobile: 'src/assets/images/img-slider-mobile.png',
    buttonText: 'Подробнее',
    link: '#',
  },
  {
    id: 2,
    title: 'Как бизнесу сохранять IT-кадры на фоне кризиса',
    text: 'Инструменты, которые могут использовать компании для удержания сотрудников',
    imgDesktop: 'src/assets/images/img-slider-desktop.png',
    imgMobile: 'src/assets/images/img-slider-mobile.png',
    buttonText: 'Подробнее',
    link: '#',
  },
  {
    id: 3,
    title: 'Как бизнесу сохранять IT-кадры на фоне кризиса',
    text: 'Инструменты, которые могут использовать компании для удержания сотрудников',
    imgDesktop: 'src/assets/images/img-slider-desktop.png',
    imgMobile: 'src/assets/images/img-slider-mobile.png',
    buttonText: 'Подробнее',
    link: '#',
  },
];
</script>

<style lang="scss" scoped>
.slide {
  max-height: 546px;
  &__background {
    position: relative;
    max-width: 1440px;
    display: flex;
    height: 100%;
    align-items: flex-end;
  }

  &__img {
    &_desktop {
      display: block;
      @media (max-width: $xxs) {
        display: none;
      }
    }
    &_mobile {
      display: none;
      @media (max-width: $xxs) {
        display: block;
      }
    }
  }

  &__content {
    display: flex;
    margin-top: 100px;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: 0;
    margin-left: 137px;
    max-width: 574px;
    @media (max-width: $xl) {
      margin-top: 60px;
      margin-left: 30px;
    }
    @media (max-width: $lg) {
      margin-top: 40px;
      margin-left: 16px;
      max-width: 500px;
    }
    @media (max-width: $xxs) {
      margin-top: 21px;
      margin-left: 16px;
    }
  }

  &__title {
    margin-bottom: 22px;
    @include font-slider-title('desktop');
    @media (max-width: $lg) {
      font: normal 600 30px/40px 'Montserrat', sans-serif;
      margin-bottom: 15px;
    }
    @media (max-width: $md) {
      font: normal 600 25px/24px 'Montserrat', sans-serif;
      max-width: 400px;
    }
    @media (max-width: $xxs) {
      @include font-slider-title('mobile');
    }
    @media (max-width: $xxs) {
      max-width: 285px;
    }
  }

  &__text {
    margin-bottom: 32px;
    max-width: 450px;
    @include font-slider-text('desktop');
    @media (max-width: $lg) {
      margin-bottom: 15px;
    }
    @media (max-width: $xxs) {
      max-width: 340px;
      margin-bottom: 25px;
      @include font-slider-text('mobile');
    }
  }

  &__link {
    @include font-button('desktop');
    background: #ffffff;
    border-radius: 10px;
    width: fit-content;
    padding: 16px 32px;
    @media (max-width: $xxs) {
      @include font-button('mobile');
      padding: 13px 25px;
    }
    &:hover {
      @include shadow;
    }
  }
}
.swiper {
  @media (max-width: $md) {
    height: 100%;
  }
}
:deep() {
  .swiper-pagination {
    width: auto;
    margin-left: 134px;
    margin-bottom: 49px;
    @media (max-width: $xl) {
      margin-left: 30px;
      margin-bottom: 20px;
    }
    @media (max-width: $lg) {
      margin-left: 12px;
      margin-bottom: 10px;
    }
    @media (max-width: $xxs) {
      margin-left: 12px;
      margin-bottom: 6px;
    }
    &-bullet {
      width: 28px;
      height: 3px;
      opacity: 0.3;
      background: #fff;
      border-radius: 2px;
      @media (max-width: $xxs) {
        width: 19px;
      }
      &-active {
        opacity: 1;
      }
    }
  }
}

//:deep(.swiper-pagination) {
//  width: auto;
//  margin-left: 134px;
//  margin-bottom: 49px;
//  @media (max-width: $xl) {
//    margin-left: 30px;
//    margin-bottom: 20px;
//  }
//  @media (max-width: $lg) {
//    margin-left: 12px;
//    margin-bottom: 10px;
//  }
//  @media (max-width: $xxs) {
//    margin-left: 12px;
//    margin-bottom: 6px;
//  }
//}
//:deep(.swiper-pagination-bullet) {
//  width: 28px;
//  height: 3px;
//  opacity: 0.3;
//  background: #fff;
//  border-radius: 2px;
//  @media (max-width: $xxs) {
//    width: 19px;
//  }
//}
//:deep(.swiper-pagination-active) {
//  opacity: 1;
//}
</style>
