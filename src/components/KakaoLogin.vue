<template>
  <div>
    <button @click="goToKakaoLogin">카카오 로그인</button>
  </div>
</template>

<script setup>
const goToKakaoLogin = () => {
  // 카카오 로그인 URL
  // 카카오 로그인 페이지로 이동
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=292b2857a22606f949ea630aea4ef0e0&client_secret=LyLPICzrjENT92TXZv937kz5ez4nKYLe&redirect_uri=http://localhost:8080/dev/login/oauth/kakao`;
  window.location.href = kakaoLoginUrl; // 해당 URL로 이동
};
</script>

<style scoped>
/* 스타일 추가 필요 시 여기에 작성 */
</style>
