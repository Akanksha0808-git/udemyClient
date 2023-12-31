import { createSlice } from "@reduxjs/toolkit";

// Create a function to initialize the state, either from localStorage or with an empty array
const initializeState = () => {
  const localStorageData = localStorage.getItem("cartData");

  console.log("localStorageData:", localStorageData);

  return localStorageData ? JSON.parse(localStorageData) : [];
};

const Slice = createSlice({
  name: "cart",
  initialState: {
    data: initializeState(), // Initialize state with data from localStorage
  },
  reducers: {
    addtocart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.data.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newItem.quantity = 1;
        state.data.push(newItem);
        // state.data = [newItem];
      }

      // Update localStorage whenever state is modified
      localStorage.setItem("cartData", JSON.stringify(state.data));
    },
    removeItem(state, action) {
      console.log("Removing item with id:", action.payload);
      state.data = state.data.filter((item) => item.id !== action.payload);

      // Update localStorage whenever state is modified
      localStorage.setItem("cartData", JSON.stringify(state.data));
    },
    increment: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.data = state.data.map((item) => {
        if (item.id === id) {
          item.quantity++;
        }
        return item;
      });

      // Update localStorage whenever state is modified
      localStorage.setItem("cartData", JSON.stringify(state.data));
    },
    decrement: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.data = state.data.map((item) => {
        if (item.id === id) {
          item.quantity--;
        }
        return item;
      });

      // Update localStorage whenever state is modified
      localStorage.setItem("cartData", JSON.stringify(state.data));
    },
    // clearCart: (state) => {
    //   state.data = [];
    // },
    clearCart: (state) => {
     
        state.data = [];
        localStorage.removeItem(localStorageData);
   
    },
    
  },
});


const { addtocart, increment, decrement, removeItem, clearCart } = Slice.actions;


export { addtocart, increment, decrement, removeItem, clearCart };

export default Slice.reducer;