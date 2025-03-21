'use client';

import { LanguageSelector } from '@/components/language-selector';
import { SearchResults } from '@/components/search-results';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoaderCircle, Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsSearching(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockResults = [
        { id: 1, title: '검색 결과 1', description: '첫 번째 검색 결과에 대한 설명입니다.' },
        { id: 2, title: '검색 결과 2', description: '두 번째 검색 결과에 대한 설명입니다.' },
        { id: 3, title: '검색 결과 3', description: '세 번째 검색 결과에 대한 설명입니다.' },
        { id: 4, title: '검색 결과 4', description: '네 번째 검색 결과에 대한 설명입니다.' },
        { id: 5, title: '검색 결과 5', description: '다섯 번째 검색 결과에 대한 설명입니다.' },
      ];

      setResults(mockResults);
      setShowResults(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setShowResults(false);
    setQuery('');
    setResults([]);
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 transition-all duration-500 ease-in-out justify-between">
      {/* 우측 상단 컨트롤 */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-10">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div
        className={`w-full max-w-3xl transition-all duration-500 ease-in-out min-h-[75vh] ${
          showResults ? 'mt-12' : 'flex items-center justify-center'
        }`}
      >
        <form
          onSubmit={handleSearch}
          className="relative w-full transition-all duration-500 ease-in-out"
        >
          <div className="relative">
            <Input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isSearching}
              className="pr-20 h-14 text-lg"
            />

            <Button type="submit" disabled={isSearching} className="absolute right-0 top-0 h-full">
              {isSearching ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span className="sr-only">검색</span>
            </Button>
          </div>
        </form>

        {showResults && (
          <div className="mt-8 animate-fadeIn">
            <SearchResults results={results} onResetAction={resetSearch} />
          </div>
        )}
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
