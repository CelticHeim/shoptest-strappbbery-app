# ShopTest - Copilot Instructions

## Descripción General
Frontend web para la **prueba técnica de aplicación de tienda en línea** de la empresa **StrappBerry**, desarrollado con **React 19**, **TypeScript**, **Vite** y **Tailwind CSS**. Utiliza react-router-dom para el routing, Context API para state management y **JWT (JSON Web Tokens)** para autenticación.

## Stack Tecnológico
- **Framework**: React 19
- **Lenguaje**: TypeScript
- **Build Tool**: Vite 6.2
- **Estilos**: Tailwind CSS 4
- **Router**: React Router DOM 7
- **Autenticación**: JWT (JSON Web Tokens)
- **State API**: Context API + React Query 5 (server state)
- **Forms**: React Hook Form 7
- **HTTP Client**: Axios 1.10
- **Linting**: ESLint 9

## Convenciones de Archivos

### API y Lógica de Negocio (kebab-case)
- **Archivos API**: `{ruta}.api.ts`
  - Ej: `users.api.ts`, `cash-cuts.api.ts`, `orders.api.ts`
  - Ubicación: `src/api/`
- **Entidades (tipos de dominio)**: `{recurso}.ts` (PascalCase)
  - Ej: `User.ts`, `Order.ts`, `CashCut.ts`
  - Ubicación: `src/types/entities/`
  - **Tipos Genericos**:
  - Ubicación: `src/types/entities/common.type.ts`
- **Schemas de validación**: `{recurso}.schema.ts` (kebab-case)
  - Ej: `user.schema.ts`, `order.schema.ts`, `employee.schema.ts`
  - Ubicación: `src/schemas/`
  - Herramienta: **Zod**
- **Archivos de tipos**: `types.ts` (camelCase)

### Componentes React (PascalCase)
- **Componentes visuales/vistas**: `ComponentName.tsx` (PascalCase)
- **Componentes globales**: `src/components/` - agnósticos a funcionalidad
  - Ej: `Button.tsx`, `Modal.tsx`, `Input.tsx`, `Toast.tsx`
- **Componentes específicos de vista**: `pages/{ViewName}/components/ComponentName.tsx`
- **Hooks**: `useHookName.ts` (camelCase con prefijo `use`)
- **Contexts**: `{Name}Context.tsx` (PascalCase)
  - Ubicación: `src/context/` o `pages/{ViewName}/context/`

## Estructura de src/components

La carpeta `src/components` contiene todos los componentes reutilizables de la aplicación. **SIEMPRE priorizar el uso de estos componentes en lugar de crear estilos inline.**

### `ui/` - Componentes primitivos
Componentes base agnósticos: `Button`, `Card`, `CardHeader`, `CardBody`, `Modal`, `SearchBar`, `Alert`, `Badge`, `Avatar`, `OrdineTable`.

### `form/` - Componentes de formularios
Componentes para inputs: `InputField`, `TextArea`, `FileInput`, `Checkbox`, `Radio`, `Switch`, `Select`, `MultiSelect`, `Label`, `Form`, `PhoneInput`.

### `tables/` - Estructura de tablas
Componentes para construir tablas: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableFooter`, `Pagination`.

### `common/` - Componentes genéricos
Utilidades globales: `PageMeta`, `PageBreadCrumb`, `LoadingScreen`, `ThemeToggleButton`.

### `layouts/` - Layouts de página
Estructuras reutilizables: `AuthLayout`.

### `app/` - Componentes reutilizables entre vistas
Componentes que pueden ser utilizados en múltiples páginas y vistas de la aplicación: `orders/`, `categories/`, etc.

## Estructura de Carpetas para Vistas Complejas

Cuando una vista es muy compleja, descomponerla en widgets:

```
pages/
└── Home/
    ├── index.tsx              # Vista principal
    ├── components/            # Componentes locales
    │   ├── Widget1.tsx
    │   └── Widget2.tsx
    ├── hooks/                 # Hooks locales
    │   └── useLocalData.ts
    ├── context/               # Context local
    │   └── HomeContext.tsx
    └── types.ts               # Tipos locales
```

**Estructura simple** (un archivo):
```
pages/
└── Simple.tsx
```

**Estructura compleja** (carpeta con index.tsx):
```
pages/
└── Complex/
    ├── index.tsx
    ├── components/
    ├── hooks/
    ├── context/
    └── types.ts
```

## Rutas y Routing

- Las rutas definidas en `App.tsx` siguen las mismas convenciones que Laravel API
- Usar kebab-case en las URLs (ej: `/cash-cuts`, `/product-sync`)
- Componentes de ruta en PascalCase con sufijo `Index` para listados (ej: `TablesIndex.tsx`)
- Componentes de operaciones: `Create.tsx`, `Edit.tsx`, `View.tsx`

Ejemplo en App.tsx:
```tsx
<Route path="/tables" element={<TableIndex />} />
<Route path="/tables/create" element={<TableCreate />} />
<Route path="/tables/:id/edit" element={<TableEdit />} />
```

## Estructura del Proyecto
```
src/
  ├── api/                     # Peticiones al servidor (kebab-case)
  │   ├── users.api.ts
  │   ├── orders.api.ts
  │   └── cash-cuts.api.ts
  ├── components/              # Componentes globales (PascalCase)
  ├── context/                 # Contexts globales (PascalCase)
  ├── hooks/                   # Hooks globales (camelCase)
  ├── pages/                   # Vistas (PascalCase)
  │   ├── Home/
  │   ├── Employees/
  │   ├── Orders/
  │   └── ...
  ├── types/                   # Tipos globales
  │   └── entities/            # Entidades de dominio (kebab-case)
  ├── schemas/                 # Schemas de validación Zod ({recurso}.schema.ts)
  ├── utils/                   # Utilidades globales (camelCase)
  ├── layout/                  # Layouts (PascalCase)
  └── App.tsx
```

## Patrones y Prácticas

### Componentes
- Componentes funcionales con hooks
- Props bien tipadas con TypeScript
- Usar destructuración de props
- Componentes agnósticos en `src/components/`

### Hooks
- Prefijo `use` obligatorio (ej: `useAuth`, `useUserData`)
- Un hook por archivo
- Ubicación: `src/hooks/` globales o `pages/{View}/hooks/` locales

### Contexts
- Sufijo `Context` obligatorio (ej: `AuthContext`, `ThemeContext`)
- Crear Provider component junto con Context
- Ubicación: `src/context/` globales o `pages/{View}/context/` locales

### API Calls
- Archivo `{ruta}.api.ts` para cada endpoint principal
- Usar Axios para requests
- Incluir manejo de errores y tipos de respuesta
- **Estructura**: Agrupar métodos en un objeto exportado con el nombre del dominio (ej: `auth`, `orders`, `users`)
- **Uso**: Acceder como `auth.login()`, `orders.create()`, etc.

Ejemplo:
```typescript
// auth.api.ts
export const auth = {
  login: async (credentials) => api.post('/api/login', credentials),
  logout: async () => api.post('/api/logout'),
  user: async () => api.get('/api/user'),
};

// En componente:
import { auth } from '@/api/auth.api';
await auth.login(credentials);
```

### Entidades
- Las interfaces o types que representan entidades del dominio van en `src/types/entities/`
- Un archivo por entidad, nombrado en kebab-case (ej: `cash-cut.ts`, `order.ts`)
- Exportar el tipo con nombre en PascalCase (ej: `export interface CashCut { ... }`)

### Schemas de Validación
- Usar **Zod** para todos los schemas de validación de formularios
- Ubicación: `src/schemas/{recurso}.schema.ts`
- Exportar el schema y el tipo inferido. Ejemplo:

```typescript
// employee.schema.ts
import { z } from 'zod';

export const employeeSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
```

- Integrar con React Hook Form mediante `@hookform/resolvers/zod`

### State Management
- **Global UI state**: Context API en `src/context/`
  - Un context por dominio (ej: `AuthContext.tsx`, `OrderContext.tsx`)
- **Server state**: React Query con hooks (`useQuery`, `useMutation`)
  - Caching automático, sincronización, deduplicación
- **Services**: Solo para lógica muy compleja (transformaciones no triviales, validaciones complejas)
  - Mayoría de veces NO serán necesarios

## Guía para Asistente IA
**REGLA PRINCIPAL: Priorizar SIEMPRE el uso de componentes de `src/components/` en lugar de HTML crudo o estilos inline.**

Al generar código para este proyecto:
1. **Componentes**: SIEMPRE usar componentes existentes en `src/components/` (Button, Card, Modal, Table, Form Inputs, etc.)
2. **Nombres de archivos**: 
   - PascalCase para `.tsx` (componentes, vistas)
   - camelCase para `.ts` lógica y helpers, kebab-case para `.api.ts`
3. **API calls**: Ubicar en `src/api/{ruta}.api.ts` (solo llamadas HTTP, sin transformación)
4. **Server state**: Usar React Query hooks (`useQuery`, `useMutation`) para datos del servidor
5. **Componentes globales**: Desarrollar bajo `src/components/` para reutilización
6. **Vistas complejas**: Usar estructura de carpeta con `index.tsx`
7. **Hooks y Contexts**: Colocar explícitamente con prefijos `use` y sufijo `Context`
8. **Tipado**: Usar TypeScript para propiedades, retornos y parámetros
9. **Entidades**: Definir interfaces/types de dominio en `src/types/entities/{recurso}.ts`
10. **Schemas de validación**: Crear en `src/schemas/{recurso}.schema.ts` usando **Zod**; integrar con React Hook Form via `@hookform/resolvers/zod`
11. **Rutas**: Seguir convenciones de Laravel API (kebab-case en URLs)
12. **Services**: Usar SOLO si hay lógica muy compleja que no cabe en un hook
