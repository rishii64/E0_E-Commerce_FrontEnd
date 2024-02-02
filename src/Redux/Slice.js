import { createSlice } from '@reduxjs/toolkit'

const Slice = createSlice({
    name: 'uShop_Cart',
    initialState: {
        userId: localStorage.getItem('userId') ? JSON.parse(localStorage.getItem('userId')) : [],
        cartItems: localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,
        Authorized: localStorage.getItem('userId') ? true : false,
    },
    reducers: {
        UserLogin: (state, action) => {
            state.userId.push(action.payload);
            state.Authorized = true;
            localStorage.setItem("userId", JSON.stringify(state.userId));
        },

        addToCart: (state, action) => {
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            if (itemIndex >= 0)
                state.cartItems[itemIndex].cartQuantity += 1
            else {
                const sampleProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(sampleProduct)
                state.cartTotalQuantity++
            }
            localStorage.setItem("items", JSON.stringify(state.cartItems))
        },

        increaseQuantity(state, action) {
            const currentIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            state.cartItems[currentIndex].cartQuantity += 1;
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        decreaseQuantity(state, action) {
            const currentIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (state.cartItems[currentIndex].cartQuantity > 1) {
                state.cartItems[currentIndex].cartQuantity -= 1;
            }
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        removeProduct(state, action) {
            const filteredData = state.cartItems.filter((product) => product.id !== action.payload);
            state.cartTotalQuantity--;
            state.cartItems = filteredData;
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        },

        calculateTotalAmount(state,action){
            state.cartTotalQuantity = action.payload.totalProducts
            state.cartTotalAmount = action.payload.totalCartPrice
        }
    }
})

export const { UserLogin, addToCart, increaseQuantity, decreaseQuantity, removeProduct, calculateTotalAmount } = Slice.actions
export default Slice.reducer