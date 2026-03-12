import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string(),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: 'Las contraseñas no coinciden',
  path: ['password_confirmation'],
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;
