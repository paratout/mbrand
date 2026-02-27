# bamoumehdi.com

Personal website for Mehdi Bamou — at the intersection of Business, Technology, and Governance.

Currently in **coming soon** mode with a newsletter signup wired to Firestore.

## Stack

- **Frontend**: Angular 18 (standalone components, SCSS)
- **Backend**: Firebase (Hosting, Firestore, Auth, Cloud Functions, Storage)
- **Dev Environment**: Docker (everything runs in containers — no local Node required)

## Getting Started

### Prerequisites

- Docker & Docker Compose

### Development

```bash
docker compose up
```

Open [http://localhost:4200](http://localhost:4200).

### Deploy to Production

```bash
docker compose run --rm angular-app sh -c "npm run deploy"
```

### First-Time Firebase Auth (inside container)

```bash
docker compose run --rm angular-app sh -c "npx firebase login --no-localhost"
```

## Project Structure

```
src/app/
  components/
    home/           # Coming soon page (current live page)
    hero/           # Full site hero section (WIP)
    about/          # Full site about section (WIP)
    pillars/        # Full site pillars section (WIP)
    insights/       # Blog/insights feed from Firestore (WIP)
    media/          # Media appearances from Firestore (WIP)
    contact/        # Contact form (WIP)
    navbar/         # Navigation bar (WIP)
    footer/         # Footer (WIP)
    login/          # Admin login
    admin-layout/   # Admin dashboard shell
    insights-manager/  # CMS for articles
    media-manager/     # CMS for media appearances
  guards/
    admin.guard.ts  # Route guard for admin panel
functions/          # Firebase Cloud Functions (contact form, newsletter)
```

## Admin Panel

Navigate to `/login` to access the admin CMS at `/admin`. Manage articles and media appearances that will feed the public-facing site.

## License

Private — All rights reserved.
