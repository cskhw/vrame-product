<template>
  <div class="login">
    <r-appbar
      :appBarStyle="{
        display: 'flex',
        height: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: '20px',
      }"
      >로그인</r-appbar
    >
    <r-main style="width: 100%">
      <div class="login-body">
        <div class="login-header">
          <img
            class="pt-btn"
            src="@/assets/images/vrame.png"
            width="50"
            @click="onClickVrameIcon"
          />
        </div>
        <div class="login-contents">
          <div class="login-options">
            <r-checkbox
              label="로그인 유지"
              :width="24"
              :height="24"
              viewBox="0 0 24 24"
              :checkboxStyle="{
                width: '24px',
                height: '24px',
              }"
            >
            </r-checkbox>
          </div>
          <div class="login-form">
            <!-- 아이디 -->
            <r-textfield
              v-model="loginForm.email"
              style="margin-bottom: 10px"
              :textfieldStyle="{
                width: 'calc(100% - 22px)',
                height: '2rem',
                fontSize: '1rem',
              }"
              :borders="{
                focus: `1px solid ${colors.danawaBlue}`,
              }"
              placeholder="이메일"
            >
            </r-textfield>
            <!-- 비밀번호 -->
            <r-textfield
              v-model="loginForm.password"
              type="password"
              style="margin-bottom: 10px"
              :textfieldStyle="{
                width: 'calc(100% - 22px)',
                height: '2rem',
                fontSize: '1rem',
              }"
              :borders="{
                focus: `1px solid ${colors.danawaBlue}`,
              }"
              placeholder="비밀번호"
            >
            </r-textfield>
            <div
              v-if="isClickedLoginBtn && isInvaildLoginForm"
              :style="[guideMsgStyle]"
            >
              {{ guideMsg }}
            </div>
            <r-btn
              @click="onClickLoginBtn"
              :btnStyle="{
                backgroundColor: colors.danawaBlue,
                color: 'white',
                fontWeight: 'bold',
              }"
              :hoverBgColor="rgbToRgba(colors.danawaBlue, '.8')"
              :hoverColor="'white'"
              >로그인</r-btn
            >
          </div>
          <div class="login-menus">
            <div>아이디 찾기</div>
            <div>비밀번호 찾기</div>
            <div @click="$router.push('/signup')">회원가입</div>
          </div>
        </div>
        <div class="login-footer">
          Copyright © vrame Co., Ltd. All Rights Reserved.
        </div>
      </div>
    </r-main>
  </div>
</template>
<script setup lang="ts">
import api from "@/api/api";
import { asyncDebounce } from "@/utils/asyncDebounce";
import colors from "@/utils/colors";
import { rgbToRgba } from "@/utils/vrame-utils";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

/**login area */
const isAutoSave = ref(false);
const isClickedLoginBtn = ref(false);
const guideMsg = computed(() => (isInvaildLoginForm.value ? "안된다" : "된다"));
const isInvaildLoginForm = ref(false);

const loginForm = reactive({ email: "", password: "" });

const guideMsgStyle = computed(() => {
  if (isInvaildLoginForm.value) {
    return { color: "red" };
  } else {
    return {};
  }
});

async function asyncLogin() {
  isClickedLoginBtn.value = true;
  const response = await api.auth.login({
    email: loginForm.email,
    password: loginForm.password,
  });
  console.log(response);
}

const onClickLoginBtn = asyncDebounce(asyncLogin);

function onClickVrameIcon() {
  router.push("/");
}
</script>
<style lang="scss" scoped>
@import "@/styles/views/login.scss";
</style>
