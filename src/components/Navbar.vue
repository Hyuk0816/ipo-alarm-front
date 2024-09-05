<script setup>
  import KakaoLogin from "./KakaoLogin.vue";
</script>

<template>
  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="" alt="Logo" width="30" height="24" class="d-inline-block align-text-top">
        공모주 알리미
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <KakaoLogin />
          </li>
        </ul>
      </div>
    </div>

  </nav>
</template>

<style scoped>

</style>