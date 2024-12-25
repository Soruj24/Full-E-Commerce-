import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/auth",
    credentials: "include", // Include credentials for cookies, etc.
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        console.log("headers", headers);
        console.log('accessToken1', getState().auth);

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
  

    // Check if the access token has expired (403 response)
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        console.log("Access token expired. Attempting to refresh...");

        const refreshToken = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage

        if (refreshToken) {
            const refreshResult = await baseQuery("/refresh-token", api, {
                method: "POST",
                body: { refreshToken },
            });


            if (refreshResult?.data) {
                const { accessToken } = refreshResult.data;

                // Update Redux state with the new access token
                api.dispatch(
                    setCredentials({
                        accessToken,
                        user: api.getState().auth.user,
                    })
                );

                // Save the new access token to localStorage
                localStorage.setItem("accessToken", accessToken);

                // Retry the original query with the new access token
                result = await baseQuery(args, api, extraOptions);
            } else {
                console.error("Failed to refresh token. Logging out...");
                api.dispatch(logOut()); // If token refresh fails, logout
            }
        } else {
            console.error("Refresh token not found. Logging out...");
            api.dispatch(logOut()); // If no refresh token, logout
        }
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: { ...data },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "/users",
                keepUnusedDataFor: 5,
                method: "GET",
            }),
        }),
        protectedRoute: builder.query({
            query: () => ({
                url: "/protected",
                keepUnusedDataFor: 5,
                method: "GET",
            }),
        }),
    }),
});

// Correct export
export const {
    useLoginMutation,
    useLogoutMutation,
    useGetAllUsersQuery,
    useProtectedRouteQuery
} = apiSlice;
