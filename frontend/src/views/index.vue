<template>
  <div class="main">
    <!-- appbar -->
    <r-appbar style="max-height: 32px">
      <div style="width: 40px; height: 40px">
        <!-- main icon -->
        <r-icon
          link
          :iconStyle="{ width: '2rem', height: '2rem' }"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          :icon="mdiReorderHorizontal"
          @click="isDrawer = !isDrawer"
        >
        </r-icon>
      </div>
      <r-btn
        to="/"
        :style="{
          width: '60px',
          padding: 0,
        }"
        hover-bg-color="white"
      >
      </r-btn>
    </r-appbar>
    <!-- drawer -->
    <r-drawer v-model="isDrawer">
      <r-list
        link
        :icon="{ icon: mdiAccount, color: 'rgba(0,0,0,0.8)', to: '/sappbar' }"
        hover-color="gray"
        to="/login"
        ><template #title
          ><span style="font-weight: bold">로그인</span>하세요</template
        ></r-list
      >
      <r-list
        link
        :icon="{ icon: mdiListBox, color: 'rgba(0,0,0,0.8)', to: '/sappbar' }"
        hover-color="gray"
        :children="drawerChildren"
        title="components"
        ><template #title>카테고리</template></r-list
      >
    </r-drawer>
    <!-- main -->
    <r-main>
      <router-view></router-view>
    </r-main>
  </div>
</template>
<script setup lang="ts">
import type { TSList } from "vrame";
import {
  mdiListBox,
  mdiReorderHorizontal,
  mdiAccount,
  mdiSquareRoot,
  mdiTablet,
  mdiHanger,
  mdiBowl,
  mdiFood,
  mdiDesk,
  mdiPencil,
  mdiWalletTravel,
} from "@mdi/js";
import { ref } from "vue";

const isDrawer = ref(false);

const drawerChildren = ref<TSList[]>([
  {
    icon: { icon: mdiSquareRoot, color: "gray" },
    hoverColor: "gray",
    title: "컴퓨터",
    to: "computer",
    link: true,
  },
  {
    icon: { icon: mdiTablet, color: "gray" },
    hoverColor: "gray",
    title: "태블릿",
    to: "아웃도어",
    link: true,
  },
  {
    icon: { icon: mdiListBox, color: "gray" },
    hoverColor: "gray",
    title: "자동차",
    to: "",
    link: true,
  },
  {
    icon: { icon: mdiDesk, color: "gray" },
    hoverColor: "gray",
    title: "가구",
    to: "r-list",
    link: true,
  },
  {
    icon: { icon: mdiFood, color: "gray" },
    hoverColor: "gray",
    title: "식품",
    to: "r-icon",
    link: true,
  },
  {
    icon: { icon: mdiBowl, color: "gray" },
    hoverColor: "gray",
    title: "생활",
    to: "mdiLifebuoy",
    link: true,
  },
  {
    icon: { icon: mdiHanger, color: "gray" },
    hoverColor: "gray",
    title: "패션",
    to: "r-btn",
    link: true,
  },

  {
    icon: { icon: mdiPencil, color: "gray" },
    hoverColor: "gray",
    title: "사무",
    to: "",
    link: true,
  },
  {
    icon: { icon: mdiWalletTravel, color: "gray" },
    hoverColor: "gray",
    title: "여행",
    to: "",
    link: true,
  },
]);
</script>
<style lang="scss" scoped></style>
