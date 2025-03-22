import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { convertToKoreanDate } from '@/lib/dateUtils';
import { Repo } from '@/types/api';
import { Star } from 'lucide-react';

interface SearchResultsProps {
  results: Repo[];
  query: string;
}

export function SearchResults({ results, query }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">
        Search results for: <span className="font-bold">{query}</span>
      </h2>

      {results.length === 0 ? (
        <p className="text-muted-foreground">검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {results.map((result) => (
            <Card key={result.id} className="transition-all hover:shadow-md">
              <CardHeader className="py-4">
                <CardTitle className="flex justify-between">
                  {result.name}
                  <div className="flex items-center text-sm">
                    <Star size={16} fill="yellow" />
                    {result.stargazers_count}
                  </div>
                </CardTitle>
                <CardDescription className="flex">{result.description}</CardDescription>
                <CardContent>
                  {convertToKoreanDate(result.updated_at)}, {result.language}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
