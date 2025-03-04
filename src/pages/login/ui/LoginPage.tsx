import { Kakao, KaKaoSquare } from "~/assets";

export default function LoginPage() {
  return (
    <div className="bg-primary/40 grid h-full w-full place-items-center overflow-hidden">
      <div className="flex h-fit w-[75%] flex-col gap-y-4 md:w-120 lg:w-180">
        <p className="w-full text-2xl font-medium">
          <b>카카오 로그인</b> 후 <br />
          <b>리뷰 기능</b>을 이용해보세요!
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <div
            className="rounded-normal h-40 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${KaKaoSquare})` }}
          />
          <div
            className="rounded-normal h-40 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${KaKaoSquare})` }}
          />
        </div>
        <div className="flex w-full justify-center">
          <button
            className="rounded-normal text-dark flex h-[50px] w-full cursor-pointer items-center justify-center bg-[#fee500] text-lg text-black transition-all duration-300 hover:bg-[#e8d102] md:w-100"
            onClick={() => {
              window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`;
            }}
          >
            <Symbol src={Kakao} alt="kakao" />
            카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

const Symbol = ({ src, alt }) => (
  <img src={src} alt={alt} className="mr-2 h-5 w-5" />
);
