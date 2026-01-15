import { ProtectedRoute } from '@/app/_providers';

import { UserReviewPage, UserReviewPageProps } from '@/page/user';

const Page = (props: UserReviewPageProps) => {
  return (
    <ProtectedRoute>
      <UserReviewPage {...props} />
    </ProtectedRoute>
  );
};

export default Page;
