import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation();

  let pageTitle = "";
  switch (pathname) {
    case "/":
      pageTitle = "조회";
      break;
    case "/update":
      pageTitle = "수정";
      break;
    case "/details":
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
