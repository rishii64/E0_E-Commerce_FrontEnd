import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slice'
import cartReducer from './Slice'

const Store = configureStore({
    reducer:{
        user: userReducer,
        cart: cartReducer
    }
})
export default Store