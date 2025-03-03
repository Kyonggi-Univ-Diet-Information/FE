import { Kakao } from "~/assets";

export default function LoginPage() {
  return (
    <div className="bg-primary/80 grid h-[calc(100vh-100px)] w-full place-items-center overflow-hidden md:h-[calc(100vh-70px)]">
      <div className="rounded-normal flex h-1/2 w-[60vw] flex-col items-center justify-center gap-y-2 border-2 border-white/20 bg-white/50">
        <p className="text-center text-lg leading-[1.5em]">
          카카오 로그인 후 <br />
          리뷰 기능을 이용해보세요!
        </p>
        <KakaoLoginButton
          onClick={() => {
            window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`;
          }}
        >
          <Symbol src={Kakao} alt="kakao" />
          카카오 로그인
        </KakaoLoginButton>
      </div>
    </div>
  );
}

const Symbol = ({ src, alt }) => (
  <img src={src} alt={alt} className="mr-2 h-5 w-5" />
);

const KakaoLoginButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="flex h-[50px] w-[300px] cursor-pointer items-center justify-center rounded-[12px] border-none bg-[#fee500] px-5 py-2.5 text-lg hover:bg-[#e8d102] md:w-[200px]"
  >
    {children}
  </button>
);
