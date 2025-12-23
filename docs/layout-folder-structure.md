# Layout & Folder Structure Standards

This document defines the physical file structure and coding etiquette for the OpenDND Framework. We adopt a **Service-Driven architecture** designed for extreme modularity, AI-readiness, and backend-agnosticism.

## 1. Core Philosophy

1.  **Domain Co-location**: UI components specific to a route live *inside* that route's `ui/` folder.
2.  **Service Abstraction**: Components **never** import raw data or use `fetch`. They always go through the `/service` layer.
3.  **Data Purity**: The `/data` folder is a static manifest. It contains types and constants, not functions.

---

## 2. Directory Tree

```text
/
├── app/                        # UI Source (React Components)
│   ├── (public)/               # Publicly accessible routes
│   ├── (admin)/                # Protected dashboard routes
│   ├── (auth)/                 # Login/Signup flows
│   └── ui/                     # Global shared UI (Atomic: Button, Card)
│
├── service/                    # Business Logic (THE API LAYER)
│   ├── index.ts                # Global Service Registry & Factories
│   ├── provider.ts             # Data Provider Strategy (Mock/Real)
│   ├── [domain].ts             # Feature services (UserService, etc)
│   └── strategy-*.ts           # Data strategies (Memory, Strapi)
│
├── data/                       # Data Definitions & Static Content
│   ├── _types.ts               # Global system types
│   ├── app-*.ts                # System config & constants
│   ├── page-*.ts               # CMS-style flat content for pages
│   └── [domain].ts             # Types & initial mock records
│
├── config/                     # System Configuration
│   └── service.ts              # THE MASTER SWITCH (Strategy selection)
│
├── lib/                        # Utility functions & AI logic
└── docs/                       # Architectural Manifests
```

---

## 3. Naming Conventions & Etiquette

To maintain a clean and searchable codebase, we adhere to strict naming patterns:

### A. Interface Naming
All interfaces **MUST** be prefixed with a capital `I`.
- **Correct**: `interface IUser`, `interface IAppConfig`.
- **Incorrect**: `interface User`, `interface AppConfig`.

### B. Bitwise Flags
Any enum or number used for bitwise permissions or state toggles **MUST** end with the word `Flags`.
- **Correct**: `enum UserStatusFlags`, `enum AppRouteFlags`.
- **Incorrect**: `enum UserStatus`, `enum RoutePermissions`.

### C. Service Exports
Services should be exported as a named constant following the `[Domain]Service` pattern.
- **Correct**: `export const ProjectService = ...`
- **Incorrect**: `export default createService(...)`

---

## 4. Modularity: Adding a New Domain

The framework uses a **"Three-Point-Touch"** system for adding features. If you want to add "Tasks":

### Step 1: Data Definition (`data/tasks.ts`)
Define the shape and initial state.
```typescript
export interface ITask {
  id: string;
  title: string;
  flags: TaskStatusFlags;
}

export enum TaskStatusFlags {
  None = 0,
  IsCompleted = 1 << 0,
  IsArchived = 1 << 1,
}

export const DATA: ITask[] = [{ id: 't1', title: 'Setup Framework', flags: TaskStatusFlags.IsCompleted }];
```

### Step 2: Service Orchestration (`service/tasks.ts`)
Create the CRUD bridge and register seeds.
```typescript
import { DATA, ITask } from '../data/tasks.ts';
import { createService, registerInitialData } from './index.ts';

const COLLECTION = 'tasks';
registerInitialData(COLLECTION, DATA); // Deferred seeding

export const TaskService = createService<ITask>(COLLECTION);
```

### Step 3: UI Implementation (`app/dashboard/tasks/page.tsx`)
Consume the service safely.
```typescript
const fetchTasks = async () => {
  const res = await TaskService.findAll();
  if (res.data) setTasks(res.data);
};
```

---

## 5. The "Ten Commandments" of Code Etiquette

1.  **Thou Shalt Not Fetch in Components**: All network logic must be abstracted into a Service.
2.  **No Naked Arrays**: Always wrap API returns in `IApiResponse<T>` to handle status and errors gracefully.
3.  **Default to Memory**: Always develop new features using the `MemoryStrategy` first to ensure the UI is perfect before the API exists.
4.  **Use registerInitialData**: Never manually populate state in a service; use the registration system to support deferred seeding.
5.  **Bitwise over Booleans**: For multi-state entities, use `Flags` instead of multiple boolean flags (e.g., `status: UserStatusFlags` vs `isActive: boolean, isPending: boolean`).
6.  **Registry-First**: Use the `Services` registry in `service/index.ts` to ensure singleton instances.
7.  **Deferred Initialization**: Ensure `bootstrapProvider()` is the first thing called in `index.tsx`.
8.  **Atomic UI**: Components in `app/ui` must be stateless and highly reusable.
9.  **Domain Isolation**: `UserService` should never directly modify `TaskService` data; it should interact via the public API.
10. **Standardized Responses**: Every service method MUST return a Promise of `IApiResponse`.

---

## 6. Data Flow Rules

1.  **Top-Down Execution**: `data` (Definition) -> `service` (Logic) -> `app` (View).
2.  **Single Source of Truth**: The `MEMORY_REGISTRY` is the global state for the local strategy.
3.  **Backend Agnosticism**: Switching the strategy in `config/service.ts` must never require a change to the UI layer.

*OpenDND Framework - Architecture for Longevity.*