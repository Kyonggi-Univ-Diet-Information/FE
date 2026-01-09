import { SearchInput } from '@/page/search';

export default async function SearchPage() {
  return (
    <div className='flex flex-col gap-4'>
      <SearchInput />
    </div>
  );
}
