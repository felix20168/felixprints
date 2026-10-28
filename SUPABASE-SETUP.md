# Felixprints Supabase setup

The project is already connected to the Supabase project `sjchat`.

1. Open `/admin.html` on the deployed site.
2. Create an account with the email/password you want to use for the studio.
3. Copy the UUID shown in the “Admin access pending” message.
4. In Supabase SQL Editor, run:

```sql
insert into public.fp_admin_users (user_id)
values ('PASTE-USER-UUID-HERE');
```

After signing in again, the dashboard can manage products, prices, filament colours, stock visibility, request statuses, and private custom-design uploads.

The browser only contains the publishable key. No service-role key is used in the site.
