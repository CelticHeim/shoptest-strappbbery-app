import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useProductDetail } from '@/shared/context/ProductDetailContext';
import { useCart } from '@/shared/context/CartContext';
import { useToast } from '@/shared/context/ToastContext';
import { formatCurrency } from '@/shared/helpers/format';
import { PRODUCT_CATEGORIES } from '@/shared/constants/categories';

export function ProductDetailModal() {
  const { selectedProduct, closeDetail } = useProductDetail();
  const { addToCart, items } = useCart();
  const { addToast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  // Find category label
  const categoryLabel = selectedProduct
    ? PRODUCT_CATEGORIES.find(cat => cat.value === selectedProduct.category)?.label || selectedProduct.category
    : null;

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        closeDetail();
      }
    };

    if (selectedProduct) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [selectedProduct, closeDetail]);

  // Close when clicking outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeDetail();
      }
    };

    if (selectedProduct) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectedProduct, closeDetail]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct) {
      addToCart(selectedProduct);
      const cartItem = items.find(item => item.id === selectedProduct.id);
      const newQuantity = cartItem ? cartItem.quantity + 1 : 1;
      addToast(`${selectedProduct.name} agregado al carrito (${newQuantity})`, 'success', 2500);
    }
  };

  if (!selectedProduct) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeDetail} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl sm:max-w-3xl lg:max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-primary text-white p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Detalle del Producto</h2>
            <button
              onClick={closeDetail}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-8">
              {/* Mobile: Title and Category Section */}
              <div className="lg:hidden mb-6">
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {selectedProduct.name}
                </h1>
                {selectedProduct.category && (
                  <span className="inline-block px-4 py-1 bg-primary text-white rounded-full text-sm font-semibold">
                    {categoryLabel}
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div className="flex items-center justify-center bg-gray-100 rounded-xl min-h-64 sm:min-h-80 mb-6 lg:mb-0 lg:order-1">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <p>Sin imagen</p>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-between lg:order-2">
                {/* Desktop: Title and Category */}
                <div className="hidden lg:block">
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
                    {selectedProduct.name}
                  </h1>
                  {selectedProduct.category && (
                    <span className="inline-block px-4 py-1 bg-primary text-white rounded-full text-sm font-semibold mb-4">
                      {categoryLabel}
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-text-secondary text-sm mb-1">Precio</p>
                  <p className="text-4xl font-bold text-primary">
                    {formatCurrency(selectedProduct.price)}
                  </p>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <p className="text-text-secondary text-sm mb-2 font-semibold">Descripción</p>
                  <p className="text-text-primary leading-relaxed">
                    {selectedProduct.description || 'Sin descripción disponible'}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1h7.586a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM5 16a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
