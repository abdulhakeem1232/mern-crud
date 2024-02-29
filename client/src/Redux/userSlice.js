import {createSlice} from '@reduxjs/toolkit'

const initialState={
    isAuthenticated:false,
    userId:null,
    token:null,
    isAdmin:false,
}

export const userSlice=createSlice({
    name:'userData',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.isAuthenticated=true;
            state.userId=action.payload._id;
            state.token=action.payload.token;
            state.isAdmin=action.payload.isAdmin;
            state.img=action.payload.img
        },
        logout:(state)=>{
            state.isAuthenticated=false;
            state.userId=null;
            state.token=null;
            state.isAdmin=false;
            state.img=null;
        },
        checkUserAuthentication:(state)=>{
            const jwt=localStorage.getItem('jwt')
            const id=localStorage.getItem('id')
            const img=localStorage.getItem('img')
            if(jwt){
                const decodedToken = JSON.parse(jwt);
                state.isAuthenticated=true;
                state.userId=id;
                state.token=jwt;
                state.isAdmin=false;
                state.img=img
            }
        }
    }
})

export const { login, logout,checkUserAuthentication } = userSlice.actions;