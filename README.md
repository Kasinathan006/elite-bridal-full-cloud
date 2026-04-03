# Bridal Connect

The Professional Network for India's Bridal Industry.

## Project Structure

- `apps/mobile`: React Native (Expo) mobile application.
- `apps/web`: Next.js 14 web application.
- `packages/api`: Fastify backend server.
- `packages/db`: Prisma schema and shared database client.

## Tech Stack

- **Database**: mysql (TiDB Cloud Zero - Live ☁️), Redis (IORedis), Cloudinary (Images).
- **Theme**: Premium Luxury Pink & White Aesthetic.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root with:
   ```env
   DATABASE_URL="your_postgresql_url"
   JWT_SECRET="your_secret"
   CLOUDINARY_URL="your_cloudinary_url"
   ```

3. Generate database client:
   ```bash
   npm run build --filter=@bridal-connect/db
   ```

4. Start development servers:
   ```bash
   npm run dev
   ```

## Implementation Plan (Phase 1 MVP)

- [x] **Layer 0: Foundation**
  - [x] Monorepo initialization
  - [x] Prisma schema design
  - [x] Fastify server setup
  - [x] Initial premium UI for Web & Mobile
- [ ] **Layer 1: Profile System**
  - [ ] Profile creation wizard
  - [ ] Portfolio photo upload
  - [ ] Artist discovery search
- [ ] **Layer 2: Search & Discovery**
- [ ] **Layer 3: Project Cards & Collaboration**
- [ ] **Layer 4: Bookings & CRM**
