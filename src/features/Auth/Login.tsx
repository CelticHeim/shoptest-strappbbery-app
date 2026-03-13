import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/shared/components/form';
import { Button } from '@/shared/components/buttons';
import { Link } from '@/shared/components/ui';
import { LoginSchema, type LoginFormData } from '@/shared/schemas/user.schema';
import { useAuth } from './hooks/useAuth';

export function Login() {
    const navigate = useNavigate();
    const { loginAsync, isLoggingIn } = useAuth();
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setServerError(null);
            await loginAsync(data);
            navigate('/products');
        } catch (error: any) {
            setServerError(
                error?.response?.data?.message || 'Error al iniciar sesión'
            );
        }
    };

    return (
        <div className="w-full max-w-md relative px-4 sm:px-0">
            {/* Logo - fuera del card */}
            <div className="text-center mb-6 sm:mb-8">
                <img
                    src="/strappberry-logo.png"
                    alt="strAPPberry"
                    className="h-20 sm:h-24 mx-auto"
                />
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-2xl px-6 sm:px-8 py-6 sm:py-8">
                {/* Subtitle */}
                <div className="text-center mb-8">
                    <p className="text-text-secondary text-sm">Inicia sesión en tu cuenta</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Server Error */}
                    {serverError && (
                        <div className="p-4 bg-red-50 border border-status-danger rounded-lg">
                            <p className="text-status-danger text-sm">{serverError}</p>
                        </div>
                    )}

                    {/* Email Input */}
                    <Input
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        error={errors.email?.message}
                    />

                    {/* Password Input */}
                    <Input
                        {...register('password')}
                        type="password"
                        placeholder="Contraseña"
                        error={errors.password?.message}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full py-2"
                    >
                        {isLoggingIn ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                </form>

                {/* Divider */}
                <div className="my-6 border-t border-gray-300"></div>

                {/* Register Section */}
                <div className="text-center">
                    <p className="text-text-secondary text-xs mb-4">¿Aún no tienes cuenta?</p>
                    <Link to="/register">
                        Regístrate
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-300 text-center text-xs text-text-secondary">
                    <p>Cedric Ramírez | cedricrmz@outlook.com</p>
                </div>
            </div>
        </div>
    );
}
