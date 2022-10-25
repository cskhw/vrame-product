<template>
  <div class="home">
    <h1 class="home-icon">V</h1>
    <h1 class="home-title">핵폐기물 놀이터 개발 중</h1>
    <div class="home-desc">
      사용 가능 예정 서비스: 씹덕 이미지 만들기, 게시판
    </div>
    <div class="home-desc">사용 가능 서비스: 로그인, 회원가입</div>

    <div class="home-btns-box">
      <r-btn
        href="https://github.com/cskhw/simplify"
        :btnStyle="{ width: '10rem', backgroundColor: 'gray', color: 'white' }"
      >
        <r-icon style="margin-right: 0.5rem" color="white" :icon="mdiGithub" />
        GITHUB</r-btn
      >
    </div>
    <div class="home-footer">
      <p>developer: cskhw</p>
      <p>email: gusdn0828@gmail.com</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { mdiGithub } from "@mdi/js";
</script>
<style lang="scss" scoped>
@import "@/styles/views/index";
</style>
