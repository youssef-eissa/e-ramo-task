import { createSlice } from "@reduxjs/toolkit";

const UserEditSlice = createSlice({
    name: "users",
    initialState: {
        user: {},
    },
    reducers: {
        setUser(state, action) {
            state.user=action.payload;
        },
        setName: (state, action) => {
            state.user.name = action.payload;
        },
        setEmail: (state, action) => {
            state.user.email = action.payload;
        },
        setPassword: (state, action) => {
            state.user.password = action.payload;
        },
        setPhone: (state, action) => {
            state.user.phone = action.payload;
        },
        setAge: (state, action) => {
            state.user.age = action.payload;
        },
        setImage: (state, action) => {
            state.user.image = action.payload;
        },
       
    },
});

export const { setUser, setName, setEmail, setPassword, setPhone, setAge, setImage } = UserEditSlice.actions;
export const UserEditReducer = UserEditSlice.reducer;