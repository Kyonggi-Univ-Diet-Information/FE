import { ReactNode } from "react";
import { useGA4 } from "~/shared/hooks/useGA4";

interface GA4ProviderProps {
  children: ReactNode;
}

/**
 * GA4 추적을 위한 프로바이더 컴포넌트
 * 이 컴포넌트를 최상위에 배치하여 GA4 초기화 및 페이지 뷰 추적을 담당합니다.
 */
export const GA4Provider = ({ children }: GA4ProviderProps) => {
  useGA4();

  return <>{children}</>;
};
