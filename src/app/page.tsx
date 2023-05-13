import { useState } from 'react';
import FileInputForm from './components/FileInputForm';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <FileInputForm />
    </main>
  );
}
