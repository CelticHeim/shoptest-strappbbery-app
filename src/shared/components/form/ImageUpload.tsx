import { InputHTMLAttributes, useState } from 'react';

interface ImageUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  preview?: string;
  onImageChange?: (file: File | null, preview: string | null) => void;
}

export function ImageUpload({
  label,
  error,
  preview: initialPreview,
  onImageChange,
  ...props
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onImageChange?.(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onImageChange?.(null, null);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
        </label>
      )}

      {preview ? (
        <div className="relative">
          <div className="w-full h-64 bg-background-light rounded-lg overflow-hidden flex items-center justify-center">
            <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 bg-status-danger text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition ${
            isDragging
              ? 'border-primary bg-blue-50'
              : 'border-gray-300 bg-background-light'
          } ${error ? 'border-status-danger' : ''}`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
            {...props}
          />

          <div
            onClick={() => {
              const input = document.querySelector(
                'input[type="file"]'
              ) as HTMLInputElement;
              input?.click();
            }}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <svg
              className="w-12 h-12 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-text-secondary text-sm">Carga tu imagen</p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-status-danger mt-1">{error}</p>
      )}
    </div>
  );
}
