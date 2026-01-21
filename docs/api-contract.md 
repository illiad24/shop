# Shop API Documentation

Base URL: `/api/v1`

## Auth Endpoints

### Register
POST `/auth/register`
```json
{
  "email": "user@example.com",
  "password": "123456",
  "name": "John Doe"
}
```

### Login
POST `/auth/login`
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

### Get Me
GET `/auth/me`
Headers: `Authorization: Bearer {token}`

---

## Users Endpoints

### Get All Users (Admin)
GET `/users/list?page=1&limit=10`
Headers: `Authorization: Bearer {token}`

### Get My Profile
GET `/users/me`
Headers: `Authorization: Bearer {token}`

### Update Profile
PATCH `/users/me`
```json
{
  "name": "New Name"
}
```


```markdown
## Products

GET `/products/list?page=1&limit=10&category=electronics&search=phone`

GET `/products/:id`

POST `/products`
Headers: `Authorization: Bearer {token}`
```json
{
  "name": "iPhone 15",
  "description": "Latest iPhone",
  "price": 999,
  "category": "electronics",
  "stock": 50,
  "images": ["url1", "url2"]
}
```

PATCH `/products/:id`
Headers: `Authorization: Bearer {token}`
```json
{
  "name": "iPhone 15 Pro",
  "price": 1099,
  "stock": 30
}
```

DELETE `/products/:id`
Headers: `Authorization: Bearer {token}`
```