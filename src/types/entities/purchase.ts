export interface PurchaseProduct {
  id: number;
  name: string;
  price: number;
  pivot: {
    quantity: number;
    unit_price: number;
  };
}

export interface Purchase {
  id: number;
  user_id: number;
  status: 'pending' | 'approved' | 'in_process' | 'rejected' | 'cancelled';
  total_amount: number;
  mercado_pago_payment_id: string | null;
  created_at: string;
  updated_at: string;
  products: PurchaseProduct[];
}

export interface PurchasesResponse {
  current_page: number;
  data: Purchase[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
