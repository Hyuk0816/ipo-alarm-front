<script setup>
  import KakaoLogin from "./KakaoLogin.vue";
</script>

<template>
  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand">
        <img src="" alt="Logo" class="rounded mx-auto d-block">
      </a>
      <p class="text-center">
        공모주 알리미
      </p>
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <KakaoLogin />
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>


</style>
