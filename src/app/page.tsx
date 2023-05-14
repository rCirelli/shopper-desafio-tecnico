'use client'
import { useState } from 'react';
import FileInputForm from '../components/FileInputForm';
import { UpdatedProduct } from '@/types/Product';
import PricesUpdateTable from '@/components/PricesUpdateTable';

export default function Home() {
  const [parsedData, setParsedData] = useState<UpdatedProduct[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 w-3/5 gap-4">
      <FileInputForm setData={setParsedData} />
      <PricesUpdateTable data={parsedData} />
    </main>
  );
}
