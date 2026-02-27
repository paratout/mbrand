# bamoumehdi.com

Personal website for Mehdi Bamou — at the intersection of Business, Technology, and Governance.

Currently in **coming soon** mode.

## Stack

- **Frontend**: Angular 18 (standalone components, SCSS)
- **Hosting**: Firebase Hosting
- **Dev Environment**: Docker (no local Node required)

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
  app.component.ts      # Root component (renders HomeComponent)
  app.config.ts         # Angular app config
  components/
    home/               # Coming soon page
public/
  favicon.svg           # Custom SVG favicon
```

## License

Private — All rights reserved.
