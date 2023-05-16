import { ProductToUpdate } from '@/types/Product';

function PricesUpdateTable({
  productsData,
  isError,
}: {
  productsData: ProductToUpdate[];
  isError: boolean;
}) {
  const tableHeaders = ['Código', 'Nome', 'Preço Atual', 'Novo Preço'];

  const evenStyle = 'bg-white border-b';
  const oddStyle = 'border-b bg-gray-50';
  const currencyFormatter = (value: number = 0) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="w-full relative overflow-x-auto shadow-md rounded-md">
      <table className="w-full text-sm text-left text-gray-500">
        <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          <col width="10%" />
          {isError ? <col width="40%" /> : null}
        </colgroup>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
            {isError ? (
              <th scope="col" className="px-6 py-3">
                Erros
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {productsData.map((product, index) => (
            <tr
              key={product.code}
              className={`${index % 2 === 0 ? evenStyle : oddStyle}`}
            >
              <td className="px-6 py-4">{product.code}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 truncate"
              >
                {product.name || 'N/A'}
              </th>
              <td className="px-6 py-4">
                {product.price ? currencyFormatter(product.price) : 'N/A'}
              </td>
              <td className="px-6 py-4">
                {currencyFormatter(product.newPrice)}
              </td>
              {isError ? <td className="px-6 py-4">{product.errors}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PricesUpdateTable;
