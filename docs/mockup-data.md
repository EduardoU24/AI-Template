# Mockup Data Architecture

This section defines the architecture and naming conventions for the Mockup Data Layer in the Framework.

## Core Concept
The application simulates a backend-less environment by using structured mock data files and a simulated API layer. This allows for rapid frontend prototyping without dependency on a real database service.

## File Naming Conventions

### 1. Infrastructure Files (`/data/_mockup.*.ts`)
Files prefixed with `_mockup` form the core logic of the fake backend.
*   **`_mockup.data.ts`**: The "Database". Aggregates all specific data files.
*   **`_mockup.api.ts`**: The "Network Layer". Simulates HTTP methods and latency.
*   **`_mockup.service.ts`**: The "Business Logic". Services that consume the mock API.

### 2. App Definition Files (`/data/app-*.ts`)
Static or semi-static data related to application configuration.
*   **`app-configs.ts`**: Parameterized system settings and flags.
*   **`app-terms.ts`**: Versioned legal documents.
*   **`app-routes.ts`**: Application routing table.

### 3. Page Content Files (`/data/page-*.ts`)
These files act as a flat-file CMS. They contain parametrized text, labels, and configuration for specific UI pages. This separates the "View" (React) from the "Content" (Strings/Config).

*   **`page-landing.ts`**: Content for the public landing page (Hero text, feature lists, marketing copy).
*   **`page-admin-dashboard.ts`**: Labels and configurations for the admin dashboard (Chart titles, Welcome messages).

**Example Structure:**
```typescript
export const LANDING_PAGE_CONTENT = {
  hero: {
    title: "My App",
    description: "The best app ever."
  },
  features: [ ... ]
}
```

### 4. User & Relation Files (`/data/user-*.ts` & `/data/users.ts`)
User-generated content or user-specific relationships.
*   **`users.ts`**: The master list of user accounts.
*   **`user-terms.ts`**: Relational log mapping Users to accepted Terms.

## Data Rules

### Date Normalization
*   **`createdAt`**: ISO Date string (Created).
*   **`updatedAt`**: ISO Date string (Modified).

### Contextual Flags
Define Enums and Bitwise flags in the file where the data structure is defined (e.g., `UserRole` in `users.ts`).
