'use client';

import { LanguageSelector } from '@/components/language-selector';
import { SearchInput } from '@/components/search-input';
import { SearchResults } from '@/components/search-results';
import { ThemeToggle } from '@/components/theme-toggle';
import axiosInstance from '@/lib/axiosInstance';
import { Repo } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const USER_NAME_PARAM = 'userName';

const getUsersRepos = async (userName: string) => {
  const { data } = await axiosInstance.get<Repo[]>(`users/${userName}/repos`, {
    params: {
      per_page: 5,
      page: 1,
    },
  });
  return data;
};

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = async (userName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(USER_NAME_PARAM, userName);
    if (!userName) {
      router.replace('/');
      return;
    }
    router.replace(`?${params.toString()}`);
  };

  const { data, error, isPending } = useQuery({
    queryKey: ['usersRepos', searchParams.get(USER_NAME_PARAM) ?? ''],
    queryFn: () => getUsersRepos(searchParams.get(USER_NAME_PARAM) ?? ''),
    enabled: !!searchParams.get(USER_NAME_PARAM),
  });

  const hasSearched = data && data?.length > -1;

  return (
    <main className="flex min-h-screen flex-col items-center p-4 transition-all duration-500 ease-in-out justify-between">
      {/* 우측 상단 컨트롤 */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        <LanguageSelector />
      </div>

      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          hasSearched ? 'pt-24' : 'flex items-center justify-center min-h-screen'
        }`}
      >
        <div className="w-full max-w-2xl mx-auto px-4">
          <SearchInput
            onSearchAction={handleSearch}
            isSearching={!!searchParams.get(USER_NAME_PARAM) && isPending}
          />

          {!error && hasSearched && (
            <div className="mt-8 animate-fadeIn">
              <SearchResults results={data} query={searchParams.get(USER_NAME_PARAM) ?? ''} />
            </div>
          )}
          {error && <div className="mt-8">오류 발생</div>}
        </div>
      </div>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        © {new Date().getFullYear()} kwong1110. All rights reserved.
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/github-mark-white.svg" alt="Globe icon" width={16} height={16} />
          Go github →
        </a>
      </footer>
    </main>
  );
}
