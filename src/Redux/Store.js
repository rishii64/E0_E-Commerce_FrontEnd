import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slice'

const Store = configureStore({
    reducer:{
        App: userReducer,
    }
})
export default Store