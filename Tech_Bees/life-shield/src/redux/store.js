import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducer"

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export const NODE_BACKEND_URL = "http://localhost:5000";
export const PYTHON_BACKEND_URL = "http://localhost:5001";