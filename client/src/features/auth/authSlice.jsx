import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            state.token = user?.accessToken;
            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", user?.accessToken);
            localStorage.setItem("refreshToken", user?.refreshToken);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;

            // Remove from localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        },
    },
});



export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer


export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

