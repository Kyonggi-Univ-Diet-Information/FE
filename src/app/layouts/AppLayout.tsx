import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { Header } from "~/widgets/menu/ui";
import { useLanguageStore } from "~/shared/store";

export default function AppLayout() {
  const [searchParams] = useSearchParams();
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    const langParam = searchParams.get("lang");
    if (langParam === "ko" || langParam === "en") {
      setLanguage(langParam);
    }
  }, [searchParams, setLanguage]);

  return (
    <div className="flex size-full flex-col">
      <Header />
      <Outlet />
    </div>
  );
}
