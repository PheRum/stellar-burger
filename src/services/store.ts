import { ThunkAction, ThunkDispatch } from "redux-thunk";

import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contructorSlice from "../slices/contructorSlice";
import feedSlice from "../slices/feedSlice";
import orderSlice from "../slices/orderSlice";
import userSlice from "../slices/userSlice";

const store = configureStore({
    reducer: {
        contructor: contructorSlice,
        feed: feedSlice,
        order: orderSlice,
        user: userSlice,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = any;

type TApplicationActions = any;

export type AppThunk<Return = void> = ThunkAction<Return, RootState, unknown, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
