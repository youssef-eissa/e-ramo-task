import { createSlice } from "@reduxjs/toolkit";

const UsersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload);
        },
        removeUser(state, action) {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        updateUser(state, action) {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
            console.log(index);
        }
    },
});

export const { addUser ,removeUser,updateUser} = UsersSlice.actions;
export const UsersReducer = UsersSlice.reducer;