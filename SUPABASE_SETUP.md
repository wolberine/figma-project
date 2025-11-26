# Supabase Setup Guide

To make the application work, you need to set up a Supabase project.

## 1. Create Project
1.  Go to [database.new](https://database.new) and create a new project.
2.  Wait for the database to start.

## 2. Create Table (SQL Editor)
Go to the **SQL Editor** in the left sidebar and run this script:

```sql
create table vaults (
  id text primary key,
  code text not null,
  title text not null,
  description text,
  apy text,
  tvl text,
  inception text,
  risk text,
  category text,
  incentivized boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table vaults enable row level security;

-- Policy: Everyone can read vaults
create policy "Public vaults are viewable by everyone"
  on vaults for select
  to public
  using (true);

-- Policy: Only authenticated users can insert/update/delete
create policy "Authenticated users can modify vaults"
  on vaults for all
  to authenticated
  using (true);
```

Then run the seed data from `SEED_DATA.sql` to populate the vaults table.

### Create Phases Table

Run this script to create the phases table for the "How It Works" carousel:

```sql
create table phases (
  id text primary key,
  step_number integer not null,
  title text not null,
  description text not null,
  image text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table phases enable row level security;

-- Policy: Everyone can read phases
create policy "Public phases are viewable by everyone"
  on phases for select
  to public
  using (true);

-- Policy: Only authenticated users can insert/update/delete
create policy "Authenticated users can modify phases"
  on phases for all
  to authenticated
  using (true);
```

Then run the seed data from `SEED_DATA_PHASES.sql` to populate the phases table.


## 3. Get API Keys
1.  Go to **Project Settings** (cog icon) -> **API**.
2.  Copy the `Project URL`.
3.  Copy the `anon` `public` key.

## 4. Connect to Vercel
In your Vercel project settings, go to **Environment Variables** and add:

- `VITE_SUPABASE_URL`: (Paste Project URL)
- `VITE_SUPABASE_ANON_KEY`: (Paste anon key)

## 5. Local Development
Create a `.env` file in the root of your project:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```
