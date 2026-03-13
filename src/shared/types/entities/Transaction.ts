export interface MercadoPagoPaymentStatus {
  id: number | string;
  status: 'approved' | 'pending' | 'in_process' | 'rejected' | 'cancelled' | 'refunded' | 'unknown';
  status_detail: string | null;
  transaction_amount: number;
  currency_id: string;
  payment_method_id: string | null;
  installments: number;
  date_created: string | null;
  date_last_updated: string | null;
}

export interface ProductInTransaction {
  id: number;
  name: string;
  pivot: {
    transaction_id: number;
    product_id: number;
    quantity: number;
    unit_price: string;
    subtotal: number;
  };
}

export interface Transaction {
  id: number;
  user_id: number;
  status: 'paid' | 'pending' | 'failed' | 'cancelled' | 'refunded';
  total_amount: string | number;
  mercado_pago_payment_id: string;
  created_at: string;
  updated_at: string;
  products?: ProductInTransaction[];
}
