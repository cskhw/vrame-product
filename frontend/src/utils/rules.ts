// 이메일 유효성 인증
export function checkEmailVaild(str: string) {
  let result = false;
  let regExp =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (regExp.test(str)) result = true;
  console.log(result);
  return result;
}
// 비밀번호 유효성 인증
export function checkPasswordVaild(str: string) {
  let result = false;
  let regExp =
    /^(?=.*[a-zA-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?=.*[0-9]).{8,20}$/;
  if (regExp.test(str)) result = true;

  return result;
}
// 이름 유효성 인증
export function checkNameVaild(str: string) {
  let result = false;
  let regExp =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (regExp.test(str)) result = true;

  return result;
}
// 닉네임 유효성 인증
export function checkNicknameVaild(str: string) {
  let result = false;
  let regExp =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (regExp.test(str)) result = true;

  return result;
}
// 전화번호 유효성 인증
export function checkPhoneVaild(str: string) {
  let result = false;
  let regExp = /^[0-9]+$/;

  if (regExp.test(str)) result = true;

  return result;
}

// 영어 유효성 인증
export function checkEnVaild(str: string) {
  let result = false;
  let regExp =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (regExp.test(str)) result = true;

  return result;
}

// 한글 유효성 인증
export function checkKoVaild(str: string) {
  let result = false;
  let regExp =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (regExp.test(str)) result = true;

  return result;
}

// 영한 유효성 인증
export function checkEnKoVaild(str: string) {
  let result = false;
  let regExp =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  if (regExp.test(str)) result = true;

  return result;
}
