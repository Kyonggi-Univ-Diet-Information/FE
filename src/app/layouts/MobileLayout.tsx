import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="h-full w-full max-w-[400px] bg-white">
        <Outlet />
      </div>
    </div>
  );
}
