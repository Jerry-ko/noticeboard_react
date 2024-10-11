import { useLoaderData, useParams, useRouteLoaderData } from "react-router-dom";
import { Button } from "../components/button";
import { formDataProps } from "./create";

export default function Details() {
  const currentUsers = useRouteLoaderData("root");
  const user = useLoaderData() as formDataProps;
  //todo: useParam/ useRef / redirect 찾아보기
  const { userId } = useParams();

  const handlelModify = () => {
    const response = window.confirm("수정하시겠습니까?");

    if (response) {
      window.location.replace(`/edit/${userId}`);
    }
  };

  const handleDelete = () => {
    const users = JSON.parse(localStorage.getItem("users")!);

    const response = window.confirm("삭제하시겠습니까?");

    if (response) {
      const result = users.filter((user: formDataProps) => {
        //todo: id string/number 타입 일치
        return user.id !== Number(userId);
      });
      debugger;

      localStorage.setItem("users", JSON.stringify(result));
      window.alert("삭제되었습니다.");
      window.location.replace("/");
    }
  };

  const handleClose = () => {
    const response = window.confirm("이 페이지를 벗어나시겠습니까?");

    if (response) {
      window.location.replace("/");
    }
  };

  return (
    <div>
      <div>
        <span>이름</span> {user.name}
      </div>
      <div>
        <span>연락처</span> {user.contact}
      </div>
      <div>
        <span>이메일</span> {user.email}
      </div>

      <Button onClick={handlelModify}>수정</Button>
      <Button onClick={handleDelete}>삭제</Button>
      <Button onClick={handleClose}>닫기</Button>
    </div>
  );
}
