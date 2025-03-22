import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
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
