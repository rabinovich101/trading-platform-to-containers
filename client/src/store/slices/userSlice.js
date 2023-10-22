import {createSlice} from "@reduxjs/toolkit";
import { addUsers } from "../thunks/users";
const usersSlice = createSlice({
    name: "test",
    initialState: {
        isLoading: false,
        error: null,
        data: []
    },
    reducers: {
        
    },
    extraReducers(builder){
        builder.addCase(addUsers.pending, () => {
            //update state in this case
        });
        builder.addCase(addUsers.fulfilled, () => {
            //update state in this case
        });
        builder.addCase(addUsers.rejected, () => {
            // update state in this case
        });
    }
});


export const { addUser }  = usersSlice.actions;
export const userReducer =  usersSlice.reducer;

// export action creator
//example 
// export const { addSong} = songsSlice.actions;
