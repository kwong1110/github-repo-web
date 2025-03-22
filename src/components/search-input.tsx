'use client';

import type React from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  onSearchAction: (query: string) => void;
  isSearching: boolean;
}

export function SearchInput({ onSearchAction, isSearching }: SearchInputProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 마운트 시 input focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSearching) {
      onSearchAction(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search anything..."
          className="pr-12 pl-4 py-6 text-lg rounded-full shadow-md focus-visible:ring-2 focus-visible:ring-offset-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-2 h-10 w-10"
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  );
}
