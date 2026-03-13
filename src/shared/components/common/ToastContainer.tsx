import { useToast } from '@/shared/context/ToastContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[1000] pointer-events-none">
      <div className="flex flex-col gap-2 items-center">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-5 py-4 rounded-lg border shadow-lg backdrop-blur-sm pointer-events-auto animate-in fade-in slide-in-from-top-2 duration-300 ${getBackgroundColor(toast.type)} max-w-md`}
          >
            {getIcon(toast.type)}
            <span className="text-sm font-medium text-gray-800">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 p-1 hover:bg-black/10 rounded-lg transition"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
