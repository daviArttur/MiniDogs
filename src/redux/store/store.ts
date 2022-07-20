import { configureStore } from "@reduxjs/toolkit";
import slice from "../reducers/products";

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    data : slice.reducer
  }
})

export default store