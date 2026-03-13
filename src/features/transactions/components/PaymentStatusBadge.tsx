import type { MercadoPagoPaymentStatus } from '@/types/entities/transaction';

interface PaymentStatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Aprobado' },
  accredited: { bg: 'bg-green-100', text: 'text-green-800', label: 'Acreditado' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pendiente' },
  in_process: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En proceso' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rechazado' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Cancelado' },
  refunded: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Reembolsado' },
  unknown: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Desconocido' },
};

export function PaymentStatusBadge({ status, className = '' }: PaymentStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.unknown;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text} ${className}`}>
      {config.label}
    </span>
  );
}
