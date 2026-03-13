import { Button } from '@/shared/components/buttons';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">strAPPberry</h2>
        <p className="text-text-secondary">Registrate una cuenta</p>
      </div>

      <div className="space-y-6">
        <p className="text-text-secondary">Formulario de registro (próximamente)</p>
        <Button onClick={() => navigate('/login')} className="w-full">
          Volver al Login
        </Button>
      </div>
    </div>
  );
}
