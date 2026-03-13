import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product } from '@/shared/types/entities/Product';

interface ProductDetailContextType {
  selectedProduct: Product | null;
  openDetail: (product: Product) => void;
  closeDetail: () => void;
}

const ProductDetailContext = createContext<ProductDetailContextType | undefined>(undefined);

export function ProductDetailProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <ProductDetailContext.Provider value={{ selectedProduct, openDetail, closeDetail }}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  const context = useContext(ProductDetailContext);
  if (context === undefined) {
    throw new Error('useProductDetail must be used within a ProductDetailProvider');
  }
  return context;
}
