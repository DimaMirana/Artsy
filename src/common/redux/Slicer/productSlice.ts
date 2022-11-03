import axios from "axios";
import { createSlice, createAsyncThunk,PayloadAction} from "@reduxjs/toolkit";
import { productState,ProductItem } from "../../types/Product/productTypes";
import {formatProductResponse} from "../../utils/formatResponse";

const initialState: productState = {
    loading: false,
    productData: [],
    error: null,
}

export const fetchProductData = createAsyncThunk('GET_ALL_PRODUCT', async (product:string) => {
    const CLIENT_API_KEY = "6c8feb3f-9551-4f60-b5d6-49304d7dfb83"
    const API_ENDPOINT = "https://api.harvardartmuseums.org"
    const params = {
        apikey: CLIENT_API_KEY,
        totalpageviews: 2,
        size:10
    }

    const response = await axios.get(`${API_ENDPOINT}/object?classification=${product}`, { params })
    const data = formatProductResponse(response);
    return data;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductData:(state,action: PayloadAction<ProductItem[]>)=>{
            state.productData=action.payload;
        }
    },extraReducers: builder => {
        builder.addCase(fetchProductData.pending, state => {
            state.loading = true;
        })
        // @ts-ignore
        builder.addCase(fetchProductData.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
            state.loading = false;
            state.productData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchProductData.rejected, (state, action) => {
            state.loading = false;
            state.productData = [];
            state.error = action.error.message;
        })
    }
})

export const { setProductData } = productSlice.actions;

export default productSlice.reducer;