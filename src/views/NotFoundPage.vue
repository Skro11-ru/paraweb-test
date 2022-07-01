<template>
  <div class="not-found-page">
    <div class="not-found-page__container">
      <h1>404 page</h1>
      <router-link to="/">Домой</router-link>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style scoped lang="scss">
.not-found-page {
  display: flex;
  height: 100%;
  &__container {
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
  }
}
</style>
