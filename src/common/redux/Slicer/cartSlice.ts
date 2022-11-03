import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../types/Product/productTypes";

export interface CartState {
  productsInCart: Array<ProductItem>
  total: number
  cartOpen: boolean,
  quantity: number,
}

const initialState: CartState = {
  productsInCart: [],
  total: 0,
  cartOpen: false,
  quantity: 0,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ProductItem>) => {
      const productIncart = state.productsInCart.find(
        (product) => product.id === action.payload.id
      )
      if (!productIncart) {
        state.productsInCart.push({ ...action.payload, quantity: 1 })

        state.total = state.productsInCart.reduce(
          (acc, product) => acc + product.objectid * product.quantity,
          0
        )
        state.quantity++;
      } else {
        productIncart.quantity++
        state.quantity++;

        state.total = state.productsInCart.reduce(
          (acc, product) => acc + product.objectid * product.quantity,
          0
        )
      }
    },

    deleteItemFromCart: (state, action: PayloadAction<ProductItem>) => {
      const productInCartIndex = state.productsInCart.findIndex(
        (product) => product.id === action.payload.id
      )

      if (state.productsInCart[productInCartIndex].quantity === 1) {
        state.productsInCart.splice(productInCartIndex, 1)
        state.total = state.productsInCart.reduce(
          (acc, product) => acc + product.objectid * product.quantity,
          0
        )
        state.quantity--;
      } else {
        state.quantity--;
        state.productsInCart[productInCartIndex].quantity--
        state.total = state.productsInCart.reduce(
          (acc, product) => acc + product.objectid * product.quantity,
          0
        )
      }
    },
    openCart: (state, action: PayloadAction<boolean>) => {
      state.cartOpen = action.payload
    },
  },
})

export const { addItemToCart, deleteItemFromCart, openCart } = cartSlice.actions

export default cartSlice.reducer;