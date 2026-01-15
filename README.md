# 🛒 Shop — Full-Stack E-commerce Application

A full-stack e-commerce application with an admin panel.  
The project is built using an **API-first approach** with a clear separation between frontend and backend.

---

## 🚀 Tech Stack

### Frontend
- React
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- Express
- TypeScript
- JWT Authentication
- Multer (image upload)

### Database
- PostgreSQL (planned)
- ORM: Prisma (planned)

---

## 📁 Project Structure

shop/
├── client/ # Frontend (React)
├── server/ # Backend (Express + TypeScript)
└── README.md

---

## 🎯 Project Goals

- Build a fully functional e-commerce application
- Design and implement a REST API
- Create an admin panel for product management
- Implement authentication and role-based access control
- Practice modern full-stack development patterns
- Build a strong portfolio project

---

## 👥 User Roles

- **USER**
  - Browse products
  - Place orders

- **ADMIN**
  - Create, update, and delete products
  - Manage application data

---

## 📦 Core Features (MVP)

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes

### Products
- Fetch product list
- Fetch single product
- Create product (ADMIN only)
- Update product (ADMIN only)
- Delete product (ADMIN only)
- Upload product images

### Admin Panel
- Product management dashboard
- Secure admin routes
- Role-based access control

---

## 📑 API Contract (MVP)

### Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/me


### Products
GET /api/v1/products
GET /api/v1/products/:id
POST /api/v1/products (ADMIN)
PUT /api/v1/products/:id (ADMIN)
DELETE /api/v1/products/:id (ADMIN)


---

## 🖼 Image Handling

- Images are stored in the server file system
- Only image URLs are stored in the database
- Image uploads use `multipart/form-data`
- Images are served as static files by the backend

---

## 🧪 API Testing

- Postman for manual API testing
- Automated tests planned for later stages

---

## 🛠 Development Workflow

1. Define API contract
2. Implement backend endpoints
3. Test endpoints using Postman
4. Connect frontend to API
5. Improve UI and UX
6. Add additional features

---

## 📌 Notes

- The project is developed from scratch
- Focus on clean, readable, and scalable code
- API contract is updated alongside implementation
- Backend development is prioritized first

---

## 📈 Development Status

The project is currently under active development.  
The initial focus is on building a stable **Backend MVP**.