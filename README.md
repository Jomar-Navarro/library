# Libreria Digitale

A personal digital library built as a technical exercise for Belka. Browse 70,000+ public domain books from Project Gutenberg, build your personal collection, and leave ratings and notes.

## Tech Stack

- **Next.js 16.2** — App Router, Server Components, Route Groups
- **TypeScript** — full type safety across models, services and components
- **Tailwind CSS v4** — utility-first styling
- **Supabase** — authentication (email/password + anonymous) and Postgres database
- **Gutendex API** — REST API for Project Gutenberg books (no key required)
- **Lucide React** — icons

## Features

- **Catalogue** — live search by title, author or genre with pagination
- **Book detail** — cover, summary, metadata (year, language, downloads, Gutenberg ID), genre pills
- **Add to collection** — modal with optional 1–5 star rating and comment
- **My collection** — personal grid with ratings, notes and remove button
- **Authentication** — email/password sign up/login, or continue as guest (anonymous session)
- **Persistent data** — collection stored per-user in Supabase Postgres with Row Level Security
- **Route protection** — unauthenticated users are redirected to `/login`

## Architecture

```
app/
├── (auth)/login/        # Public route — no header/footer
├── (main)/              # Protected routes — Header + Footer + AuthGuard
│   ├── page.tsx         # Homepage with live search
│   ├── collection/      # User's collection page
│   └── book/[id]/       # Book detail page
├── api/books/           # Route handlers proxying Gutendex (with 5-min cache)
└── layout.tsx           # Root layout — AuthProvider only

components/
├── BookCard.tsx          # Reusable book cover card (hideMeta prop for detail page)
├── BookDetails.tsx       # Full book detail view (client component)
├── CollectionGrid.tsx    # Collection grid with empty state
├── AddToCollectionModal  # Star rating + comment modal
├── NavLinks.tsx          # Header navigation with collection counter + user avatar
└── AuthGuard.tsx         # Redirects unauthenticated users to /login

context/
├── AuthContext.tsx       # Supabase session state (user, signOut)
└── CollectionContext.tsx # Collection CRUD — reads/writes Supabase, syncs on auth change

lib/
└── supabase.ts           # Supabase client singleton

service/
└── booksService.ts       # searchBooks (client), getBook (server — calls Gutendex directly)
```

## Data Flow

- **Search**: client calls `/api/books?query=` → route handler fetches Gutendex and caches 5 min
- **Book detail**: Server Component calls Gutendex directly (no relative URL needed server-side)
- **Collection**: client component reads from Supabase via React Context; writes upsert on add, delete on remove
- **Auth state**: `onAuthStateChange` listener in `AuthContext` propagates to `CollectionContext` which refetches the user's collection on every login/logout

## Database Schema

```sql
create table collection (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  book_id integer not null,
  book_data jsonb not null,
  rating smallint check (rating >= 1 and rating <= 5),
  comment text,
  added_at timestamp with time zone default now(),
  unique(user_id, book_id)
);

alter table collection enable row level security;
create policy "Users manage their own collection"
  on collection for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## API Rate Limits

Gutendex allows ~1,000 requests/day on the free tier. All API route handlers use `next: { revalidate: 300 }` (5-minute cache) to stay well within this limit.

---

_Built with Next.js 16 + Supabase — June 2026_
