import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'Auth',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});
// export actions
export const { setUser } = authSlice.actions;

// default export the reducer
export default authSlice.reducer;
