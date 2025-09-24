import { Kakao } from '~/assets';
import School from '~/assets/kyonggi-univ.webp';

export default function LoginPage() {
  return (
    <div
      className='bg-primary/10 grid size-full place-items-center overflow-hidden bg-cover bg-center'
      style={{ backgroundImage: `url("${School}")` }}
    >
      <div className='rounded-normal border-header-border md:w-120 lg:w-180 relative flex h-fit w-[75%] flex-col gap-y-4 border-[1px] bg-white/60 p-10'>
        <p className='md:font-2xl z-10 w-full text-xl font-medium'>
          <b>카카오 로그인</b> 후 <br />
          <b>리뷰 기능</b>을 이용해보세요!
        </p>
        <button
          className='rounded-small text-dark z-10 flex h-[50px] w-full cursor-pointer items-center justify-center bg-[#fee500] text-lg text-black transition-all duration-300 hover:bg-[#e8d102]'
          onClick={() => {
            window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`;
          }}
        >
          <Symbol src={Kakao} alt='kakao' />
          카카오 로그인
        </button>
        <div className='rounded-normal absolute left-0 top-0 z-0 size-full backdrop-blur-sm' />
      </div>
    </div>
  );
}

const Symbol = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className='mr-2 h-5 w-5' />
);
