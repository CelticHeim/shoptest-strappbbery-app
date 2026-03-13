import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/shared/components/form';
import { Textarea } from '@/shared/components/form';
import { Select } from '@/shared/components/form';
import { ImageUpload } from '@/shared/components/form';
import { Button } from '@/shared/components/buttons';
import { PRODUCT_CATEGORIES } from '@/shared/constants/categories';
import { useCreateProduct } from './hooks/useProducts';

const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  price: z.coerce.number().min(0, 'El precio debe ser mayor a 0'),
  category: z.string().optional(),
  image: z.instanceof(File).optional(),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function ProductCreate() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      const submitData = {
        ...data,
        image: selectedImage || undefined,
      };
      await createProduct.mutateAsync(submitData);
      navigate('/products');
    } catch (error: any) {
      // Mostrar errores del servidor en los campos
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((field) => {
          setError(field as keyof CreateProductFormData, {
            type: 'server',
            message: serverErrors[field][0],
          });
        });
      } else {
        console.error('Error al crear producto:', error);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Crear Producto</h1>
          <p className="text-text-secondary">Completa el formulario para crear un nuevo producto</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <Input
          {...register('name')}
          type="text"
          label="Nombre del Producto"
          placeholder="Ej: Laptop ASUS VivoBook"
          error={errors.name?.message}
        />

        <Textarea
          {...register('description')}
          label="Descripción"
          placeholder="Descripción del producto..."
          rows={4}
        />

        <ImageUpload
          label="Imagen del Producto"
          onImageChange={(file) => setSelectedImage(file)}
          error={errors.image?.message}
        />

        <Input
          {...register('price')}
          type="number"
          label="Precio"
          placeholder="99.99"
          step="0.01"
          error={errors.price?.message}
        />

        <Select
          {...register('category')}
          label="Categoría"
          placeholder="Selecciona una categoría"
          options={PRODUCT_CATEGORIES}
        />

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={createProduct.isPending}>
            {createProduct.isPending ? 'Creando...' : 'Crear Producto'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/products')}
          >
            Cancelar
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
}
