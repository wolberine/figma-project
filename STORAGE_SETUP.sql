-- Create storage bucket for carousel images
insert into storage.buckets (id, name, public)
values ('carousel-images', 'carousel-images', true);

-- Allow public read access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'carousel-images' );

-- Allow authenticated users to upload
create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'carousel-images' AND auth.role() = 'authenticated' );

-- Allow authenticated users to delete
create policy "Authenticated users can delete"
on storage.objects for delete
using ( bucket_id = 'carousel-images' AND auth.role() = 'authenticated' );
