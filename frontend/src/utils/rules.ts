const emailExp =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i; // 이메일

const spExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; // 특수문자 체크

const enExp = /^[a-zA-z]+$/; // 영어

const lowerEnExp = /^[a-z]+$/; // 영문 소문자만
const upperEnExp = /^[A-Z]+$/; // 영문 대문자만

const koExp = /^[가-힣]+$/; // 한글
const enKoExp = /^[가-힣a-zA-Z]+$/; // 한글 + 영문만

const reg_id1 = /^[a-z0-9_-]{4,20}$/; // 소문자 + 숫자 + 언더바/하이픈 허용 4~20자리
const reg_id2 = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,19}$/; // 반드시 영문으로 시작 숫자+언더바/하이픈 허용 4~20자리

const reg_pw1 = /^[a-z0-9_-]{6,18}$/; // 단순 6~18자리
const reg_pw2 = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/; // 문자와 특수문자 조합의 6~24 자리
const reg_pw3 = /(?=.*\d)(?=.*[a-zA-ZS]).{8,}/; // 문자, 숫자 1개이상 포함, 8자리 이상
const reg_pw4 =
  /^(?=.*[a-zA-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?=.*[0-9]).{8,20}$/; // 8~20자리 숫자, 영문, 특수문자

const reg_phone_num = /^[0-9]{8,13}$/; // 전화번호 숫자만
const reg_mobile = /^\d{3}-\d{3,4}-\d{4}$/; // 휴대폰 번호
const reg_tel = /^\d{2,3}-\d{3,4}-\d{4}$/; // 일반 전화 번호

const reg_url = /^(https?:\/\/)?([a-z\d\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/; // URL 검사식
const reg_privacy_num = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/; // 주민등록번호 정규식

// 이메일 검증
export const checkEmailValidation = (str: string) => emailExp.test(str);

// 비밀번호 검증
export const checkPasswordValidation = (str: string) => reg_pw4.test(str);

// 이름 검증
export function checkEnOrKoValidation(
  str: string,
  start?: number,
  end?: number
) {
  const isEn = enExp.test(str);
  const isKo = koExp.test(str);
  if (!(start || end)) {
    // 시작, 끝 값 없으면
    return isEn || isKo;
  } else {
    // 시작, 끝 중 하나라도 있으면
    if (end) {
      // 둘 다 있으면
      if (isEn) {
        const reg = new RegExp(`^[a-zA-Z]+${`{${start},${end}}`}$`);
        return reg.test(str);
      } else if (isKo) {
        const reg = new RegExp(`^[가-힣]+${`{${start},${end}}`}$`);
        console.log(`^[가힣]+${`{${start},${end}}`}$`);
        return reg.test(str);
      } else return false;
    } else {
      // 시작만 있으면
      if (isEn) {
        const reg = new RegExp(`^[a-zA-Z]+${`{${start}`},}$`);
        return reg.test(str);
      } else if (isKo) {
        const reg = new RegExp(`^[가-힣]+${`{${start}`},}$`);
        return reg.test(str);
      } else return false;
    }
  }
}

// 영어 and 한글 검증
export function checkEnAndKoVaildation(
  str: string,
  start?: number,
  end?: number
) {
  if (!(start || end)) {
    const reg = new RegExp(`^[가-힣a-zA-Z]+$`);
    return reg.test(str);
  } else {
    // 시작, 끝 중 하나라도 있으면
    if (end) {
      // 둘 다 있으면
      const reg = new RegExp(`^[가-힣a-zA-Z]+${`{${start},${end}}`}$`);
      console.log(`^[가힣]+${`{${start},${end}}`}$`);
      return reg.test(str);
    } else {
      // 시작만 있으면
      const reg = new RegExp(`^[가-힣a-zA-Z]+${`{${start},}`}$`);
      console.log(`^[가힣]+${`{${start},${end}}`}$`);
      return reg.test(str);
    }
  }
}
// 전화번호 검증
export function checkPhoneVaild(str: string) {
  let result = false;
  let regExp = /^[0-9]+$/;

  if (regExp.test(str)) result = true;

  return result;
}

// 영어 검증
export function checkEnVaild(str: string) {
  return enExp.test(str);
}

// 한글 검증
export function checkKoVaild(str: string) {
  return koExp.test(str);
}

// 영한 검증
export const checkEnKoVaild = (str: string) => enKoExp.test(str);
