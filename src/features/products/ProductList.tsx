import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit } from 'lucide-react';
import { useProducts, useDeleteProduct } from './hooks/useProducts';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { Button } from '@/shared/components/buttons';
import { SearchBar } from '@/shared/components/ui';
import { Pagination } from '@/shared/components/ui';
import { formatCurrency } from '@/shared/helpers/format';

export function ProductList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(search, 300);

  // Resetear página a 1 cuando cambia la búsqueda
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isPending, error } = useProducts(page, perPage, debouncedSearch);
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      deleteProduct.mutate(id);
    }
  };

  if (error) {
    return <div className="text-center py-8 text-status-danger">Error al cargar productos</div>;
  }

  const products = data?.data?.data || [];
  const pagination = data?.data || {};

  return (
    <div className="pb-32">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button onClick={() => navigate('/products/create')}>
          Crear Producto
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          onSearch={setSearch}
          placeholder="Buscar productos..."
        />
      </div>

      {/* Table */}
      {isPending ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-text-secondary font-medium">Cargando productos...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center py-12 bg-white rounded-lg shadow">
          <p className="text-text-secondary text-center">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Imagen</th>
                  <th className="px-4 py-3 text-left">Nombre</th>
                  <th className="px-4 py-3 text-left">Descripción</th>
                  <th className="px-4 py-3 text-center">Precio</th>
                  <th className="px-4 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                    <td className="px-4 py-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400 text-center">
                          Sin imagen
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{product.name}</p>
                    </td>
                    <td className="px-4 py-3 text-text-secondary text-sm">
                      {product.description || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold text-status-danger">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => navigate(`/products/${product.id}/edit`)}
                          className="flex items-center gap-2 px-3 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-status-danger text-white hover:bg-red-700 rounded-lg transition"
                          title="Eliminar"
                          disabled={deleteProduct.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {pagination.total && (
        <div className="fixed bottom-0 left-0 right-0 sm:left-64 bg-white border-t border-gray-200 p-6">
          <Pagination
            currentPage={page}
            totalPages={pagination.last_page}
            onPageChange={setPage}
            perPage={perPage}
            onPerPageChange={(newPerPage) => {
              setPerPage(newPerPage);
              setPage(1);
            }}
          />
        </div>
      )}
    </div>
  );
}
