import { ProtectedRoute } from '@/app/_providers';

import { UserFavReviewPage, UserFavReviewPageProps } from '@/page/user';

const Page = (props: UserFavReviewPageProps) => {
  return (
    <ProtectedRoute>
      <UserFavReviewPage {...props} />
    </ProtectedRoute>
  );
};

export default Page;
