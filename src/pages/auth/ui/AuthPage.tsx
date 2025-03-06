import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { get, REQUEST } from "~/shared/api";
import { Loading } from "~/assets";
import { PATH } from "~/shared/constants";

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  async function fetchLogin() {
    const code = location.search.split("?code=")[1];
    try {
      const response = await get({
        request: REQUEST.fetchKakaoLogin,
        params: { code },
        format: true,
      });
      const token = response.data.token;
      if (token === undefined) setIsLoading(false);
      else {
        setIsLoading(false);
        document.cookie = `token=${token}; max-age=3600; path=/`;
        navigate(PATH.HOME);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const code = location.search.split("?code=")[1];
    if (code) {
      fetchLogin();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <section className="grid h-[100vh] w-[100vw] place-items-center">
      {isLoading ? (
        <div>
          <img src={Loading} />
          <Description>로그인 중...</Description>
        </div>
      ) : (
        <div className="flex h-fit w-fit flex-col gap-y-2">
          <Description>로그인에 실패했습니다.</Description>
          <button
            className="hover:bg-primary rounded-normal border-header-border h-[50px] w-full cursor-pointer border-[1px] bg-white text-black transition-all duration-300 hover:text-white"
            onClick={() => navigate(PATH.LOGIN)}
          >
            홈으로 돌아가기
          </button>
        </div>
      )}
    </section>
  );
}

const Description = ({ children }) => {
  return <p className="w-full text-center text-xl">{children}</p>;
};
