<template>
  <div class="signup">
    <r-appbar
      :appBarStyle="{
        display: 'flex',
        height: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 600,
        fontSize: '20px',
      }"
      >회원가입</r-appbar
    >
    <r-main style="width: 100%">
      <div class="signup-body">
        <div class="signup-header">
          <!-- 로고 -->
          <img
            class="pt-btn"
            src="@/assets/images/vrame.png"
            width="50"
            @click="onClickVrameIcon"
          />
        </div>
        <div class="signup-contents">
          <!-- 탭 영억 -->
          <div class="signup-tab-area">
            <!-- 탭 -->
            <template v-for="tabIdx in 2" :key="tabIdx">
              <div
                class="signup-tab"
                @click="curTabIdx = tabIdx"
                :style="{
                  color: curTabIdx === tabIdx ? colors.danawaBlue : '',
                  borderBottom:
                    curTabIdx === tabIdx
                      ? `3px solid ${colors.danawaBlue}`
                      : '',
                }"
              >
                {{ tabLabels[tabIdx - 1] }}
              </div>
            </template>
          </div>
          <div class="signup-guide">아래 항목을 모두 필수로 입력해주세요.</div>

          <div class="signup-option-area">
            <!-- 모두 동의 체크박스 -->
            <r-checkbox
              v-model="agreeAll"
              style="margin-bottom: 0.5rem"
              label="약관 모두 동의하기"
              viewBox="0 0 24 24"
              :labelStyle="{
                fontSize: '1rem',
                color: 'black',
              }"
              :width="24"
              :height="24"
              :checkboxStyle="{
                width: '24px',
                height: '24px',
              }"
            >
            </r-checkbox>

            <!-- 동의 체크박스 -->

            <template
              v-for="(agree, key, idx) in signupForm.agreement"
              :key="key"
            >
              <div class="signup-option">
                <r-checkbox
                  v-model="signupForm.agreement[key]"
                  style="margin-bottom: 0.25rem"
                  viewBox="0 0 24 24"
                  :label="`${agreeLabels[key].label} <span style='color: ${
                    agreeLabels[key].require ? 'red' : 'blue'
                  }''>${agreeLabels[key].require ? '(필수)' : '(선택)'}</span>`"
                  :labelStyle="{
                    fontSize: '14px',
                  }"
                  :width="24"
                  :height="24"
                  :checkboxStyle="{
                    width: '24px',
                    height: '24px',
                  }"
                >
                </r-checkbox>
                <template v-if="idx === 1 || idx === 2 || idx === 3">
                  <div
                    class="signup-option-see-contents pt-btn"
                    @click="
                      isShowAgreeContentsArr[idx - 1] =
                        !isShowAgreeContentsArr[idx - 1]
                    "
                  >
                    내용보기
                    <r-icon
                      :icon="mdiChevronDown"
                      :color="colors.lightGray3"
                    ></r-icon>
                  </div>
                </template>
              </div>
              <div
                v-if="isShowAgreeContentsArr[idx - 1]"
                class="signup-option-contents"
              >
                {{ agreeTempContents }}
              </div>
            </template>
          </div>
          <div class="signup-form">
            <!-- 이메일 주소 -->
            <div class="signup-form-field-title">이메일 주소</div>
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
            <div style="font-size: 12px; color: #666666; margin-bottom: 1rem">
              가입 완료를 위한 이메일 인증이 진행되니 정확한 이메일 주소를
              입력해주시기 바랍니다.
            </div>

            <!-- 아이디 -->
            <div class="signup-form-field-title">아이디</div>
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
            <!-- 비밀번호 -->
            <div class="signup-form-field-title">비밀번호</div>
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
            <!-- 비밀번호 확인 -->
            <div class="signup-form-field-title">비밀번호 확인</div>
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
            <!-- 비밀번호 이름 -->
            <div class="signup-form-field-title">이름</div>
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
            <!-- 닉네임 -->
            <div class="signup-form-field-title">닉네임</div>
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
              style="margin-top: 2rem; margin-bottom: 4rem"
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
        </div>
        <div class="signup-footer">
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
import { mdiChevronDown } from "@mdi/js";
import { computed, reactive, ref, toRef, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

/**signup area */
const curTabIdx = ref(1);

const signupForm = reactive({
  email: "",
  user_id: "",
  password: "",
  conform_password: "",
  name: "",
  nickname: "",
  agreement: {
    age14: false,
    serviceAgreement: false,
    privacyAgreement: false,
    eventMailReceive: false,
  },
});

// 약관 동의 UI
const agreeAll = ref(false);
const tabLabels = ref(["일반회원", "사업자 회원"]);
const agreeLabels = ref({
  age14: { label: "만 14세 이상입니다.", require: true },
  serviceAgreement: { label: "서비스 이용 약관", require: true },
  privacyAgreement: { label: "개인정보 수집 및 이용", require: true },
  eventMailReceive: { label: "이벤트/쇼핑혜택 이메일 수신", require: false },
});
const isShowAgreeContentsArr = ref([false, false, false]);

const agreeTempContents = `제 1장 총칙

제 1 조 (목 적)

이 약관은 ㈜다나와 (전자상거래 사업자)가 운영하는 인터넷 서비스 "다나와" (www.danawa.com) 및 다나와 관련 제반 서비스 사이트(접속 가능한 유,무선 단말기의 종류와는 상관없이 이용 가능한 '회사' 가 제공하는 모든 "서비스" 를 의미하며, 이하 '사이트'라 함)에서 제공하는 상품 및 가격정보 등 상품에 대한 정보 제공 및 광고서비스를 이용함에 있어 '회사' 와 이용자의 권리와 의무 및 책임사항 등을 규정함을 그 목적으로 합니다.

제 2 조 (정의)

① '회사' 란 ㈜다나와가 재화 또는 용역(이하 '상품'이라 함) 및 서비스를 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 상품을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 '회사' 를 운영하는 사업자의 의미로도 사용합니다.
② '서비스' 란 '회사' 와 계약을 통하여 입점 및 제휴한 쇼핑몰들의 상품 및 가격정보를 비교하여 회원의 구매를 돕는 서비스 및 기타 각종 서비스를 의미합니다
③ '이용자'란 '회사' 에 접속하여 이 약관에 따라 '회사' 가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
④ '회원'이라 함은 '회사' 에 개인정보를 제공하여 회원등록을 한 자로서, '회사' 의 정보를 지속적으로 제공받으며, '회사' 가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
⑤ '비회원'이라 함은 회원에 가입하지 않고 '회사' 가 제공하는 서비스를 이용하는 자를 말합니다.`;

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

watch(agreeAll, (newVal) => {
  if (agreeAll.value) {
    for (const key in signupForm.agreement) {
      signupForm.agreement[key] = true;
    }
  } else {
    agreeAll.value = false;
  }
});

watch(signupForm, (newVal) => {
  let result = true;
  for (const key in signupForm.agreement)
    if (!newVal.agreement[key]) result = false;

  agreeAll.value = result;
});
</script>
<style lang="scss" scoped>
@import "@/styles/views/signup.scss";
</style>
