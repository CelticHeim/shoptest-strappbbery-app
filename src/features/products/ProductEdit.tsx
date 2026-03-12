import { Button } from '@/shared/components/buttons';
import { useNavigate, useParams } from 'react-router-dom';

export function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Editar Producto {id}</h1>
      <p className="text-text-secondary mb-6">Formulario de edición (próximamente)</p>
      <Button onClick={() => navigate('/products')} variant="secondary">
        Volver
      </Button>
    </div>
  );
}
