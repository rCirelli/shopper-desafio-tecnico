'use client';

import { X } from '@phosphor-icons/react';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileInputForm() {
  const [fileName, setFileName] = useState('');
  const onDrop = useCallback((acceptedFiles: File[] ) => {
    setFileName(acceptedFiles[0].name);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    onDrop,
    noClick: true,
  });

  const fileInput = useRef<HTMLInputElement>(null);

  function resetInput() {
    if (fileInput.current != null) {
      fileInput.current.value = '';
      setFileName('');
    }
  }

  function handleValidate() {
    console.log('formData');
  }

  return (
    <form
      className='w-3/5'
      action="/api/batch-update-prices"
      encType="multipart/form-data"
      method="post"
    >
      <div className="bg-white shadow-md rounded-md px-8 py-6 mb-4 flex flex-col gap-4 justify-between h-80">
        <div
          {...getRootProps({
            className: 'flex flex-1 flex-col gap-4 items-center justify-center w-full',
          })}
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-1 flex-col items-center justify-center w-full max-h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center">
                <span className="font-semibold">
                  Clique para buscar o arquivo
                </span>
                <span className="align-middle">ou arraste e solte</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <em>somente arquivos .csv</em>
              </p>
            </div>
            <input
              {...getInputProps({
                id: 'dropzone-file',
                className: 'hidden',
              })}
              ref={fileInput}
              // onChange={handleFile}
            />
          </label>
            {fileName && (
              <div className="border border-1 border-slate-300 px-4 py-2 rounded-full bg-gray-50 flex items-center gap-2">
                <p>{fileName}</p>
                <button type='button' onClick={resetInput}>
                  <X size={15} weight='bold' className='hover:text-red-700'/>
                </button>
              </div>
            )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-center"
          type="submit"
          // type="button"
          onClick={handleValidate}
        >
          VALIDAR
        </button>
      </div>
    </form>
  );
}

export default FileInputForm;
