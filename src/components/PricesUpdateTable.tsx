import { ProductToUpdate } from '@/types/Product';

function PricesUpdateTable({ data }: { data: ProductToUpdate[] }) {
  const tableHeaders = ['Código', 'Nome', 'Preço Atual', 'Novo Preço'];

  const evenStyle = 'bg-white border-b';
  const oddStyle = 'border-b bg-gray-50';
  const currencyFormatter = (value: number) => value.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})

  return (
    <div className="w-full relative overflow-x-auto shadow-md rounded-md">
      <table className="w-full text-sm text-left text-gray-500">
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr
              key={product.code}
              className={`${index % 2 === 0 ? evenStyle : oddStyle}`}
            >
              <td className="px-6 py-4">{product.code}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 truncate"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{currencyFormatter(product.price)}</td>
              <td className="px-6 py-4">{currencyFormatter(product.newPrice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PricesUpdateTable;
