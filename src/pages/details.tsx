import { redirect, useLoaderData, useParams } from "react-router-dom";
import { Button } from "../components/button";
import { formDataProps } from "./create";

export default function Details() {
  const user = useLoaderData() as formDataProps;
  //todo: useParam/ useRef / redirect 찾아보기
  const { id } = useParams();

  const handlelModify = () => {
    const response = window.confirm("수정하시겠습니까?");

    if (response) {
      debugger;
      window.location.replace(`/edit/${id}`);
    }
  };

  const handleDelete = () => {};

  const handleClose = () => {};

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
