# VT Shop — Full-Stack Seafood E-Commerce Platform

> A production-ready, full-stack e-commerce application for a seafood brand — built with modern architecture, real payment processing, and a complete admin panel.

---

## Live Features at a Glance

| | Feature |
|---|---|
| **Shopping** | Product catalog with search, filtering & sorting |
| **Cart** | Persistent cart for both guests and authenticated users |
| **Payments** | Real Stripe integration with webhooks & order status sync |
| **Auth** | JWT + HTTP-only cookie refresh tokens with role-based access |
| **Admin** | Full product & order management with image uploads to Cloudinary |
| **Notifications** | Telegram bot notifications on new orders |
| **i18n** | Multi-language support (Ukrainian / English) |
| **UX** | Mobile-first responsive design, lazy-loaded pages, scroll restoration |

---

## Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| **React 19** + TypeScript | UI layer with strict typing |
| **Vite 7** | Lightning-fast build tool with code splitting |
| **Redux Toolkit** + RTK Query | State management & API caching with tag-based invalidation |
| **React Router 7** | Client-side routing with lazy loading & auth loaders |
| **Tailwind CSS 4** + shadcn/ui | Utility-first styling with accessible Radix UI components |
| **React Hook Form** + Yup | Performant forms with schema validation |
| **i18next** | Internationalization (UA/EN) |
| **Swiper** | Touch-friendly carousels |
| **Sonner** | Toast notifications |

### Backend

| Technology | Purpose |
|-----------|---------|
| **Node.js** + **Express 5** + TypeScript | REST API server |
| **MongoDB** + **Mongoose** | Document database with typed schemas |
| **JWT** (access + refresh) | Stateless authentication |
| **Stripe** | Payment processing with webhook verification |
| **Cloudinary** + Multer | Cloud image storage |
| **Helmet** + **express-rate-limit** | Security hardening |
| **Telegram Bot API** | Order notification system |
| **Jest** + Supertest | API testing |

---

## Architecture

### Client — Feature-Sliced Design (FSD)

The frontend follows an FSD-inspired architecture for clean separation of concerns and scalability:

```
client/src/
├── app/          # App bootstrap: store, router, providers, initialization
├── shared/       # Framework-agnostic utilities, base API, config, hooks
├── entities/     # Domain models & RTK Query endpoints
│   ├── product/
│   ├── cart/
│   ├── order/
│   ├── wishlist/
│   └── address/
├── features/     # User-facing interactions
│   ├── auth/         # Login, register, JWT slice
│   ├── guestCart/    # localStorage-backed guest cart
│   ├── bag/          # Cart drawer state
│   └── productItem/  # Product card component
├── widgets/      # Composite sections: Header, Footer, Profile widgets
├── pages/        # Route-level page components
└── i18n/         # Translation files (ua.json / en.json)
```

### Server — Versioned REST API

```
server/src/
├── v1/
│   ├── controllers/   # Request handlers (auth, products, cart, orders, stripe...)
│   ├── routes/        # Express route definitions
│   ├── models/        # Mongoose models (User, Product, Cart, Order, RefreshToken)
│   ├── services/      # Business logic (Stripe, Telegram, product ops)
│   ├── validators/    # express-validator schemas
│   └── dtos/          # Data transfer objects
├── middlewares/       # Auth, role checking, upload, validation
├── config/            # JWT, Cloudinary, env
└── db/                # MongoDB connection
```

---

## Key Features in Depth

### Guest Cart
Non-authenticated users can browse and add items to cart. The guest cart is stored in Redux (persisted to `localStorage`) and automatically **merged into the user's server-side cart** upon login — zero friction shopping experience.

### Authentication Flow
```
Login → Access Token (Redux memory) + Refresh Token (HTTP-only cookie)
         ↓
    401 on any request
         ↓
    POST /api/v1/auth/refresh (cookie sent automatically)
         ↓
    New access token → retry original request (async-mutex prevents race conditions)
```

### Stripe Payment Flow
```
User submits order → Order created (paymentStatus: "unpaid")
    ↓
POST /api/v1/stripe/:orderId/checkout → Stripe Checkout Session
    ↓
User completes payment on Stripe hosted page
    ↓
Stripe webhook → POST /api/v1/stripe/webhook (signature verified)
    ↓
Order status updated → paymentStatus: "paid"
    ↓
User redirected to /order/success
```

### Role-Based Access Control
- `USER` — shopping, profile, orders, wishlist
- `ADMIN` — all of the above + product CRUD, order management, admin dashboard

Protected routes use React Router loaders that verify the JWT role before rendering — the server also enforces role checks on every admin endpoint.

---

## API Reference

```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout
GET    /api/v1/auth/me

GET    /api/v1/products          # search, category, sort filters
GET    /api/v1/products/:id
POST   /api/v1/products          # ADMIN
PUT    /api/v1/products/:id      # ADMIN
DELETE /api/v1/products/:id      # ADMIN

GET    /api/v1/cart
POST   /api/v1/cart/:productId
PATCH  /api/v1/cart/:productId
DELETE /api/v1/cart/:productId
DELETE /api/v1/cart

GET    /api/v1/wishlist
POST   /api/v1/wishlist/:productId
DELETE /api/v1/wishlist/:productId

GET    /api/v1/addresses
POST   /api/v1/addresses
PUT    /api/v1/addresses/:id
DELETE /api/v1/addresses/:id

GET    /api/v1/orders
POST   /api/v1/orders
GET    /api/v1/orders/:id

POST   /api/v1/stripe/:orderId/checkout
POST   /api/v1/stripe/webhook

POST   /api/v1/telegram/notify
```

---

## Data Models

### Order
```typescript
{
  userId?:          ObjectId          // null for guest orders
  items:            [{ productId, title, price, quantity }]
  deliveryAddress:  { city, street, apartment, ... }
  deliveryType:     "pickup" | "delivery" | "courier"
  paymentType:      "cash" | "online"
  status:           "pending" | "processing" | "delivered" | "cancelled"
  paymentStatus:    "unpaid" | "paid" | "failed"
  stripeSessionId?: string
  total:            number
  deliveryCost:     number
}
```

### User
```typescript
{
  email:     string (unique)
  password:  string (bcrypt hashed)
  name:      string
  role:      "USER" | "ADMIN"
  wishlist:  ObjectId[]
  addresses: IAddress[]
}
```

---

## Pages

| Route | Page | Auth |
|-------|------|------|
| `/` | Home — hero slider, featured products | Public |
| `/products/list` | Catalog — search, filter, sort | Public |
| `/products/:id` | Product details — specs, cart, wishlist | Public |
| `/cart` | Shopping cart — quantity management | Public |
| `/order` | Checkout — delivery & payment | Public |
| `/order/success` | Payment confirmation | Public |
| `/order/cancel` | Payment cancelled | Public |
| `/profile` | Order history | USER |
| `/profile/favorite` | Wishlist | USER |
| `/profile/address` | Saved addresses | USER |
| `/admin` | Product management | ADMIN |
| `/admin/orders` | Order management | ADMIN |
| `/admin/login` | Admin login | Public |

---

## Project Structure (Root)

```
shop/
├── client/          # React frontend (Vite)
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Express backend
│   ├── src/
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB instance
- Stripe account
- Cloudinary account

### Environment Variables

**`server/.env`**
```env
PORT=
MONGODB_URI=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
TELEGRAM_BOT_TOKEN=
CLIENT_URL=
```

**`client/.env`**
```env
VITE_PORT=http://localhost:5000
```

### Run Locally

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (new terminal)
cd client
npm install
npm run dev
```

### Build for Production

```bash
# Backend
cd server && npm run build && npm start

# Frontend
cd client && npm run build
```

### Run Tests

```bash
cd server && npm test
```

---

## Engineering Highlights

- **Zero-dependency guest checkout** — users can complete a full purchase without creating an account
- **Secure auth** — HTTP-only cookies for refresh tokens, short-lived access tokens in memory only
- **Optimistic UI** — RTK Query tag invalidation keeps cart, wishlist and order data in sync without manual refetching
- **Race condition prevention** — `async-mutex` ensures only one token refresh request runs at a time during parallel API calls
- **Webhook-driven payment state** — Stripe order status is updated server-side via verified webhooks, not client redirects
- **Image pipeline** — uploads go through Multer → Cloudinary, returning a CDN URL stored in MongoDB
- **Performance** — all pages are lazy-loaded via Vite code splitting; initial bundle is minimal

---

## Status

> **Production-ready MVP** — core shopping flow, payments, authentication, and admin panel are fully functional.
