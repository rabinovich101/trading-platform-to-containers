import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const addUsers = createAsyncThunk("add/user" , async () => {
    const res = await axios.post("http://localhost:3005/");
    console.log(res);
    return res.data;
});


export {addUsers};