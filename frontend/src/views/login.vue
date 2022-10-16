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
        <div class="login-contents"></div>
        <div class="login-options">
          <r-checkbox
            v-model="isAutoSave"
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
          <r-textfield
            :textfieldStyle="{
              width: 'calc(100% - 22px)',
              height: '2rem',
              marginBottom: '0.5rem',
              fontSize: '1rem',
            }"
            :borders="{
              focus: `1px solid ${colors.vaildColor}`,
            }"
            placeholder="아이디/인증 이메일"
          >
          </r-textfield>
          <r-textfield
            :textfieldStyle="{
              width: 'calc(100% - 22px)',
              height: '2rem',
              marginBottom: '0.5rem',
              fontSize: '1rem',
            }"
            :borders="{
              focus: `1px solid ${colors.vaildColor}`,
            }"
            placeholder="비밀번호"
          >
          </r-textfield>
        </div>
        <div
          v-if="isClickedLoginBtn && isInvaildLoginForm"
          :style="[guideMsgStyle]"
        >
          {{ guideMsg }}
        </div>
        <r-btn
          @click="onClickLoginBtn"
          :btnStyle="{
            backgroundColor: colors.vaildColor,
            color: 'white',
          }"
          :hoverBgColor="`rgba(${colors.vaildColor}, .4)`"
          :hoverColor="'white'"
          >로그인</r-btn
        >
        <div class="login-footer">footer</div>
      </div>
    </r-main>
  </div>
</template>
<script setup lang="ts">
import colors from "@/utils/colors";
import { mdiApi } from "@mdi/js";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

/**login form */
const isAutoSave = ref(false);
const isClickedLoginBtn = ref(false);
const guideMsg = computed(() => (isInvaildLoginForm.value ? "안된다" : "된다"));
const isInvaildLoginForm = ref(false);

const guideMsgStyle = computed(() => {
  if (isInvaildLoginForm.value) {
    return {};
  } else {
    return {};
  }
});

function onClickLoginBtn() {
  isClickedLoginBtn.value = true;
}

function onClickVrameIcon() {
  router.push("/");
}
</script>
<style lang="scss" scoped>
@import "@/styles/views/login.scss";
.login {
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;

  .login-body {
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    .login-header {
      width: 100%;
    }
    .login-options {
      margin-bottom: 1rem;
    }
    .login-contents {
      padding-top: 2rem;
      .login-form {
      }
    }

    .login-footer {
    }
  }
}
</style>
