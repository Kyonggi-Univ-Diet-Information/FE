import { ProtectedRoute } from '@/app/_providers';
import { UserPage } from '@/page/user';

export default function Page() {
  return (
    <ProtectedRoute>
      <UserPage />
    </ProtectedRoute>
  );
}
