import { ProtectedRoute } from '@/app/_providers';

export default function UserPage() {
  return (
    <ProtectedRoute>
      로그인에 성공했어요.
      <br />
      유저 페이지는 아직 개발중이에요!
    </ProtectedRoute>
  );
}
