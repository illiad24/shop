export const apiRoutes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  user: {
    list: "/users/list",
    me: (userId: string) => `/users/me/${userId}`,
  },
  products: {
    list: "/products",
    create: "/products",
    update: (productId: string) => `/products/${productId}`,
    delete: (productId: string) => `/products/${productId}`,
    getById: (productId: string) => `/products/${productId}`,
  },
};
