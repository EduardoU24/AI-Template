# Layout & Folder Structure Standards

This section defines the physical file structure for the Framework. We adopt a **Next.js App Router** inspired architecture to ensure modularity, scalability, and code co-location.

## Core Philosophy

1.  **Route-based Folders**: The folder hierarchy in `/app` directly maps to the URL path.
2.  **Co-location**: UI components, helpers, and styles specific to a route live *inside* that route's folder.
3.  **Shared UI**: Generic, atomic components used across multiple routes live in `/app/ui`.
4.  **Special Files**: We use specific filenames (`page.tsx`, `layout.tsx`) to define the role of a component.

## Directory Tree

```text
/
├── app/                        # Main Application Source
│   ├── (public)/               # Route Group: Public facing pages
│   │   ├── layout.tsx          # Public layout (Navbar + Footer)
│   │   ├── page.tsx            # Route: / (Landing Page)
│   │   ├── login/              
│   │   │   └── page.tsx        # Route: /login
│   │   └── about/
│   │       ├── page.tsx        # Route: /about
│   │       └── ui/             # Co-located UI components for About page
│   │           └── TeamGrid.tsx
│   │
│   ├── (admin)/                # Route Group: Authenticated dashboard
│   │   ├── layout.tsx          # Admin layout (Sidebar + Header)
│   │   ├── dashboard/          
│   │   │   ├── page.tsx        # Route: /dashboard (Stats view)
│   │   │   └── users/
│   │   │       ├── page.tsx    # Route: /dashboard/users (List)
│   │   │       └── ui/         # Co-located UI (UserTable, UserForm)
│   │
│   ├── ui/                     # GLOBAL SHARED UI for Atomic components (Button, Input, Badge)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── debug-menu.tsx      # System-wide debug tools
│   │
│   └── types.ts                # Global Type Definitions
│
├── data/                       # Mock Data, Page Content & Definitions
├── lib/                        # Utility functions & Third-party wrappers (AI, Formatters)
└── services/                   # (Deprecated) moved to /lib or /data
```

## File Conventions

| Filename | Purpose |
| :--- | :--- |
| **`page.tsx`** | The UI unique to a route. This is the main entry point for a URL. |
| **`layout.tsx`** | UI shared between a segment and its children. Preserves state on navigation. |
| **`loading.tsx`** | Loading UI (Suspense boundary) to show while the page's data is fetching. |
| **`error.tsx`** | Error UI (Error Boundary) to show if the segment crashes. |

## The `ui/` Subfolders

### Local (`app/dashboard/ui/`)
Components that are **only** used within a specific feature/route **must** be placed in a `ui/` subfolder within that route.
*Example*: `RevenueChart.tsx` specific to the dashboard.

### Global (`app/ui/`)
Components used across the entire application (buttons, inputs, cards) or structural elements not tied to a specific business domain.