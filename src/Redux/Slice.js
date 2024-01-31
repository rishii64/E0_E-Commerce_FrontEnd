import { createSlice } from '@reduxjs/toolkit'

const Slice = createSlice({
    name: 'uShop Cart',
    initialState: {
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
        cartItems: localStorage.getItem('items') ? localStorage.getItem('items') : [],
        cartQuantity: 0,
        cartAmount: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const itemId = state.cartItems.find(item => item.id === action.payload.id)
            if (itemId >= 0)
                state.cartItems[itemId].cartQuantity += 1
            else {
                const sampleProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(sampleProduct)
                state.cartAmount++
            }
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
            state.cartQuantity--;
            state.cartItems = filteredData;
            localStorage.setItem("items", JSON.stringify(state.cartItems));
        }

    }
})

export const { addToCart, increaseQuantity, decreaseQuantity, removeProduct } = Slice.actions
export default Slice.reducer