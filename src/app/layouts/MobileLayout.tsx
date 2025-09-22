import { Outlet, useNavigate } from "react-router-dom";

export default function MobileLayout() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-gray-50">
      <div className="relative h-full w-full max-w-[540px]">
        <div className="inset-0 flex h-14 max-w-[540px] items-center justify-between bg-white px-4">
          <button
            onClick={handleGoBack}
            className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100"
            aria-label="뒤로가기"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-700"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-lg font-semibold">리뷰</span>
          <div className="w-9" />
        </div>
        <div className="p-2 md:p-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
