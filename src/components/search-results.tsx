'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResetAction: () => void;
}

export function SearchResults({ results, onResetAction }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">검색 결과</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetAction}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>돌아가기</span>
        </Button>
      </div>

      {results.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {results.map((result) => (
            <Card key={result.id} className="transition-all hover:shadow-md">
              <CardHeader className="py-4">
                <CardTitle>{result.title}</CardTitle>
                <CardDescription>{result.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
