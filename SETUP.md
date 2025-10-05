# Setup Guide for Mehdi Bamou Personal Website

## Prerequisites

- Node.js 18+ and npm
- Cloudflare account
- Supabase account (for contact form)
- GitHub account (for CI/CD)

## Local Development Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Run development server:**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:4321`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Supabase Setup

### Create Contact Submissions Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for better query performance
CREATE INDEX idx_contact_submissions_submitted_at 
  ON contact_submissions(submitted_at DESC);
```

### Get Supabase Credentials

1. Go to your Supabase project settings
2. Navigate to API section
3. Copy the Project URL and anon/public key
4. Add them to your `.env` file

## Cloudflare Pages Deployment

### Manual Deployment

```bash
npm run build
wrangler pages deploy dist --project-name=mbrand
```

### Automatic Deployment via GitHub Actions

1. **Set up GitHub Secrets:**
   
   Go to your repository Settings → Secrets and variables → Actions
   
   Add these secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

2. **Get Cloudflare API Token:**
   - Go to Cloudflare Dashboard → My Profile → API Tokens
   - Create a token with "Cloudflare Pages" permissions
   
3. **Get Cloudflare Account ID:**
   - Go to Cloudflare Dashboard
   - Select your domain
   - Account ID is in the right sidebar

4. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy website"
   git push origin main
   ```
   
   GitHub Actions will automatically build and deploy to Cloudflare Pages.

### Configure Environment Variables in Cloudflare

1. Go to Cloudflare Pages dashboard
2. Select your project (mbrand)
3. Go to Settings → Environment variables
4. Add:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

## Content Management

### Adding Blog Posts

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Brief description"
   date: 2024-01-01
   image: "/blog/your-image.jpg"
   tags: ["Tag1", "Tag2"]
   draft: false
   ---
   ```
3. Write your content in Markdown
4. Build and deploy

### Updating Speaking Engagements

Edit `src/pages/speaking.astro` and update the `speakingEngagements` array.

### Modifying Services

Edit `src/pages/expertise.astro` to update service offerings.

## Customization

### Colors

Edit `tailwind.config.cjs` to change the color scheme:
- `primary`: Deep blue (#1E3A8A)
- `secondary`: Warm orange (#F59E0B)

### Typography

Fonts are configured in `src/styles/global.css`:
- Headings: Montserrat
- Body: Open Sans

### SEO

Update meta tags in `src/layouts/BaseLayout.astro` for each page.

## Performance Optimization

### Images

- Store images in `public/` directory
- Use WebP format when possible
- Optimize images before uploading (use tools like ImageOptim)

### Lighthouse Score

Run Lighthouse audits regularly:
```bash
npm run build
npm run preview
# Then run Lighthouse in Chrome DevTools
```

Target scores:
- Performance: ≥95
- Accessibility: ≥95
- Best Practices: ≥95
- SEO: ≥95

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear cache: `rm -rf node_modules .astro dist`
2. Reinstall: `npm install`
3. Rebuild: `npm run build`

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is active
- Ensure RLS policies are configured properly

### Deployment Issues

- Check GitHub Actions logs for errors
- Verify Cloudflare credentials are correct
- Ensure build completes successfully locally first

## Support

For questions or issues:
- Check Astro documentation: https://docs.astro.build
- Check Cloudflare Pages docs: https://developers.cloudflare.com/pages
- Check Supabase docs: https://supabase.com/docs

## License

Copyright © 2024 Mehdi Bamou. All rights reserved.
