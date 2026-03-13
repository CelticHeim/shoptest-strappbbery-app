import { useEffect, useRef } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/shared/context/CartContext';
import { formatCurrency } from '@/shared/helpers/format';

interface CartDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        // Check if click is on the cart button element
        const cartButton = document.querySelector('[data-cart-button]');
        if (!cartButton || !cartButton.contains(target)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Dropdown */}
      <div
        ref={dropdownRef}
        className="fixed top-20 right-4 sm:right-6 w-80 sm:w-96 max-h-[600px] bg-white rounded-xl shadow-2xl z-50 flex flex-col border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 flex-shrink-0 bg-gradient-to-r from-primary/5 to-transparent">
          <h2 className="font-semibold text-lg text-text-primary">Mi Carrito</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-lg transition text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="p-8 text-center text-text-secondary">
              <div className="text-4xl mb-2">🛒</div>
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center px-2">
                        Sin imagen
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm line-clamp-2 text-text-primary">
                      {item.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary mt-1">
                      {formatCurrency(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 mt-2 bg-gray-100 rounded-lg w-fit">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition"
                        title="Decrementar"
                      >
                        <Minus className="w-4 h-4 text-text-secondary" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-text-primary">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded transition"
                        title="Incrementar"
                      >
                        <Plus className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex-shrink-0 flex items-start">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-status-danger hover:bg-red-50 rounded-lg transition"
                      title="Eliminar del carrito"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 flex-shrink-0 space-y-3 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-text-secondary">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(getTotalPrice())}
              </span>
            </div>
            <button className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition font-semibold text-sm">
              Comprar ahora
            </button>
            <button
              onClick={() => {
                clearCart();
                onClose();
              }}
              className="w-full px-4 py-2 bg-white text-text-secondary border border-gray-200 rounded-lg hover:bg-gray-100 transition text-sm font-medium"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
