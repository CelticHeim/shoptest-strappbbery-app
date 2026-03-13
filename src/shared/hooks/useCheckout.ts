import { useState } from 'react';
import { checkout } from '@/shared/api/checkout.api';
import type { CartItem } from '@/shared/context/CartContext';

interface CheckoutState {
  loading: boolean;
  error: string | null;
  orderId: string | null;
  totalAmount: number | null;
  success: boolean;
}

export function useCheckout() {
  const [state, setState] = useState<CheckoutState>({
    loading: false,
    error: null,
    orderId: null,
    totalAmount: null,
    success: false,
  });

  /**
   * Crear una orden de pago
   */
  const createOrder = async (cartItems: CartItem[]) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const payload = {
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = (await checkout.createOrder(payload)) as any;
      const orderData = response.data.data; // { order_id, total_amount }

      setState((prev) => ({
        ...prev,
        orderId: orderData.order_id,
        totalAmount: orderData.total_amount,
        loading: false,
      }));

      return orderData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error creating checkout order';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      throw error;
    }
  };

  /**
   * Procesar el pago
   */
  const processPayment = async (
    orderId: string,
    token: string,
    installments: number,
    cartItems: CartItem[],
    paymentMethodId?: string
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const payload = {
        order_id: orderId,
        token,
        installments,
        payment_method_id: paymentMethodId,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = (await checkout.processPayment(payload)) as any;
      const paymentData = response.data.data; // { id, status, total_amount, ... }

      setState((prev) => ({
        ...prev,
        success: true,
        loading: false,
      }));

      return paymentData;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error processing payment';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      throw error;
    }
  };

  /**
   * Obtener historial de compras del usuario
   */
  const getPurchaseHistory = async (page: number = 1) => {
    try {
      const response = await checkout.getPurchaseHistory(page);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error fetching purchase history';
      throw new Error(errorMessage);
    }
  };

  /**
   * Resetear el estado
   */
  const reset = () => {
    setState({
      loading: false,
      error: null,
      orderId: null,
      totalAmount: null,
      success: false,
    });
  };

  return {
    ...state,
    createOrder,
    processPayment,
    getPurchaseHistory,
    reset,
  };
}
