import type { IUser } from "@/types/user";
import { defineStore } from "pinia";

export default defineStore("user", {
  state: () => ({
    user: {} as IUser,
  }),
  getters: {},
  actions: {},
});
