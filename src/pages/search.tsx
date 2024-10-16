import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { formDataProps } from "./create";

interface headerProps {
  className?: string;
  name?: string;
  key?: keyof formDataProps;
  id?: any;
  width?: string;
  render?: (d?: any, i?: any, id?: any, onChange?: any) => React.ReactNode;
  onRow?: (args: string) => void;
}

export default function Search() {
  //todo: useRef 찾아보기,
  const [data, setData] = useState(useLoaderData() as formDataProps[]);
  const allCheckboxRefs = useRef<any[]>([]);
  const checkboxRefs = useRef<any[]>([]);
  const textsRef = useRef(null);

  const header: headerProps[] = [
    {
      className: "text-center",
      name: "체크박스",
      width: "50px",
      render: (refs, index, id, onChange) => {
        return (
          <input
            type="checkbox"
            ref={(ref) => {
              if (refs) {
                refs.current[index] = ref;
              }
            }}
            value={id}
            onChange={({ target }) => {
              refs.current[index].checked = target.checked;
              onChange && onChange(target.checked);
            }}
          />
        );
      },
    },
    {
      name: "이름",
      width: "120px",
      key: "name",
    },
    {
      name: "연락처",
      width: "200px",
      key: "contact",
    },
    {
      name: "이메일",
      width: "300px",
      key: "email",
    },
    {
      name: "버튼",
      width: "100px",
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
    const users = localStorage.getItem("users");
    const data = users ? JSON.parse(users) : [];
    setData(data);
    textsRef.current = null;
  };

  const handleAdd = () => {
    const response = window.confirm("추가하시겠습니까?");

    if (response) {
      window.location.href = "/create";
    }
  };

  //todo: window.alert / window.confirm useReducer 이용한 커스텀 훅으로 만들기
  //todo: 수정 삭제 기능 useReducer 이용한 커스텀 훅으로 만들기

  const handleEdit = () => {
    const result = checkboxRefs.current.filter((cb) => cb.checked === true);

    if (!result.length) {
      window.alert("수정할 대상을 선택해주세요");
    } else if (result.length > 1) {
      window.alert("수정할 대상을 한 개만 선택해주세요");
    } else {
      const id = result[0].value;
      console.log("id", id);
      const response = window.confirm("선택한 대상을 수정하시겠습니까?");
      if (response) {
        window.location.href = `/edit/${id}`;
      }
    }
  };

  const handleDelete = () => {
    const result = checkboxRefs.current.filter((cb) => cb.checked === true);

    if (!result.length) {
      window.alert("삭제할 대상을 선택해주세요");
    } else {
      const response = window.confirm("정말로 삭제하시겠습니까?");

      if (response) {
        const idList = result.map((re) => re.value);

        const users = data.filter((d) =>
          idList.every((id) => Number(d.id) !== Number(id))
        );

        //todo: 로컬스토리지 저장, setdata 갱신 따로 하는데,
        //한번에 갱신될 수 있는 방법 찾기
        localStorage.setItem("users", JSON.stringify(users));
        setData(users);
      }
    }
  };

  const handleRow = (userId: string | number | null) => {};

  const handleAllCheck = (checked: boolean) => {
    checkboxRefs.current.forEach((cb) => (cb.checked = checked));
  };

  const handleCheck = () => {
    const unchecked = checkboxRefs.current.some((cb) => cb.checked === false);
    allCheckboxRefs.current[0].checked = !unchecked;
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
          <Button onClick={handleAdd}>추가</Button>
          <Button onClick={handleEdit}>수정</Button>
          <Button onClick={handleDelete}>삭제</Button>
        </div>
      </div>

      {/* todo: table 수정 */}
      <table>
        <colgroup>
          {header.map(({ width, className }, index) => {
            return <col className={className} key={index} width={width} />;
          })}
        </colgroup>

        <thead>
          <tr>
            {header.map(({ className, render, name }) => {
              return (
                <td className={`border ${className}`} key={name}>
                  {render
                    ? render(allCheckboxRefs, 0, "all", handleAllCheck)
                    : name}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => {
            return (
              <tr
                // ref={(ref) => {
                //   if (ref) {
                //     checkboxRefs.current[index] = ref;
                //   }
                // }}
                key={`${index}${d.name}`}
                // onClick={() => handleRow(d.id ?? null)}
              >
                {header.map(({ className, key, render }, idx) => {
                  return (
                    <td className={`border ${className}`} key={idx}>
                      {render
                        ? render(checkboxRefs, index, d.id, handleCheck)
                        : d[key!]}
                    </td>
                  );
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
