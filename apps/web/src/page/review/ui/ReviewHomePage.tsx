import { CampusTopMenu } from '@/components/campus';
import RecentReviewView from '@/components/review/RecentReviewView';

export default async function ReviewHomePage() {
  return (
    <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
      <CampusTopMenu />
      <RecentReviewView />
    </div>
  );
}
