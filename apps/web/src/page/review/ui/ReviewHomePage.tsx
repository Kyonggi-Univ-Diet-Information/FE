import { CampusTopMenu } from '@/entities/campus-menu';
import { RecentReviewView } from '@/entities/review';

export default async function ReviewHomePage() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <CampusTopMenu />
      <RecentReviewView />
    </div>
  );
}
