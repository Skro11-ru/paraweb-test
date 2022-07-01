<script setup></script>

<template>
  <router-view> </router-view>
</template>

<style scoped lang="scss">
@import '@/assets/style/_main.scss';

#app {
  width: 100%;
  height: 100%;
}
body {
  font-family: SF, sans-serif !important;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0;
  padding: 0;
  -moz-appearance: none !important;
  -webkit-appearance: none;
  overflow-x: hidden;
}
</style>
