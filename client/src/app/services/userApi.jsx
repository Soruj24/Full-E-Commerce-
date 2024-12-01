import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/user' }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        // Fetch all users
        getUsers: build.query({
            query: () => 'users',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Users', id })),
                        { type: 'Users', id: 'LIST' },
                    ]
                    : [{ type: 'Users', id: 'LIST' }],
        }),

        // Add a new user
        addUser: build.mutation({
            query(body) {
                return {
                    url: `register`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),

        // Fetch a single user by id
        getUser: build.query({
            query: (id) => `user/${id}`,
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),

        // Update an existing user
        updateUser: build.mutation({
            query(data) {
                const { id, ...body } = data
                return {
                    url: `user/${id}`,
                    method: 'PUT',
                    body,
                }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
        }),

        // Delete a user by id
        deleteUser: build.mutation({
            query(id) {
                return {
                    url: `user/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi
