export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  image?: string | null;
  created_at?: string;
  updated_at?: string;
}
