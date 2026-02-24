export const navigateRoutes = {
  navigate: {
    home: "/",
    products: {
      list: "/products/list",
      getProductById: (id: string) => `/products/${id}`,
    },
    profile: {
      main: "/profile",
      address: "/profile/address",
      favorite: "/profile/favorite",
      history: "",
    },
    cart: "/cart",
  },
};
