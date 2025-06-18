import { Suspense } from 'react';

async function PrintPage({ searchParams }: any) {
  const data = JSON.parse(searchParams.data || '{}');
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}

export default function Page({ searchParams }: any) {
  return (
    <Suspense fallback="Loading...">
      <PrintPage searchParams={searchParams} />
    </Suspense>
  );
}