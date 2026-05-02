# Sistema de Gestão Empresarial

Sistema completo para gerenciamento empresarial com arquitetura moderna (DDD + Clean Architecture), oferecendo CRUD completo para clientes, contratos, notas fiscais, receitas e despesas.

## 🏗️ Arquitetura

### Backend (Domain-Driven Design + Clean Architecture)

```
backend/src/
├── domain/           # Entidades e contratos de repositórios
│   ├── entities/     # Client, Contract, Note, Revenue, Expense, User
│   └── repositories/ # Interfaces (IClientRepository, etc.)
├── application/      # Casos de uso e DTOs
│   ├── use-cases/    # CreateClient, GetClients, etc.
│   └── dtos/         # Validação com Zod
├── infrastructure/   # Implementações externas
│   └── database/     # Prisma + PostgreSQL
└── presentation/     # Controllers, rotas e middlewares
    ├── controllers/  # *Controller.ts
    ├── routes/       # *Routes.ts
    └── middlewares/  # authMiddleware.ts
```

### Frontend (React + Vite)

```
frontend/src/
├── pages/           # Dashboard, Clients, Contracts, Notes, Revenues, Expenses, Login
├── services/        # API calls (axios)
├── contexts/        # AuthContext
├── types/           # TypeScript interfaces
└── components/      # Componentes reutilizáveis
```

## ✨ Funcionalidades

- ✅ Autenticação JWT (Login/Registro) com bcrypt
- ✅ CRUD completo de Clientes
- ✅ CRUD completo de Contratos
- ✅ CRUD completo de Notas Fiscais (geração e cadastro)
- ✅ Cálculo automático de taxas
- ✅ CRUD completo de Receitas
- ✅ CRUD completo de Despesas
- ✅ BFF (Backend For Frontend) para dashboard
- ✅ Validação de formulários com Zod + React Hook Form
- ✅ Docker e Docker Compose prontos
- ✅ Manifests Kubernetes incluídos

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose
- PostgreSQL (se executar localmente)

### Com Docker Compose (Recomendado)

```bash
# Clone o repositório
git clone <repo-url>
cd projeto-empresa

# Configure as variáveis de ambiente
cp backend/.env.example backend/.env

# Suba os containers
docker-compose up -d

# Execute as migrações do banco
docker-compose exec backend npx prisma migrate dev
```

Acesse:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **BFF**: http://localhost:3001

### Desenvolvimento Local

#### Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoints

### Autenticação
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/auth/login` | Login de usuário |
| POST | `/api/auth/register` | Registro de usuário |

### Clientes
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/clients` | Listar todos |
| GET | `/api/clients/:id` | Buscar por ID |
| POST | `/api/clients` | Criar |
| PUT | `/api/clients/:id` | Atualizar |
| DELETE | `/api/clients/:id` | Deletar |

### Contratos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/contracts` | Listar todos |
| GET | `/api/contracts/:id` | Buscar por ID |
| POST | `/api/contracts` | Criar |
| PUT | `/api/contracts/:id` | Atualizar |
| DELETE | `/api/contracts/:id` | Deletar |

### Notas Fiscais
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/notes` | Listar todas |
| GET | `/api/notes/:id` | Buscar por ID |
| POST | `/api/notes` | Criar/Gerar |
| PUT | `/api/notes/:id` | Atualizar |
| DELETE | `/api/notes/:id` | Deletar |
| POST | `/api/notes/calculate-taxes` | Calcular taxas |

### Receitas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/revenues` | Listar todas |
| GET | `/api/revenues/:id` | Buscar por ID |
| POST | `/api/revenues` | Criar |
| PUT | `/api/revenues/:id` | Atualizar |
| DELETE | `/api/revenues/:id` | Deletar |

### Despesas
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/expenses` | Listar todas |
| GET | `/api/expenses/:id` | Buscar por ID |
| POST | `/api/expenses` | Criar |
| PUT | `/api/expenses/:id` | Atualizar |
| DELETE | `/api/expenses/:id` | Deletar |

## 🔌 BFF (Backend For Frontend)

Endpoints otimizados para o frontend:

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/bff/dashboard` | Dados consolidados do dashboard |
| GET | `/bff/clients/:id/summary` | Resumo financeiro do cliente |

## ☸️ Deploy Kubernetes

```bash
# Aplicar os manifests na ordem
kubectl apply -f k8s/secrets.yaml
kubectl apply -f k8s/database.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

## 🛠️ Tecnologias

### Backend
- **Runtime**: Node.js 18+
- **Linguagem**: TypeScript
- **Framework**: Express
- **ORM**: Prisma
- **Banco**: PostgreSQL
- **Auth**: JWT + bcrypt
- **Validação**: Zod
- **HTTP Client**: Axios

### Frontend
- **Framework**: React 18
- **Build**: Vite
- **Linguagem**: TypeScript
- **Roteamento**: React Router DOM
- **HTTP**: Axios
- **Formulários**: React Hook Form + Zod
- **Datas**: date-fns

### DevOps
- **Containers**: Docker + Docker Compose
- **Orquestração**: Kubernetes
- **Proxy**: Nginx (frontend)

## 📦 Scripts Disponíveis

### Backend
```bash
npm run dev      # Desenvolvimento com hot-reload
npm run build    # Compila TypeScript
npm start        # Produção
npm test         # Testes com Jest
```

### Frontend
```bash
npm run dev      # Desenvolvimento com Vite
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Lint com ESLint
```

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` baseado no `.env.example`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/empresa_db"
JWT_SECRET="your-secret-key"
PORT=3000
BFF_PORT=3001
```

## 📄 Licença

MIT
