import {createSlice} from '@reduxjs/toolkit'

const UserInfoSlice = createSlice({
    name:'UserInfo',
    initialState :{
        userInfo : [],
        userToken : '',
        userLogged: false

    },
    reducers: {
        setUserLoggedIn : (state,{payload}) => {
            state.userLogged = payload
        },
        setUserToken : (state,{payload}) => {
            state.userToken = payload
        },
        setUserInfo : (state,{payload}) => {
            state.userInfo = payload
        },
    }
})

export const {setUserToken,setUserInfo,setUserLoggedIn} = UserInfoSlice.actions
export default UserInfoSlice.reducer