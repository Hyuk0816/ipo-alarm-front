<script>
import IpoData from './components/IpoData.vue';
import KakaoLogin from "./components/KakaoLogin.vue";
import MonthlyChart from './components/MonthlyChart.vue';
import Navbar from "./components/Navbar.vue";
export default {
  name: 'App',
  components: {
    Navbar,
    KakaoLogin,
    IpoData,
    MonthlyChart,
  }
};
</script>
<template>
  <Navbar/>
  <div id="montlyChart">
    <MonthlyChart />
  </div>
  <div id="app">
    <IpoData />
  </div>
</template>

<style scoped>

</style>
