# Supabase Setup for Contact Form

This project saves contact form submissions to a Supabase database.

## 🚀 Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create an account (if you don't have one)
2. Create a new project
3. Wait for the project to be fully provisioned

### 2. Create the Database Table

In your Supabase dashboard, go to the SQL Editor and run this SQL to create the `contact_submissions` table:

```sql
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Optional: Enable Row Level Security (RLS) for better security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for the contact form)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Optional: Create a policy that only authenticated users can read
-- CREATE POLICY "Allow authenticated reads" ON contact_submissions
--   FOR SELECT
--   TO authenticated
--   USING (true);
```

### 3. Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (this is your `NEXT_PUBLIC_SUPABASE_URL`)
3. Copy your **anon/public key** (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 4. Set Environment Variables

Create or update your `.env.local` file in the project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Never commit your `.env.local` file to version control!

### 5. Install Dependencies

Run the following command to install the Supabase client:

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
# or
pnpm add @supabase/supabase-js
```

### 6. Test the Form

1. Start your development server: `npm run dev`
2. Navigate to the contact form on your site
3. Fill out and submit the form
4. Check your Supabase dashboard → **Table Editor** → `contact_submissions` to see the submission

## 📊 Viewing Submissions

You can view all contact form submissions in your Supabase dashboard:

1. Go to **Table Editor** in your Supabase dashboard
2. Select the `contact_submissions` table
3. You'll see all submissions with:
   - `id`: Unique identifier
   - `name`: Submitter's name
   - `email`: Submitter's email
   - `message`: The message content
   - `created_at`: Timestamp of submission

## 🔒 Security Notes

- The `anon` key is safe to use in client-side code (it's public)
- Row Level Security (RLS) is enabled by default
- Only INSERT operations are allowed for public users
- Consider adding authentication if you want to restrict who can read submissions

## 🗑️ Removing EmailJS (Optional)

If you want to completely remove EmailJS from your project:

1. Remove the dependency from `package.json`:
   ```bash
   npm uninstall @emailjs/browser
   ```

2. Delete the `EMAILJS_SETUP.md` file (optional)

3. Remove any EmailJS environment variables from `.env.local`:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

## 🐛 Troubleshooting

### "Supabase URL and Anon Key must be set"
- Make sure your `.env.local` file exists and contains both variables
- Restart your development server after adding environment variables
- Check that variable names start with `NEXT_PUBLIC_` (required for client-side access)

### "relation 'contact_submissions' does not exist"
- Make sure you've run the SQL script to create the table in your Supabase dashboard

### Form submissions not appearing
- Check the browser console for errors
- Verify your Supabase credentials are correct
- Check that RLS policies allow INSERT operations

## 📝 Next Steps

- Set up email notifications when new submissions arrive (using Supabase Edge Functions)
- Add form validation on the backend
- Create an admin dashboard to view submissions
- Export submissions to CSV/Excel

