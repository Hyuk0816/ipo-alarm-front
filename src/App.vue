<script>
import IpoData from './components/IpoData.vue';
import KakaoLogin from "./components/KakaoLogin.vue";

export default {
  name: 'App',
  components: {
    KakaoLogin,
    IpoData
  }
};
</script>
<template>
  <div id="kakao">
    <KakaoLogin />
  </div>
  <div id="app">
    <IpoData />
  </div>
</template>

<style scoped>

</style>
