import { ProtectedRoute } from '@/app/_providers';

import { UserReviewPage } from '@/page/user';

const Page = () => {
  return (
    <ProtectedRoute>
      <UserReviewPage />
    </ProtectedRoute>
  );
};

export default Page;
