import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation();
  const location = useLocation();
  console.log("location", location);

  let pageTitle;

  //todo: 수정
  switch (pathname) {
    case "/":
      pageTitle = "조회";
      break;
    case "/create":
      pageTitle = "생성";
      break;
    case `/edit/:id`:
      pageTitle = "수정";
      break;
    case "/details/:id":
      pageTitle = "상세";
      break;
    default:
      pageTitle = "상세";
  }
  return (
    <div className="mx-auto mt-5 w-[80%]">
      <p className="text-3xl">{pageTitle}</p>
      <div className="mt-12">
        <Outlet />
      </div>
    </div>
  );
}
