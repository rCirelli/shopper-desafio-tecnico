'use client';
import { useState } from 'react';
import FileInputForm from '../components/FileInputForm';
import { ProductToUpdate } from '@/types/Product';
import PricesUpdateTable from '@/components/PricesUpdateTable';
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';

type apiResponse = {
  products: ProductToUpdate[];
  error: boolean;
};

const initialState = { products: [], error: false };

export default function Home() {
  const [parsedData, setParsedData] = useState<apiResponse>(initialState);

  function handleUpdatePrices() {
    axios
      .post('/api/batch-update-prices', parsedData.products, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setParsedData(initialState);
        alert('Preços atualizados com sucesso!');
      })
      .catch((err) => alert(err.response.data));
  }

  const btnDisabledStyle = 'bg-slate-300';
  const btnEnabledStyle = 'bg-blue-500 hover:bg-blue-700';

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 w-4/5 gap-4">
      {parsedData.products.length > 0 ? (
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between">
            <button
              className="group min-w-14 flex justify-center items-center gap-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-center"
              type="button"
              onClick={() => setParsedData(initialState)}
            >
              <ArrowLeft size={32} className="visible" />
              <p className="group-hover:inline hidden">VOLTAR</p>
            </button>
            <button
              className={`${
                parsedData.error ? btnDisabledStyle : btnEnabledStyle
              } self-center bg-blue-500 text-white font-semibold py-3 px-9 rounded-md text-center`}
              type="button"
              onClick={handleUpdatePrices}
              disabled={parsedData.error}
            >
              ATUALIZAR PREÇOS
            </button>
          </div>
          <PricesUpdateTable
            productsData={parsedData.products}
            isError={parsedData.error}
          />
        </div>
      ) : (
        <FileInputForm setData={setParsedData} />
      )}
    </main>
  );
}
