import { useLoaderData } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { ErrorText } from "../components/texts";
import { formDataProps } from "./create";

export default function Edit() {
  const user = useLoaderData() as formDataProps;
  console.log("user", user);
  //todo: 커스텀 훅으로 정리
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

    // 긴급 todo: contact를 id로 수정하기
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users")!)
      : [];
    const updatedUsers = users.map((user: any) => {
      if (user.contact === data.contact) {
        return { ...user, ...data };
      }
      return { ...user };
    });

    console.log("updatedUsers", updatedUsers);

    const result = window.confirm("저장하시겠습니까?");

    if (result) {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      window.alert("저장되었습니다.");
    }
  };

  // todo: 커스텀 훅으로 정리
  const handleClose = () => {
    const result = window.confirm("수정하기를 그만두시겠습니까?");

    if (result) {
      window.location.replace("/");
    }
  };
  return (
    //todo: form tag 컴포넌트로 정리
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div>
        <Input
          label="이름"
          id="name"
          name="name"
          placeholder="이름을 입력해주세요"
          defaultValue={user.name}
        />
        <ErrorText id="name_guide" />
      </div>
      <div>
        <Input
          label="연락처"
          id="contact"
          name="contact"
          placeholder="숫자만 입력해주세요"
          defaultValue={user.contact}
        />
        <ErrorText id="contact_guide" />
      </div>
      <div>
        <Input
          label="이메일"
          id="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          defaultValue={user.email}
        />
        <ErrorText id="email_guide" />
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={handleClose}>닫기</Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  );
}
