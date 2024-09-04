<script>
import IpoData from './components/IpoData.vue';
import KakaoLogin from "./components/KakaoLogin.vue";
import MonthlyChart from './components/MonthlyChart.vue';
export default {
  name: 'App',
  components: {
    KakaoLogin,
    IpoData,
    MonthlyChart,
  }
};
</script>
<template>
  <div id="kakao">
    <KakaoLogin />
  </div>
  <div id="montlyChart">
    <MonthlyChart />
  </div>
  <div id="app">
    <IpoData />
  </div>
</template>

<style scoped>

</style>
