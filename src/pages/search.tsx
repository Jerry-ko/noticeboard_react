import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { formDataProps } from "./update";

interface headerProps {
  name?: string;
  key?: keyof formDataProps;
  width?: string;
  render?: () => React.ReactNode;
}

export default function Search() {
  //todo: loader, useLoaderData 찾아보기
  const [data, setData] = useState(useLoaderData() as formDataProps[]);
  const textsRef = useRef(null);

  const header: headerProps[] = [
    {
      name: "체크박스",
      render: () => <input type="checkbox" />,
      width: "50px",
    },
    {
      name: "이름",
      width: "80px",
      key: "name",
    },
    {
      name: "연락처",
      width: "150px",
      key: "contact",
    },
    {
      name: "이메일",
      width: "250px",
      key: "email",
    },
    {
      name: "버튼",
      render: () => {
        return (
          <div className="flex gap-2">
            <Button>수정</Button>
            <Button>삭제</Button>
          </div>
        );
      },
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataToSearh = Object.fromEntries(formData);
    //todo: 필터부분 다른 방법으로 생각해보기
    const result = data.filter((d) => {
      const results = [];
      for (const key in dataToSearh) {
        const res = dataToSearh[key] === d[key as keyof formDataProps];
        results.push(res);
      }
      return results.every((r) => r === true);
    });
    setData(result);
  };

  const handleInitialization = () => {
    //todo: loader와 동일, 커스텀훅으로 만들기(?)
    const users = localStorage.getItem("user");
    const data = users ? JSON.parse(users) : [];
    setData(data);
    textsRef.current = null;
  };

  return (
    <div>
      <form className="flex gap-2" onSubmit={handleSearch}>
        <div>
          <Input name="name" placeholder="이름을 입력해주세요" ref={textsRef} />
        </div>

        <div className="flex gap-2">
          <Button type="submit">검색</Button>
          <Button onClick={handleInitialization}>초기화</Button>
        </div>
      </form>

      <div className="flex justify-between mt-8">
        <span className="text-base">{`total: ${data.length}건`}</span>
        <div className="flex gap-2">
          <Button>추가</Button>
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </div>

      <table>
        <colgroup>
          {header.map(({ width }, index) => {
            return <col key={index} width={width} />;
          })}
        </colgroup>
        <thead>
          <tr>
            {header.map(({ render, name }) => {
              return <td key={name}>{render ? render() : name}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => {
            return (
              <tr key={`${index}${d.name}`}>
                {header.map(({ render, key }, idx) => {
                  return <td key={idx}>{render ? render() : d[key!]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

//핵심기능
//검색, 초기화
//추가,수정,삭제
//정렬
//페이지네이션
