import { Suspense } from 'react';

async function PrintPage({ searchParams }: any) {
  const data = JSON.parse(searchParams.data || '{}');
  return (
    <div>
      <span>{data.status}</span>
      <span>{data.tx_id}</span>
    </div>
  );
}

export default function Page({ searchParams }: any) {
  return (
    <Suspense fallback="Loading...">
      <PrintPage searchParams={searchParams} />
    </Suspense>
  );
}