import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface AddressData {
  id: string | number;
  fullName: string;
  phone: number;
  division: string;
  city: string;
  area: string;
  address: string;
  landmark: string;
  deliveryOption: string;
}

interface AddressState {
  items: AddressData[];
  loading: boolean;
  errorMsg: string;
}

const initialState: AddressState = {
  items: [],
  loading: false,
  errorMsg: "",
};

export const getAddress = createAsyncThunk("address/getAddress", async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_KEY}/addresses`
    );
    return response?.data.data;
  } catch (error) {
    console.error("Error from AddressSlice", error);
    throw error;
  }
});

// Define async thunk for creating a new address
export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (newAddress: AddressData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_KEY}/`,
        newAddress
      );
      console.log("New address created", response);
      return response.data; // You might want to return the newly created address here
    } catch (error) {
      console.error("Error creating address", error);
      throw error; // rethrow the error to be handled by the calling code
    }
  }
);

// Define async thunk for updating an existing address
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (updatedAddress: AddressData) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_KEY}/${updatedAddress.id}`,
        updatedAddress
      );
      console.log("Address updated", response);
      return response.data; // You might want to return the updated address here
    } catch (error) {
      console.error("Error updating address", error);
      throw error; // rethrow the error to be handled by the calling code
    }
  }
);

// Define async thunk for deleting an existing address
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (addressId: string | number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_KEY}/${addressId}`
      );
      console.log("Address deleted", response);
      return addressId; // You might want to return the addressId of the deleted address here
    } catch (error) {
      console.error("Error deleting address", error);
      throw error; // rethrow the error to be handled by the calling code
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.loading = true;
        state.errorMsg = ""; // Clear any previous error message
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.error.message ?? "Failed to fetch addresses";
      });
    // Handle additional extra reducers for createAddress, updateAddress, and deleteAddress if needed
  },
});

export default addressSlice.reducer;
