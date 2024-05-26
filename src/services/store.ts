import { ThunkAction, ThunkDispatch, thunk } from "redux-thunk";

import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import stellarBurgerSlice from "../slices/stellarBurgerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        stellarBurger: stellarBurgerSlice
    },
    devTools: process.env.NODE_ENV !== "production"
});

export type RootState = any;

type TApplicationActions = any;

export type AppThunk<Return = void> = ThunkAction<Return, RootState, unknown, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
