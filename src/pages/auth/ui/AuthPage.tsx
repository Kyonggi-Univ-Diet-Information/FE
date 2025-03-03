import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { fetchKakao } from "~/shared/api";
import { Loading } from "~/assets";
import { PATH } from "~/shared/constants";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const code = location.search.split("?code=")[1];
    if (code) {
      fetchKakao(code).then((response) => {
        document.cookie = `token=${response.token}; max-age=3600; path=/`;
        setIsLoading(false);
        navigate(PATH.HOME);
      });
    } else {
      setIsLoading(false);
    }
  }, [location.search, navigate]);

  return (
    <section className="grid h-[100vh] w-[100vw] place-items-center">
      {isLoading ? (
        <div>
          <img src={Loading} />
          <Description>로그인 중...</Description>
        </div>
      ) : (
        <Description>로그인에 실패했습니다.</Description>
      )}
    </section>
  );
}

const Description = ({ children }) => {
  return <p className="w-full text-center text-xl">{children}</p>;
};
