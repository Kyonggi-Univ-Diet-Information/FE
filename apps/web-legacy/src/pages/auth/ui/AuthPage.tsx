import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { get, REQUEST } from '~/shared/api';
import { Loading } from '~/assets';
import { PATH } from '~/shared/constants';
import { useQuery } from '@tanstack/react-query';
import { setCookie } from '~/shared/utils';

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const code = location.search.split('?code=')[1];

  const [error, setError] = useState(false);

  interface LoginRes {
    token: string;
    email: string;
  }

  const fetchLogin = async () => {
    const response = await get<LoginRes>({
      request: REQUEST.fetchKakaoLogin,
      params: { code },
    });
    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    refetch: login,
  } = useQuery({
    queryKey: ['token', code],
    queryFn: fetchLogin,
    enabled: false,
  });

  useEffect(() => {
    if (code) {
      login();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.token) {
      setCookie('token', data.token);
      navigate(PATH.HOME);
    } else if (data && !data.token) {
      setError(true);
    }
  }, [data, navigate]);

  useEffect(() => {
    if (isError) {
      setError(true);
    }
  }, [isError]);

  return (
    <section className='grid h-[100vh] w-[100vw] place-items-center'>
      {isLoading && (
        <div>
          <img src={Loading} />
          <Description>로그인 중...</Description>
        </div>
      )}
      {error && (
        <div className='flex h-fit w-fit flex-col gap-y-2'>
          <Description>로그인에 실패했습니다.</Description>
          <button
            className='hover:bg-primary rounded-normal border-header-border h-[50px] w-full cursor-pointer border-[1px] bg-white text-black transition-all duration-300 hover:text-white'
            onClick={() => navigate(PATH.LOGIN)}
          >
            홈으로 돌아가기
          </button>
        </div>
      )}
    </section>
  );
}

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p className='w-full text-center text-xl'>{children}</p>;
};
