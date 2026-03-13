import type { Product } from '@/shared/types/entities/Product';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '@/shared/helpers/format';
import { PRODUCT_CATEGORIES } from '@/shared/constants/categories';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Find the category label in Spanish
  const categoryLabel = PRODUCT_CATEGORIES.find(cat => cat.value === product.category)?.label || product.category;
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-200">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <div className="text-gray-400 text-sm">Sin imagen</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-text-primary line-clamp-2">
            {product.name}
          </h3>
          {product.category && (
            <span className="inline-block mt-2 px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
              {categoryLabel}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-sm text-text-secondary line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 bg-primary text-white hover:bg-primary/90 rounded-lg transition"
            title="Agregar al carrito"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
