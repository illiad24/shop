import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import type { ProductType } from "@/features/productItem/ProductType";

export interface GuestCartItem {
  _id: string;
  productId: ProductType;
  quantity: number;
}

const STORAGE_KEY = "guest_cart";

function load(): GuestCartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(items: GuestCartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState: load() as GuestCartItem[],
  reducers: {
    guestAddToCart(state, action) {
      const product: ProductType = action.payload;
      const existing = state.find((i) => i.productId._id === product._id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ _id: product._id, productId: product, quantity: 1 });
      }
      save(state);
    },
    guestUpdateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        const next = state.filter((i) => i.productId._id !== productId);
        save(next);
        return next;
      }
      const item = state.find((i) => i.productId._id === productId);
      if (item) item.quantity = quantity;
      save(state);
    },
    guestRemoveFromCart(state, action) {
      const next = state.filter((i) => i.productId._id !== action.payload);
      save(next);
      return next;
    },
    guestClearCart() {
      save([]);
      return [];
    },
  },
});

export const {
  guestAddToCart,
  guestUpdateQuantity,
  guestRemoveFromCart,
  guestClearCart,
} = guestCartSlice.actions;

export const selectGuestCart = (state: RootState) => state.guestCart;

export default guestCartSlice.reducer;
