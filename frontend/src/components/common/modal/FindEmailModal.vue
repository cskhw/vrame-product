<template>
  <div
    class="modal"
    ref="modal"
    v-bind:class="{ 'is-active': modalStore.findEmailModal.isOpen }"
  >
    <div class="modal-background is-clipped"></div>
    <div class="modal-content" v-if="!sendEmail && !successPopup">
      <button
        class="modal-close is-large"
        aria-label="close"
        v-on:click="modalStore.findEmailModal.hide()"
      ></button>

      <h1>
        {{ Util.getLocaleTxt(t, "findemail_title") }}
      </h1>
      <p class="" v-html="Util.getLocaleTxt(t, 'findemail_desc')"></p>

      <Select
        class="mb-5"
        v-model="serviceTypeValue"
        outline-color="#5c6bc0"
        show-border
        downIcon
        :options="serviceOptionsValue"
        :style="[
          selectStyle,
          {
            height: '3.1875rem',
            borderRadius: '0.5rem',
            color: 'rgba(19, 19, 21, 0.6)',
          },
        ]"
      />
      <!-- Select country -->
      <div
        class="select-country d-flex"
        :class="{ 'flex-column': appStore.isMobile }"
      >
        <div
          class="navbar-item has-dropdown field select-country__mobile mr-4 mb-2"
          style="width: 27%; height: 3.1875rem !important"
          :style="[
            activeCountryDropdown ? { border: '0.0625rem solid #5C6BC0' } : '',
            { width: appStore.isMobile ? '100%' : '' },
          ]"
          v-on:click="activeCountryDropdown = !activeCountryDropdown"
          v-bind:class="{ 'is-active': activeCountryDropdown }"
        >
          <a
            class="navbar-link select__cout d-flex align-center"
            v-bind:class="{ selected__cout: country !== '' }"
            :style="[
              country === ''
                ? { color: '#7C7F90', paddingLeft: '0.625rem' }
                : { color: '#212037' },
            ]"
          >
            <img
              class="mx-2"
              style="width: 1.25rem; height: 1.25rem"
              :style="[
                country === '' ? { display: 'none' } : { display: 'block' },
              ]"
              :src="country?.img"
            />
            <span
              style="position: absolute"
              :style="{ left: country ? '2.5rem' : '' }"
            >
              {{
                country === ""
                  ? Util.getLocaleTxt(t, "common_selectCountry")
                  : country?.dial_code
              }}
            </span>
          </a>
          <div
            class="navbar-dropdown"
            style="background: #fff; width: 18.75rem; height: 18.75rem"
            :style="[!activeCountryDropdown && { display: 'none' }]"
          >
            <a
              class="navbar-item item__country"
              v-for="item in countries"
              :key="item.code"
              v-on:click="selectCountry(item)"
            >
              <img :src="item.img" />
              <span class="nameCountry">{{ item.name }}</span>
              <span class="dial_code">{{ item.dial_code }}</span>
            </a>
          </div>
        </div>
        <!-- Phone -->
        <div
          class="field field-doubles"
          style="flex: 1"
          :class="{ 'mb-5': !appStore.isMobile }"
        >
          <div style="width: 100%; position: relative">
            <div class="omrs-input-group" style="position: relative">
              <label class="omrs-input-filled">
                <!-- ????????? Submit ?????? -->
                <input hidden />
                <!-- ????????? Submit ?????? -->
                <input
                  required
                  class="input"
                  v-model="formData.phone"
                  id="phone-input"
                  autocomplete="off"
                  name="phone-input"
                  :disabled="phoneDisabled"
                  :style="[
                    phoneValidationCheckResult
                      ? { borderColor: '#f1f1f1' }
                      : { borderColor: '#d2416d' },
                  ]"
                  type="text"
                  @blur="checkInputValidity('phone')"
                  @keydown="handleKeydown('phone', $event)"
                />
                <span
                  class="omrs-input-label"
                  :class="{ disabled: phoneDisabled }"
                  @click="placeholderClick('phone')"
                  >{{ phonePlaceholder }}</span
                >
              </label>
              <div
                style="
                  position: absolute;
                  top: 43%;
                  right: 0;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transform: translate(-5%, -50%);
                "
              >
                <button
                  v-if="!appStore.isMobile"
                  id="phone-auth-button"
                  :disabled="phoneDisabled"
                  :style="[
                    formData.phone != '' && phoneValidationCheckResult
                      ? {
                          background: '#5C6BC0',
                          color: '#fff',
                        }
                      : {
                          background: 'gray',
                          color: '#bdbdbd',
                          cursor: 'not-allowed',
                        },
                  ]"
                  style="font-size: 0.875rem; width: 7.5rem"
                  class="button"
                  @click="phoneBtnClick"
                >
                  {{ phoneBtnText }}
                </button>
              </div>
            </div>
            <div
              v-if="!phoneValidationCheckResult"
              style="
                margin: -0.375rem 0rem 0.625rem;
                font-size: 0.75rem;
                color: #d2416d;
              "
            >
              <span class="omrs-input-helper">{{
                phoneCheckResultMessage
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="appStore.isMobile"
        id="phone-auth-button"
        :disabled="phoneDisabled"
        :style="[
          formData.phone != '' && phoneValidationCheckResult
            ? {
                background: '#5C6BC0',
                color: '#fff',
              }
            : {
                background: 'gray',
                color: '#bdbdbd',
                cursor: 'not-allowed',
              },
        ]"
        style="font-size: 0.875rem; width: 100%"
        class="button mb-2"
        @click="phoneBtnClick"
      >
        {{ phoneBtnText }}
      </button>

      <!-- Phone Code-->
      <div class="field field-doubles mb-5">
        <div style="width: 100%; position: relative">
          <div class="omrs-input-group" style="position: relative">
            <label class="omrs-input-filled">
              <!-- ????????? Submit ?????? -->
              <input hidden />
              <!-- ????????? Submit ?????? -->
              <input
                required
                class="input"
                v-model="formData.phoneAuthCode"
                id="phone-authcode-input"
                :disabled="phoneAuthCodeDisabled"
                autocomplete="off"
                name="phone-authcode-input"
                :style="[
                  phoneAuthCodeValidationCheckResult
                    ? { borderColor: '#f1f1f1' }
                    : { borderColor: '#d2416d' },
                ]"
                type="text"
                @blur="checkInputValidity('phoneAuthCode')"
                @keydown="handleKeydown('phoneAuthCode', $event)"
              />
              <span
                class="omrs-input-label"
                :class="{ disabled: phoneDisabled }"
                @click="placeholderClick('phoneAuthCode')"
                >{{ phoneAuthCodePlaceholder }}</span
              >
            </label>
            <div
              style="
                position: absolute;
                top: 43%;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: translate(-5%, -50%);
              "
            >
              <button
                v-if="!appStore.isMobile"
                id="phone-auth-button"
                :disabled="phoneAuthCodeDisabled"
                :style="[
                  formData.phoneAuthCode != '' &&
                  phoneAuthCodeValidationCheckResult
                    ? {
                        background: '#5C6BC0',
                        color: '#fff',
                      }
                    : {
                        background: 'gray',
                        color: '#bdbdbd',
                        cursor: 'not-allowed',
                      },
                ]"
                style="font-size: 0.875rem; width: 7.5rem"
                class="button"
                @click="phoneAuthCodeBtnClick"
              >
                {{ phoneAuthCodeBtnText }}
              </button>
            </div>
          </div>
          <div
            v-if="!phoneAuthCodeValidationCheckResult"
            style="
              margin: -0.375rem 0rem 0.625rem;
              font-size: 0.75rem;
              color: #d2416d;
            "
          >
            <span class="omrs-input-helper">{{
              phoneAuthCodeCheckResultMessage
            }}</span>
          </div>
          <div
            v-if="showPhoneAuthTimer"
            style="
              margin: -0.375rem 0rem 0.625rem;
              font-size: 0.75rem;
              color: #5c6bc0;
            "
          >
            <span class="omrs-input-helper ml-3 mb-4"
              >{{ Util.getLocaleTxt(t, "common_remainCount") }}:
              <span style="color: #d2416d; font-weight: bold"
                >{{ 5 - phoneAuthCodeCheckTryCount
                }}{{ Util.getLocaleTxt(t, "common_count") }}</span
              >. {{ Util.getLocaleTxt(t, "common_remainTime") }}
              <vue-countdown
                :time="timer"
                :style="{ color: '#D2416D', fontWeight: 'bold' }"
                v-slot="{ minutes, seconds }"
                @end="resetPhoneAuthCode"
                >{{ minutes }}:{{ seconds }}</vue-countdown
              ></span
            >
          </div>
        </div>
      </div>

      <button
        v-if="appStore.isMobile"
        id="phone-auth-button"
        :disabled="phoneAuthCodeDisabled"
        :style="[
          formData.phoneAuthCode != '' && phoneAuthCodeValidationCheckResult
            ? {
                background: '#5C6BC0',
                color: '#fff',
              }
            : {
                background: 'gray',
                color: '#bdbdbd',
                cursor: 'not-allowed',
              },
        ]"
        style="font-size: 0.875rem; width: 100%"
        class="button"
        @click="phoneAuthCodeBtnClick"
      >
        {{ phoneAuthCodeBtnText }}
      </button>

      <Button
        class="ma-0 mt-8 stop-dragging"
        style="width: 10rem"
        :text="Util.getLocaleTxt(t, 'findemail_title')"
        v-on:click="onClickFindEmailBtn"
        :disabled="submitDisabled"
      >
      </Button>
    </div>
    <template v-if="isLoading">
      <div
        class="modal-content d-flex align-center justify-center"
        style="position: absolute; z-index: 2; background: transparent"
      >
        <v-progress-circular
          indeterminate
          color="#5c6bc0"
          width="7"
          :size="50"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import api from "@/api/api";
import { extractError } from "@/api/error";
import { Country, type CountryType } from "@/assets/javascripts/country";
import * as Util from "@/assets/javascripts/ipedit_util";
import { asyncDebounce } from "@/assets/javascripts/utils/asyncDebounce";
import Button from "@/components/Button.vue";
import Select from "@/components/common/Select.vue";
import useAppStore from "@/store/useAppStore";
import useModalStore from "@/store/useModalStore";
import { selectStyle } from "@/styles";
import type { ModalType } from "@/types/modal";
import VueCountdown from "@chenfengyuan/vue-countdown";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

defineProps<{
  modalResetPass?: boolean;
}>();
defineEmits(["closeModalResetPassword", "changeModalLogin"]);

const modal = ref<HTMLElement & ModalType>();

const appStore = useAppStore();
const modalStore = useModalStore();

const stores = {
  as: appStore,
  ms: modalStore,
};

const { t } = useI18n();

const countries = ref(Country);
const country = ref<any>("");
const sendEmail = ref(false);
const successPopup = ref(false);
const serviceTypeValue = ref({
  text: Util.getLocaleTxt(t, "findemail_path"),
  value: "",
});

const serviceOptionsValue = ref([
  { text: Util.getLocaleTxt(t, "findemail_pathEmail"), value: "email" },
  { text: Util.getLocaleTxt(t, "findemail_pathGoogle"), value: "google" },
  { text: Util.getLocaleTxt(t, "findemail_pathApple"), value: "apple" },
]);

interface FindEmailFormType {
  country: { code: string };
  type: string;
  phone: string;
  phoneAuthCode: string;
  isPhoneAuthorized: boolean;
}

const formData = ref<FindEmailFormType>({
  country: { code: "" },
  type: "",
  phone: "",
  phoneAuthCode: "",
  isPhoneAuthorized: false,
});

const activeCountryDropdown = ref(false);

const phonePlaceholder = ref(Util.getLocaleTxt(t, "common_phonePlaceholder"));
const phoneBtnText = ref(Util.getLocaleTxt(t, "common_requestCode"));
const phoneDisabled = ref(false);

const phoneAuthCodePlaceholder = ref(
  Util.getLocaleTxt(t, "common_inputAuthCode")
);
const phoneAuthCodeBtnText = ref(Util.getLocaleTxt(t, "common_requestAuth"));
const phoneAuthCodeDisabled = ref(true);

const timer = ref(0);

// ????????? ?????? ????????? ?????? ??????
const phoneValidationCheckResult = ref(true);
// ????????? ?????? ????????? ?????? ?????? ?????????
const phoneCheckResultMessage = ref("");

// ????????? ?????? ???????????? ????????? ?????? ??????
const phoneAuthCodeValidationCheckResult = ref(true);
// ????????? ?????? ????????? ?????? ?????? ?????????
const phoneAuthCodeCheckResultMessage = ref("");
// ????????? ?????? ???????????? ?????? ????????? on/off
const showPhoneAuthTimer = ref(false);
// ????????? ?????? ????????? ?????? ?????? ??????(?????? 5???)
const phoneAuthCodeCheckTryCount = ref(0);

const submitDisabled = ref(true);

const isLoading = ref(false);

// UI??? placeholder ????????? ??????, placeholder ????????? ??????????????? ???????????? ???
function placeholderClick(target: string) {
  if (target == "phone") {
    document.getElementById("phone-input")?.focus();
  }

  if (target == "phoneAuthCode") {
    document.getElementById("phone-authcode-input")?.focus();
  }
}

// ??? ??????????????? ????????? ????????? ??????????????? ?????????
function handleKeydown(target: string, e: KeyboardEvent) {
  // ?????????????????? Esc ????????? ?????????
  if (e.key == "Escape") {
    e.preventDefault();
    e.stopPropagation();
  }

  // ???????????? ??????, ????????? ????????? ????????? ???????????? ?????????. ???????????? blur????????? ????????? ???????????? ??????
  if (target == "phone") {
    phoneValidationCheckResult.value = true;
    phoneCheckResultMessage.value = "";
    if (e.key == "Enter") {
      document.getElementById("phone-input")?.blur();
    }
  }

  // ????????? ??????????????? ??????, ????????? ????????? ????????? ???????????? ?????????. ???????????? blur????????? ????????? ???????????? ??????
  if (target == "phoneAuthCode") {
    phoneAuthCodeValidationCheckResult.value = true;
    phoneAuthCodeCheckResultMessage.value = "";
    if (e.key == "Enter") {
      document.getElementById("phone-authcode-input")?.blur();
    }
  }
}

// ?????? ????????? ??????
function checkInputValidity(target: string) {
  // ???????????? ???????????? ????????? ??????
  if (target == "phone" && formData.value.phone != "") {
    let regExp = /^[0-9]+$/;

    if (!regExp.test(formData.value.phone)) {
      phoneValidationCheckResult.value = false;
      phoneCheckResultMessage.value = Util.getLocaleTxt(
        t,
        "common_phoneFormatError"
      );
    } else if (
      formData.value.phone.length > 15 ||
      formData.value.phone.length < 8
    ) {
      phoneValidationCheckResult.value = false;
      phoneCheckResultMessage.value = Util.getLocaleTxt(
        t,
        "common_phoneLengthError"
      );
    } else {
      phoneValidationCheckResult.value = true;
      phoneCheckResultMessage.value = "";
    }
  }

  // ????????? ???????????? ????????? ??????
  if (target == "phoneAuthCode" && formData.value.phoneAuthCode != "") {
    if (formData.value.phoneAuthCode.length != 6) {
      phoneAuthCodeValidationCheckResult.value = false;
      phoneAuthCodeCheckResultMessage.value = Util.getLocaleTxt(
        t,
        "common_authCodeFormatError"
      );
    } else {
      phoneAuthCodeValidationCheckResult.value = true;
      phoneAuthCodeCheckResultMessage.value = "";
    }
  }
}

// ?????? ??????
function selectCountry(item: CountryType | null) {
  // item null ??????
  if (item === null) {
    Util.openAlertModal(stores, "Country error!");
    return false;
  }
  // ?????? ?????? div??? disabled?????? ?????????, ????????? UI??? select??? ???????????? ??????
  // ?????? ???????????? ?????? ????????? ????????? ?????? ???????????? ?????? ??????
  if (phoneAuthCodeDisabled.value == false) {
    formData.value.phone = "";
    resetPhoneAuthCode();
  }
  country.value = item;
  formData.value.country = item;
}

// ????????? ?????? ?????? ?????? ??????
function phoneBtnClick() {
  // ????????? ????????? ?????? ??????
  checkInputValidity("phone");

  if (formData.value.country.code.trim() == "") {
    activeCountryDropdown.value = true;
    return;
  }

  // ?????? ????????? ??????
  if (formData.value.phone == "" || phoneValidationCheckResult.value == false) {
    document.getElementById("phone-input")?.focus();
    return;
  }

  asyncRequestPhoneAuth();
}

// ????????? ???????????? ???????????? ?????????
const asyncRequestPhoneAuth = asyncDebounce(requestPhoneAuth);

// ????????? ????????????
async function requestPhoneAuth() {
  console.log(formData.value.country.code.toUpperCase(), formData.value.phone);
  try {
    isLoading.value = true;

    await api.auth.requestPhoneNumberVerification({
      country_code: formData.value.country.code,
      phone_number: formData.value.phone,
      verification_type: "find_now",
    });

    // ????????? ?????? ????????? ????????????
    phoneDisabled.value = true;
    // ???????????? ?????? ?????? ????????? ??????
    phoneBtnText.value = Util.getLocaleTxt(t, "common_requestCodeAgain");
    // ???????????? ????????? ?????????
    phoneAuthCodeDisabled.value = false;
    // ?????? ????????? ?????? (?????? ???????????? ???, ???????????? ???????????? ????????? ??????????????? ????????????)
    timer.value = 300000;
    // ????????? ?????? ???????????? ?????????
    phoneAuthCodeCheckTryCount.value = 0;
    // ???????????? ?????? ????????? ??????
    showPhoneAuthTimer.value = true;
    // ????????? ???????????? ??????????????? ????????? ??????
    document.getElementById("phone-authcode-input")?.focus();

    Util.openInfoModal(stores, Util.getLocaleTxt(t, "common_codeSentToPhone"));
  } catch (e: any) {
    const error = extractError(e);
    // appStore.isLoading = false;
    // invalidVerificationRequestError: 453 ?????? --> dlal
    if (error.status === 455)
      Util.openAlertModal(
        stores,
        Util.getLocaleTxt(t, "findemail_noPhoneError")
      );
    else Util.openAlertModal(stores, error.status);
  } finally {
    // appStore.isLoading = false;
    isLoading.value = false;
  }
}

// ????????? ???????????? ??????
function resetPhoneAuthCode() {
  // ????????? ????????? ????????? ???????????? ??????????????? ?????? ?????? ??????(????????? ?????? ????????? @end ??????????????? ???????????? ?????????)
  if (formData.value.isPhoneAuthorized == true) return;

  // ????????? ????????? placeholder ?????????
  phonePlaceholder.value = Util.getLocaleTxt(t, "common_phonePlaceholder");
  // ????????? ????????? ??? ?????? ?????????
  phoneDisabled.value = false;
  // ???????????? ?????????
  formData.value.phoneAuthCode = "";
  // ?????? ???????????? ?????????
  phoneAuthCodeCheckTryCount.value = 0;
  // ???????????? ????????? ????????????
  phoneAuthCodeDisabled.value = true;
  // ?????? ????????? ??????
  timer.value = 0;
  // ???????????? ?????? ????????? ??????
  showPhoneAuthTimer.value = false;
  // ???????????? ????????? ????????? ??????
  phoneAuthCodePlaceholder.value = Util.getLocaleTxt(t, "common_inputAuthCode");
  // ????????? ??????????????? ????????? ??????
  document.getElementById("phone-input")?.focus();
}

// ????????? ???????????? ???????????? ?????? ??????
function phoneAuthCodeBtnClick() {
  // ????????? ???????????? ????????? ?????? ??????
  checkInputValidity("phoneAuthCode");

  // ?????? ????????? ??????
  if (
    formData.value.phoneAuthCode == "" ||
    phoneAuthCodeValidationCheckResult.value == false
  ) {
    document.getElementById("phone-authcode-input")?.focus();
    return;
  }

  // ???????????? ?????????????????? ??????
  phoneAuthCodeCheckTryCount.value = phoneAuthCodeCheckTryCount.value + 1;

  asyncRequestPhoneAuthCodeAuth();
}

// ????????? ???????????? ???????????? ???????????? ?????????
const asyncRequestPhoneAuthCodeAuth = asyncDebounce(requestPhoneAuthCodeAuth);

// ????????? ???????????? ????????????
async function requestPhoneAuthCodeAuth() {
  try {
    isLoading.value = true;

    await api.auth.confirmPhoneNumVerification({
      country_code: formData.value.country.code,
      phone_number: formData.value.phone,
      auth_code: formData.value.phoneAuthCode,
    });

    // ????????? ?????? ?????? ??????
    formData.value.isPhoneAuthorized = true;

    // ????????? ???????????? ?????? ????????????
    phoneBtnText.value = Util.getLocaleTxt(t, "common_authComplete");
    phoneAuthCodeBtnText.value = Util.getLocaleTxt(t, "common_authComplete");
    phoneAuthCodeDisabled.value = true;
    timer.value = 0;
    showPhoneAuthTimer.value = false;

    Util.openInfoModal(
      stores,
      Util.getLocaleTxt(t, "common_completePhoneAuth")
    );
  } catch (e) {
    const error = extractError(e);
    // appStore.isLoading = false;
    // invalidVerificationRequestError: 453 ??????
    if (error.status === 453)
      Util.openAlertModal(stores, Util.getLocaleTxt(t, "common_wrongAuthCode"));
    else Util.openAlertModal(stores, error.status);

    // ?????? ?????? ?????? ?????? 5????????? ????????? ??????????????? ????????? ???????????? ????????????, ???????????? ?????? ????????? ??????
    if (phoneAuthCodeCheckTryCount.value == 5) {
      resetPhoneAuthCode();
      return;
    }
  } finally {
    isLoading.value = false;
  }
}

// ????????? ?????? ?????? ????????? ??????
function checkSubmitStatus() {
  // console.log("????????????");
  if (formData.value.isPhoneAuthorized && serviceTypeValue.value.value)
    submitDisabled.value = false;
  else submitDisabled.value = true;
}

// ????????? ?????? ?????? ??????
async function onClickFindEmailBtn() {
  try {
    isLoading.value = true;

    let body = {
      join_type: serviceTypeValue.value.value,
      country_code: formData.value.country.code.toUpperCase(),
      phone_num: formData.value.phone,
    };
    console.log(body);
    let response = await asyncFindEmail(body);
    console.log(response);

    modalStore.infoModal.alert = false;
    modalStore.infoModal.desc = Util.getLocaleTxt(
      t,
      "findemail_searchResultMsg"
    ).replace("$email$", response?.data?.detail);
    modalStore.infoModal.title = Util.getLocaleTxt(
      t,
      "findemail_searchResultTitle"
    );
    modalStore.infoModal.buttonType = "Y";
    modalStore.infoModal.yesButtonText = Util.getLocaleTxt(
      t,
      "findemail_return"
    );
    modalStore.infoModal.yesButtonFunc = () => {
      modalStore.infoModal.hide();
    };
    modalStore.findEmailModal.hide();
    modalStore.infoModal.show();
  } catch (e) {
    const error = extractError(e);
    // appStore.isLoading = false;
    // ??????????????? ???????????? ?????? ????????? 404???
    if (error.status === 404)
      Util.openAlertModal(
        stores,
        Util.getLocaleTxt(t, "findemail_typeMissMatchError")
      );
    else Util.openAlertModal(stores, error.status);
  } finally {
    isLoading.value = false;
  }
}
const asyncFindEmail = asyncDebounce(api.auth.requestFindEmail);

// ????????? ?????? ?????? ????????? ???
function getCountryItem(code: string): CountryType | null {
  let selectedCountry: CountryType | null = null;
  countries.value.forEach((item: CountryType) => {
    if (item.code.toUpperCase() == code) selectedCountry = item;
  });
  return selectedCountry;
}

// formData??? ????????? ?????? ???????????? ?????? ?????? ??????
watch([formData.value, serviceTypeValue], (newValue, oldValue) => {
  checkSubmitStatus();
});

onMounted(() => {
  // ???????????? ?????? ?????????, ???????????? ????????? ?????? ?????? ????????? ????????? ??????
  let lang = appStore.lang;

  if (lang == "KO") {
    selectCountry(getCountryItem("KR"));
  } else if (lang == "JA") {
    selectCountry(getCountryItem("JP"));
  } else if (lang == "EN") {
    selectCountry(getCountryItem("US"));
  } else {
    console.log("invalid appStore.lang");
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/login_outsourcing.scss";
@import "@/styles/resetPassword_outsourcing.scss";
@import "@/styles/global_outsourcing.scss";
@import "@/styles/breakpoint";
.modal {
  z-index: 1001;
}

.modal-content {
  overflow: visible;
}

.navbar-dropdown {
  margin-top: 0.0625rem;
  border: none;
  padding-top: 0.375rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  overflow-y: scroll;
  height: 10.375rem;
  background: #fff !important;
  z-index: 100000000000000000;
  position: absolute;
  width: max-content;

  .navbar-item {
    display: flex;
    flex-direction: column;
    padding: 0.375rem;
    height: 2rem;
    &:hover {
      background: #f6f7f9 !important;
      border-radius: 0.25rem;
    }
    p {
      width: 100%;
      text-align: left;
      font-size: 0.875rem;
      padding-bottom: 0 !important;
      color: #212037;
      margin: 0;
    }
  }
  .item__country {
    // margin-bottom: 0.625rem;
    border: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 2rem;
    @media only screen and (max-width: 36.375rem) {
      width: 2.8125rem;
    }

    img {
      position: relative !important;
      top: 0 !important;
      left: 0 !important;
      // width: 100%;
      // height: 100%;
      // object-fit: cover;
      // @media only screen and (max-width: 36.375rem) {
      //   width: auto;
      //   height: auto;
      //   margin-top: -0.625rem;
      // }
    }
    span {
      font-weight: 400;
      font-size: 0.875rem;
    }
    .nameCountry {
      color: #212037;
      margin: 0 0.625rem;
    }
    .dial_code {
      color: #7c7f90;
    }
  }
}

.navbar-item,
.navbar-link {
  img {
    left: 0.25rem !important;
    top: 30% !important;
  }

  line-height: 100%;
  padding: 0.3125rem;
  background-color: rgba(255, 255, 255, 0) !important;

  // &:hover {
  //   background-color: #fff !important;
  // }
}
.navbar-link:not(.is-arrowless)::after {
  border-color: #212037;
  margin-top: -0.25rem;
  right: 0.625rem;
}
.field:not(:last-child) {
  margin-bottom: 0;
}
.navbar-item,
.has-dropdown,
.is-hoverable {
  border: 0.0625rem solid #f1f1f1;
  border-radius: 0.375rem;
  height: 3.25rem;
  width: 27%;
  @media only screen and (max-height: $mobile) {
    width: 100%;
  }
  a {
    width: 100% !important;
    display: flex;
    color: #7c7f917a;
    font-size: 0.875rem;
    height: 100%;
    align-items: center;
    // &:hover {
    //   color: #7c7f90 !important;
    // }
  }
}
.select__cout {
  &:hover {
    color: #7c7f90 !important;
  }
}
.selected__cout {
  &:hover {
    color: rgb(33, 32, 55) !important;
  }
}
.select__cout:active {
  box-shadow: none !important;
  border-color: #5c6bc0 !important;
}

.select-signupEmail {
  color: #13131599 !important;
  padding-left: 0.625rem !important;
  &:hover {
    color: #13131599 !important;
  }
}
.selected-signupEmail {
  color: #000 !important;
  &:hover {
    color: #000 !important;
  }
}
.px-2 {
  text-align: left;
  padding: 0 !important;
  .services {
    padding-top: 1.25rem;
    // padding-top: 0.4375rem;
    h3 {
      padding-bottom: 0.5rem;
    }
  }
  .content-data {
    .field {
      .select,
      select {
        height: 3.25rem;
        width: 100%;
        color: #7c7f91 !important;
      }
      .select:not(.is-multiple):not(.is-loading)::after {
        border-color: #7c7f91;
      }
    }
    .field-doubles {
      display: flex;
      justify-content: space-between;
      .control {
        width: 100%;
        input {
          border-color: #dbdbdb;
          padding-left: 0.625rem;
          color: #7c7f91;
        }
      }
      .control-button {
        position: absolute;
        right: 0.625rem;
        text-align: right;
        top: 0.625rem;
        width: max-content;
      }
      button {
        width: max-content;
        background: #e0e0e0;
        border-radius: 0.25rem;
        color: #bdbdbd;
        font-size: 0.875rem;
        width: 6.25rem;
        height: 2.25rem;
      }
    }
  }
  .select-country {
    display: flex;
    justify-content: space-between;
    // margin-bottom: 0.625rem;
    .navbar-item {
      border-radius: 0.375rem;
      .selected__cout {
        &:hover {
          color: rgb(33, 32, 55) !important;
        }
      }
      .navbar-link {
        &:hover {
          color: #7c7f90;
        }
      }
    }
    @media only screen and (max-width: 582px) {
      flex-direction: column;
    }
    option {
      span:nth-child(1) {
        // color: #212037 !important;
        &:hover {
        }
      }
      span:nth-child(2) {
        // color: #7c7f90 !important;
      }
    }
    .field {
      width: 27%;
      @media only screen and (max-width: 36.375rem) {
        width: 100% !important;
      }
    }
    .field-doubles {
      width: 70%;
      @media only screen and (max-width: 36.375rem) {
        width: 100%;
      }
    }
  }
}
</style>
