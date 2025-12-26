
# OpenDND Framework: Data & Service Architecture

This document defines the standards for data management, service orchestration, and logical ownership within the OpenDND environment.

## 1. Centralized Service Architecture

All domain logic is centralized in the `/service` directory, ensuring a clear separation of concerns between the UI and the Data Layer.

### Core Structure
- **Data Definitions**: Types and Mock seeds reside in `data/`.
- **Business Logic**: CRUD operations and feature logic reside in `service/`.
- **UI Components**: Visuals reside in `app/`.

### Isolation Rules
- **No Direct Data Access**: UI components must never import `DATA` arrays directly. They must use the corresponding `Service`.
- **Service Registry**: All services are exported via `service/index.ts` or their specific modules.

---

## 2. The Data Tier Hierarchy

We partition data into four tiers to facilitate scaling and server-side transition:

### Tier 1: Infrastructure (`app-*.ts`)
- **Focus**: Global system settings and routing.
- **SPA Usage**: Central config for navigation and SEO.
- **Next.js Transition**: Constants used in `layout.tsx` or `middleware.ts`.

### Tier 2: Relational (`user-*.ts`)
- **Focus**: User-specific records and logs (Join Tables). Always includes `userId`.
- **SPA Usage**: Tracks specific user interactions (e.g., "User A has read Notification X").
- **Next.js Transition**: Maps directly to relational DB tables via an ORM (Prisma/Drizzle).

### Tier 3: Content (`page-*.ts`)
- **Focus**: Representational data (The "String Layer").
- **SPA Usage**: CMS-style content imported directly into page components.
- **Next.js Transition**: Stays as flat files or migrates to a Headless CMS (Strapi/Sanity).

### Tier 4: Master Entities (`[entity].ts`)
- **Focus**: Primary system objects (Users, Projects, Products).
- **SPA Usage**: The "Source of Truth" for system entities.

---

## 3. Migration Roadmap to Next.js

The framework is architected such that the transition to Next.js is primarily a "move and replace" operation:

| SPA Feature | Next.js Equivalent | Transition Path |
| :--- | :--- | :--- |
| `/app` Folders | `/app` Directory | Direct move. Replace `react-router-dom` with Next.js Link/Router. |
| `service/*.ts` | Server Actions | Move logic to `'use server'` functions. |
| `data/user-*.ts`| Database Schema | Convert interfaces to Prisma/Drizzle schemas. |
| `data/page-*.ts`| CMS / Flat Files | Keep as is or move to a proper CMS. |
| `service/provider.ts`| DB Adapter | Replace Mock Strategy with a live DB adapter. |

---

## 4. Logical Ownership Rules
1. **No raw data in UI**: Always fetch via a Service.
2. **User Isolation**: Any file prefixed with `user-*` **must** be consumed via a `UserScopedService`.
3. **Bitwise Logic**: Use bitwise flags for permissions and statuses (e.g., `UserRole.Admin | UserRole.User`).
4. **Standardized Responses**: Every service method returns a Promise of `IApiResponse<T>`.

---
*OpenDND Framework v2.0 - Decoupled for Migration.*
