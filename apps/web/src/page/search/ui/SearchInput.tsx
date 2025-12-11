'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const t = useTranslations('search');
  const q = searchParams.get('q');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className='relative' onSubmit={handleSubmit}>
      <button type='submit' onClick={onSubmit}>
        <SearchIcon className='size-4.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 active:text-gray-300' />
      </button>
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        className='w-full rounded-2xl border border-gray-300 p-2.5 pl-3 pr-10 text-[15px] focus:outline-none'
        type='text'
        placeholder={t('placeholder')}
      />
    </form>
  );
}
