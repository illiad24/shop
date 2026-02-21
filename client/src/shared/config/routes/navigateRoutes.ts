export const navigateRoutes = {
  navigate: {
    home: "/",
    products: {
      list: "/products/list",
      getProductById: (id: string) => `/products/${id}`,
    },
    profile: {
      main: "/profile",
    },
    cart: "/cart",
  },
};
