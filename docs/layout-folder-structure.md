# Layout & Folder Structure: Next.js Parity Standard

This document defines the physical file structure and coding etiquette for the OpenDND Framework. We adopt a **Next.js App Router inspired architecture** to ensure modularity and a seamless migration path to a full Next.js framework.

## 1. Core Philosophy: The "App Router" Path

1.  **Directory-Based Routing**: The folder hierarchy in `/app` directly maps to the URL path.
2.  **Special File Conventions**: Specific filenames define roles within a route segment.
3.  **Domain Co-location (Plugin Pods)**: Complex features live in `/plugins/[domain]`, keeping UI, Services, and Data together.
4.  **Service Abstraction**: Components **never** import raw data; they always go through the `/service` layer.

---

## 2. Specialized Filenames

To ensure compatibility with Next.js, use these naming conventions within `/app`:

| Filename | Purpose | SPA Behavior (React Router) | Next.js Equivalent |
| :--- | :--- | :--- | :--- |
| **`page.tsx`** | Route Entry | The main UI component for the route. | The public entry point. |
| **`layout.tsx`** | Wrapper | Shared UI (Nav, Sidebar) that persists. | Root or Nested Layout. |
| **`loading.tsx`** | Suspense | Manual loading state or spinner. | Automatic Suspense boundary. |
| **`error.tsx`** | Recovery | Error boundary for the segment. | Automatic Error boundary. |

---

## 3. The Data Prefix Taxonomy (`/data`)

The `/data` folder uses a strict prefixing convention to separate system config from user data and page content.

### A. The `app-*` Prefix (System Infrastructure)
These files contain global constants that dictate system behavior.
- **Purpose**: Routing tables, global configurations, legal term manifests.
- **Example**: `app-routes.ts`, `app-configs.ts`.
- **Rule**: Changing these usually affects the entire application structure.

### B. The `user-*` Prefix (User Relations)
These files simulate "Join Tables" or activity logs specific to individuals.
- **Purpose**: Mapping users to read notifications, accepted terms, or custom preferences.
- **Example**: `user-notifications.ts`, `user-terms.ts`.
- **Rule**: Must contain a `userId` property and be consumed via `createUserScopedService`.

### C. The `page-*` Prefix (Content/CMS)
These files act as a flat-file CMS to decouple UI strings from component logic.
- **Purpose**: Hero text, feature lists, pricing labels, and descriptive copy.
- **Example**: `page-landing.ts`, `page-admin-dashboard.ts`.
- **Rule**: Components should import these to keep the JSX clean and translation-ready.

---

## 4. Directory Tree

```text
/
├── app/                        # Next.js App Router Structure
│   ├── (public)/               # Route Group: Public facing pages
│   │   ├── layout.tsx          # Public Nav + Footer
│   │   └── page.tsx            # Route: /
│   ├── (admin)/                # Route Group: Dashboard features
│   │   ├── layout.tsx          # Admin Sidebar + Header
│   │   ├── dashboard/          
│   │   │   ├── blog/       
│   │   │   │   └── page.tsx    # Route: /dashboard/projects
│   │   │   └── users/
│   │   │       ├── page.tsx    # Route: /dashboard/users
│   │   │       └── ui/         # Co-located UI for Users page
│   └── ui/                     # Global Atomic UI (Button, Input)
│
├── plugins/                    # Modular Pods (Self-contained)
│   └── [plugin-name]/
│       ├── index.ts            # Public API (Entry Point)
│       ├── data.ts             # Types (IPrefix) & Seeds
│       ├── service.ts          # Logic & Data Registration
│       └── ui/                 # Feature-specific components
│
├── service/                    # Global Business Logic
└── data/                       # Mock DB & CMS Manifests
```

---
*OpenDND Framework - Built for the Future, Ready for Next.js.*