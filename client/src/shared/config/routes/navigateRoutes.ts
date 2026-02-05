export const navigateRoutes = {
  navigate: {
    home: "/",
    products: {
      list: "/products",
      getProductById: (id: string) => `/products/${id}`,
    },
  },
};
