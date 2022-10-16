import auth from "@/api/service/auth";
import draft from "@/api/service/draft";
import join from "@/api/service/join";
import management from "@/api/service/management";
import preference from "@/api/service/preference";
import nlp from "./service/nlp";
import payment from "./service/payment";

export default {
  auth: auth,
  management: management,
  preference: preference,
  payment: payment,
  join: join,
  draft: draft,
  nlp: nlp,
};
