# Layout & Folder Structure Standards

This section defines the physical file structure for the OpenDND Framework. We adopt a **Service-Driven architecture** inspired by Next.js and Clean Architecture principles.

## Core Philosophy

1.  **Domain Co-location**: UI components specific to a route live *inside* that route's `ui/` folder.
2.  **Service Abstraction**: Components **never** import raw data. They always go through the `/service` layer.
3.  **Data Purity**: The `/data` folder is a static manifest. It contains types and constants, not functions.

## Directory Tree

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
│   ├── session.ts              # Authentication state management
│   └── [domain].ts             # Feature services (UserService, etc)
│
├── data/                       # Data Definitions & Static Content
│   ├── _types.ts               # Global system types
│   ├── app-*.ts                # System config & constants
│   ├── page-*.ts               # CMS-style flat content for pages
│   └── user-*.ts               # User schemas and initial mock records
│
├── lib/                        # Utility functions & 3rd party wrappers
└── public/                     # Static assets (Images, Fonts)
```

## Special Files

| Filename | Purpose |
| :--- | :--- |
| **`page.tsx`** | Main entry point for a URL route. |
| **`layout.tsx`** | Shared UI wrapper (Header/Sidebar) for a segment. |
| **`loading.tsx`** | Suspense boundary UI. |

## Data Flow Rules

1. **Top-Down**: `data` -> `service` -> `app`.
2. **Read-Only Data**: Data files export `DATA` constants. Services ingest this into the `MOCK_REGISTRY`.
3. **Registry Singleton**: Use `Services['collection']` to access data methods from anywhere in the app logic.
