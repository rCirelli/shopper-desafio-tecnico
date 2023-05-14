'use client';
import { UploadSimple, X } from '@phosphor-icons/react';
import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Papa from 'papaparse';

function FileInputForm({ setData }: { setData: Function }) {
  const [fileName, setFileName] = useState('');
  const onDrop = useCallback((acceptedFiles: File[]) => {
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
    if (fileInput.current?.files) {
      Papa.parse(fileInput.current?.files[0], {
        header: true,
        complete: function (result) {
          setData(result.data);
        },
      });
    }
  }

  const btnDisabledStyle = 'bg-slate-300';
  const btnEnabledStyle = 'bg-blue-500 hover:bg-blue-700';

  return (
    <form
      className="w-3/5"
      action="/api/batch-update-prices"
      encType="multipart/form-data"
      method="post"
    >
      <div className="bg-white shadow-md rounded-md px-8 py-6 mb-4 flex flex-col gap-4 justify-between h-80">
        <div
          {...getRootProps({
            className:
              'flex flex-1 flex-col gap-4 items-center justify-center w-full',
          })}
        >
          <label
            htmlFor="dropzone-file"
            className={`${
              isDragActive ? 'border-blue-400 animate-pulse' : 'border-gray-300'
            } flex flex-1 flex-col items-center justify-center w-full max-h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-6">
              <div className="w-10 h-10 mb-3 text-gray-400">
                <UploadSimple color="currentColor" size={37} weight="bold" />
              </div>
              <div className="mb-2 text-sm text-gray-500 flex flex-col justify-center items-center">
                <p className="font-semibold">Clique para buscar o arquivo</p>
                <p className="align-middle">ou arraste e solte aqui</p>
              </div>
              <em className="text-xs text-gray-500">somente arquivos .csv</em>
            </div>
            <input
              {...getInputProps({
                id: 'dropzone-file',
                className: 'hidden',
              })}
              ref={fileInput}
            />
          </label>
          {fileName && (
            <div className="border border-1 border-slate-300 px-4 py-2 rounded-full bg-gray-50 flex items-center gap-2">
              <p>{fileName}</p>
              <button type="button" onClick={resetInput}>
                <X size={15} weight="bold" className="hover:text-red-700" />
              </button>
            </div>
          )}
        </div>
        <button
          className={`${
            !fileName ? btnDisabledStyle : btnEnabledStyle
          } text-white font-semibold py-2 px-4 rounded-md text-center`}
          disabled={!fileName}
          // type="submit"
          type="button"
          onClick={handleValidate}
        >
          VALIDAR
        </button>
      </div>
    </form>
  );
}

export default FileInputForm;
