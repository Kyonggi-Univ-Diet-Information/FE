import { Outlet } from "react-router-dom";
import { Header } from "~/widgets/menu/ui";

export default function AppLayout() {
  return (
    <div className="flex size-full flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
