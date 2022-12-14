<template>
  <div :class="commonTableClass" :style="{ height: height }">
    <table :bordercolor="borderColor">
      <thead v-if="header">
        <th v-for="head in header" :key="head">{{ head }}</th>
        <th v-for="button in buttons" :key="button.type">{{ button.text }}</th>
      </thead>
      <thead v-else>
        <th v-for="(item, name) in pagingItems[0]" :key="name">{{ name }}</th>
        <th v-for="button in buttons" :key="button.type">{{ button.text }}</th>
      </thead>
      <tbody
        :style="isVertical ? { width: '80%' } : {}"
        v-if="items"
        :class="link ? 'link' : ''"
      >
        <tr
          :style="isVertical ? { width: '80%' } : {}"
          v-for="row in pagingItems"
          :key="row"
          @click="onclickTd(row)"
        >
          <td v-for="item in row" :key="item">
            {{ item }}
          </td>
          <td v-for="button in buttons" :key="button.type">
            <BtnFlat
              :style="{
                position: 'absolute',
                top: '10%',
                left: '0',
                whiteSpace: 'nowrap',
              }"
              @click="onClickCustomBtn(button.type)"
              >{{ button.text }}</BtnFlat
            >
          </td>
        </tr>
      </tbody>
      <tbody v-if="!items && header">
        <tr>
          <td v-for="n in header" :key="n">-</td>
        </tr>
      </tbody>
    </table>

    <v-pagination
      v-if="pagination"
      v-model="page"
      :length="items?.length && paging ? Math.ceil(items.length / paging) : 0"
    ></v-pagination>
  </div>
</template>

<script setup lang="ts">
import BtnFlat from "@/components/btn/Flat.vue";
import { onMounted, ref, watch } from "vue";

// types
interface Props {
  header?: string[];
  items?: object[];
  paging?: number;
  pagination?: boolean;
  link?: boolean;
  vertical?: boolean;
  borderColor?: string;
  scroll?: boolean;
  buttons?: { text: string; type: string }[];
}

// props
const props = withDefaults(defineProps<Props>(), {
  borderColor: "#e0e0e0",
});

// emits
const emit = defineEmits(["clickTd", "clickBtn"]);

const commonTableClass = ref(
  "common-table d-flex flex-column justify-space-between"
);
if (props.scroll) commonTableClass.value += " scroll";
if (props.vertical) commonTableClass.value += " vertical";

// vars
const modal = ref(null);
const page = ref(1);
const isPagination = ref(props.pagination);
const height = ref("5rem");
const pagingItems = ref([]);
const isScroll = ref(false);
const items = ref(props.items);
const isVertical = ref(props.vertical);
const paging = ref(props.paging);
const header = ref(props.header);
const width = ref("");
const itemHeight = ref(37);

const onclickTd = (item) => {
  emit("clickTd", item);
};

const onClickCustomBtn = (e) => {
  emit("clickBtn", e);
};

onMounted(() => {
  /*
    ???????????? ????????????????????? ?????? ????????? ???????????? ????????? ????????? ?????????
    ???????????? ????????? ????????? ??????????????? ????????? ?????? ??????
    ???????????? ????????? ????????? ??????????????? ???????????? ?????????
  */
  // isPagination
  pagingItems.value = props.items;
  if (props.items) {
    if (paging.value && props.pagination) {
      isPagination.value = true;
      pagingItems.value = items.value.slice(
        (page.value - 1) * paging.value,
        (page.value - 1) * paging.value + paging.value
      );
      height.value = itemHeight.value * (paging.value + 1) + 64 + "px";
    } else if (paging.value) {
      height.value = itemHeight.value * (paging.value + 1) + 20 + "px";
    } else {
      height.value =
        itemHeight.value * (pagingItems.value.length + 1) + 50 + "px";
    }
  }
  if (props.scroll) isScroll.value = true;
  if (props.vertical && props.header) {
    isVertical.value = true;
    height.value = itemHeight.value * (header.value.length + 1) + "px";
    width.value = "100%";
  }
});

// ????????????????????? ?????? ????????? ????????? ???????????? ?????? ??????????????? ??????
watch(page, (newValue, oldValue) => {
  pagingItems.value = items.value.slice(
    (newValue - 1) * paging.value,
    (newValue - 1) * paging.value + paging.value
  );
});

// ???????????? ???????????? ????????? ???????????? ???????????? ?????????
watch(items, (newValue, oldValue) => {
  pagingItems.value = items.value.slice(
    (page.value - 1) * paging.value,
    (page.value - 1) * paging.value + paging.value
  );
});
</script>

<style lang="scss" scoped>
.common-table {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  &.scroll {
    overflow-y: auto;
  }
  table {
    border: 0rem;
    border-collapse: collapse;
    transition: all 0.1s;
    width: 100%;
  }
  th {
    text-align: start;
    padding: 0.625rem 0.625rem;
    color: #616161;
    font-size: 0.875rem;
    border-bottom: 0.0625rem solid #eeeeee;
    font-weight: 500;
  }
  td {
    position: relative;
    padding: 0.625rem 0.625rem;
  }
  tr {
    height: 2.3125rem;
    border-bottom: 0.0625rem solid #eeeeee;
  }
  .link {
    tr:hover {
      background-color: black;
      cursor: pointer;
    }
  }
  &.vertical {
    table {
      border-collapse: collapse;
      display: flex;
      flex-direction: row;
      thead {
        display: flex;
        flex-direction: column;
      }
      tbody {
        display: flex;
      }
      tr {
        display: block;
        border-bottom: #e0e0e0;
      }
      td {
        display: block;
        border-bottom: 0.0625rem solid #eeeeee;
      }
    }
  }
}
</style>
