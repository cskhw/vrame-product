import Cookies from "js-cookie";

export const GlobalCookies = Cookies.withAttributes({
  expires: 365,
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});
