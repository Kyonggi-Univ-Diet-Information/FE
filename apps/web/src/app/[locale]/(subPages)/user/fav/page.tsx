import { ProtectedRoute } from '@/app/_providers';

import { UserFavReviewPage } from '@/page/user';

const Page = () => {
  return (
    <ProtectedRoute>
      <UserFavReviewPage />
    </ProtectedRoute>
  );
};

export default Page;
