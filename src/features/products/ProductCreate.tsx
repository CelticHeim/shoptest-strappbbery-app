import { Button } from '@/shared/components/buttons';
import { useNavigate } from 'react-router-dom';

export function ProductCreate() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Crear Producto</h1>
      <p className="text-text-secondary mb-6">Formulario de creación (próximamente)</p>
      <Button onClick={() => navigate('/products')} variant="secondary">
        Volver
      </Button>
    </div>
  );
}
