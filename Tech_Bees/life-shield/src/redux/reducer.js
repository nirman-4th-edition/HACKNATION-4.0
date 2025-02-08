import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
    {
        isAuthenticated: null,
    },
    (builder) => {
        builder
            .addCase("loginRequest", (state) => {
                state.loading = true;
            })
            .addCase("registerRequest", (state) => {
                state.loading = true;
            })
            .addCase("loadUserRequest", (state) => {
                state.loading = true;
            })
            .addCase("logoutRequeset", (state) => {
                state.loading = true;
            })
            .addCase("updateProfileRequest", (state) => {
                state.loading = true;
            })
        builder
            .addCase("loginSuccess", (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase("registerSuccess", (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase("loadUserSuccess", (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase("logoutSuccess", (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.message = action.payload.message;
            })
            .addCase("updateProfileSuccess", (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
        builder
            .addCase("loginFailure", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase("registerFailure", (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase("loadUserFailure", (state) => {
                state.loading = false;
                state.isAuthenticated = false;
            })
            .addCase("logoutFailure", (state) => {
                state.loading = false;
            })
            .addCase("updateProfileFailure", (state) => {
                state.loading = false;
            })

        builder.addCase("clearError", (state) => {
            state.error = null;
        });
        builder.addCase("clearMessage", (state) => {
            state.message = null;
        });
    }
);