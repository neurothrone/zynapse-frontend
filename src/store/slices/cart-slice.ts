import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/product";
import { RootState } from "../index";

// Define a cart item type that extends Product with quantity
export interface CartItem extends Product {
  quantity: number;
}

// Define the cart state
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
}

// Calculate the total price of all items in the cart
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
  total: 0,
};

// Create the cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add an item to the cart
    addItem: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        // If the item already exists, increase its quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add it as a new item with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Recalculate the total
      state.total = calculateTotal(state.items);
    },

    // Remove an item from the cart
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.total = calculateTotal(state.items);
    },

    // Update the quantity of an item
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
      }

      state.total = calculateTotal(state.items);
    },

    // Clear the cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },

    // Toggle the cart drawer
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    // Open the cart drawer
    openCart: (state) => {
      state.isOpen = true;
    },

    // Close the cart drawer
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

// Export actions
export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

// Export selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartIsOpen = (state: RootState) => state.cart.isOpen;
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
