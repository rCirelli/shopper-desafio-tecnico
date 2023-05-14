import { UpdatedProduct } from '@/types/Product';

function PricesUpdateTable({ data }: { data: UpdatedProduct[] }) {
  const tableHeaders = ['Código', 'Nome', 'Preço Atual', 'Novo Preço'];

  const evenStyle = 'bg-white border-b';
  const oddStyle = 'border-b bg-gray-50';

  return (
    <div className="w-full relative overflow-x-auto shadow-md rounded-md">
      <table className="w-full text-sm text-left text-gray-500">
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
            <tr key={product.code} className={`${index % 2 === 0 ? evenStyle : oddStyle}`}>
              <td className="px-6 py-4">{product.code}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {product.name}
              </th>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">{product.newPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PricesUpdateTable;
