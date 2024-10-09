import React from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { ErrorText } from "../components/texts";

//todo: 타입 정리
export interface formDataProps {
  name: string;
  contact: string;
  email: string;
}

export default function Create() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData) as unknown as formDataProps;

    const EMPTY_MESSAGE = "을(를) 입력해주세요";

    const checkEmpty = (data: any, key: string) => {
      const target = document.querySelector(`label[for=${key}]`)?.innerHTML;

      const isValid = data[key]?.trim().length > 0 ? true : false;
      const guideText = target + EMPTY_MESSAGE;

      return { isValid, guideText };
    };

    const checkContact = (data: any, key: string) => {
      const reg = /^\d{10,11}$/g;
      const isValid = reg.test(data[key].trim());
      const guideText = "-(가운데 바)를 제외한 숫자만 입력해주세요";

      return { isValid, guideText };
    };

    const checkEmail = (data: any, key: string) => {
      const reg = /\w+\@\w+\.(com)|(net)|(kr)/g;
      const isValid = reg.test(data[key].trim());
      const guideText = "이메일을 양식에 맞게 입력해주세요";

      return { isValid, guideText };
    };

    const ValidationList: { [index: string]: any[] } = {
      name: [checkEmpty],
      contact: [checkEmpty, checkContact],
      email: [checkEmpty, checkEmail],
    };

    for (const key in data) {
      for (const func of ValidationList[key]) {
        const { isValid, guideText } = func(data, key);

        if (isValid) {
          document.getElementById(`${key}_guide`)!.innerHTML = "";
        } else {
          document.getElementById(`${key}_guide`)!.innerHTML = guideText;
          return;
        }
      }
    }

    const result = window.confirm("저장하시겠습니까?");
    const current = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users")!)
      : [];

    if (result) {
      localStorage.setItem("users", JSON.stringify([...current, data]));
      window.alert("저장되었습니다.");
    }
  };

  const handleClose = () => {
    const result = window.confirm("수정하기를 그만두시겠습니까?");

    if (result) {
      window.location.replace("/");
    }
  };

  return (
    <div className="m-auto w-1/2">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div>
          <Input
            label="이름"
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
          />
          <ErrorText id="name_guide" />
        </div>
        <div>
          <Input
            label="연락처"
            id="contact"
            name="contact"
            placeholder="숫자만 입력해주세요"
          />
          <ErrorText id="contact_guide" />
        </div>
        <div>
          <Input
            label="이메일"
            id="email"
            name="email"
            placeholder="이메일을 입력해주세요"
          />
          <ErrorText id="email_guide" />
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={handleClose}>닫기</Button>
          <Button type="submit">저장</Button>
        </div>
      </form>
    </div>
  );
}

// 저장 버튼 클릭 시
// 1. validation 검사
// 2. validation 검사 true 일 경우
// '저장하시겠습니까?' 컨펌 -> true일 경우 저장하고 상세 페이지로,
// false 일 경우 창 닫고 페이지 유지

// 3. validation 검사 false 일 경우 -> alert 창 띄우고 해당 아이템에 포커스 이동 및 안내 문구 표시
// 4. 닫기 클릭 시 수정하기를 그만하시겠습니까? confirm -> true 일 경우 조회페이지로 이동
// false일 경우 현재 페이지 유지

// 이름: 빈 값 체크, 연락처: 빈 값 체크, 자릿수 체크, 이메일: 빈 값 체크, 양식 체크
// 체크할 항목의 이름을 키값으로 하여 유효성 체크리스트 객체를 만든다
// 각 항목의 값을 배열로, 유효성을 검사하는 핸들러 함수가 포함된다
// form data는 for...in 문을 이용하여 유효성 검사를 한다
// for...in 문을 순회하는 동안 property를 체크리스트 객체의 키로 활용, 해당 배열을 순회한다
// 배열 순회시 각 항목의 핸들러 함수에 property와 data[property]를 전달한다
// 핸들러 함수는 유효성 체크 결과(boolean)와 안내 문구를 반환한다
// 유효성 체크 결과가 true일 시 안내 문구를 반환한다

//todo:
//id 생성하여 동일한 id인지 체크
//some, includes 차이, 사용법 (동일한 아이디 중복 체크시)
//as unknown
//window.location.href / window.location.replace 차이, react router dom 에서는?
//추가,수정 페이지를 함께 쓰려고 했으나 url이 다를 수 있어 각각 다른 페이지로 분리했는데, (수정페이지에서는 id를 받아야 하나, 추가는 id 없음)
//url을 옵셔널로 받는다던가 더 좋은 방법이 있을까?
