'use client';

import { LanguageSelector } from '@/components/language-selector';
import { SearchInput } from '@/components/search-input';
import { SearchResults } from '@/components/search-results';
import { ThemeToggle } from '@/components/theme-toggle';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Mock
  const searchResults = [
    { id: 1, title: '제목 1', description: '1 요약' },
    { id: 2, title: '제목 2', description: '2 요약' },
    { id: 3, title: '제목 3', description: '3 요약' },
    { id: 4, title: '제목 4', description: '4 요약' },
    { id: 5, title: '제목 5', description: '5 요약' },
  ];

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSearching(false);
    setHasSearched(true);
  };

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
          <SearchInput onSearchAction={handleSearch} isSearching={isSearching} />

          {hasSearched && (
            <div className="mt-8 animate-fadeIn">
              <SearchResults results={searchResults} query={searchQuery} />
            </div>
          )}
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
