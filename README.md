# Advanced CRM Dashboard

A production-style customer management dashboard built from the supplied CRM task specification.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui-style components powered by Radix UI
- TanStack Query for fetching, caching and mutation state
- dnd-kit for accessible drag-and-drop reordering
- MongoDB
- React Hook Form + Zod validation
- Sonner toast notifications

## Features implemented

- Responsive CRM dashboard and sidebar
- Customer table with name, email, phone, company, status and last-contact date
- Debounced real-time search by name, email and company
- Server-side sorting and pagination (10 / 25 / 50)
- Advanced filters: status, company, date range, phone and email
- Saved custom filters and pre-built templates
- Active filter count and clear-all behavior
- Add/edit customer modal with inline validation
- Customer detail modal and delete confirmation
- TanStack Query caching, loading/error-friendly states and refetch after mutations
- dnd-kit row reordering interaction
- CSV export of the current filtered page
- Dark/light theme toggle
- Cmd/Ctrl + K opens filters
- Opt-in fictional seed data for 150 customers when `CRM_DEMO_MODE=true`

## Run locally

1. Install Node.js 20+ and MongoDB.
2. Copy `.env.example` to `.env.local`.
3. Start MongoDB.
4. Run:

```bash
npm install
npm run dev