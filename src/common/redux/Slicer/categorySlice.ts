import axios from "axios";
import { createSlice, createAsyncThunk,PayloadAction} from "@reduxjs/toolkit";
import { categoryState,Items } from "../../types/Category/categoryTypes";
import {formatCategoryResponse} from "../../utils/formatResponse";

const initialState: categoryState = {
    loading: false,
    categoryData: [],
    error: null,
    selectedCategory: {
        classificationid: 0,
        id: 0,
        lastupdate: '',
        name: '',
        objectcount: 0,
    }
}

export const fetchCategoryData = createAsyncThunk('GET_CATEGORY_DATA', async () => {
    const CLIENT_API_KEY = "6c8feb3f-9551-4f60-b5d6-49304d7dfb83"
    const API_ENDPOINT = "https://api.harvardartmuseums.org"
    const params = {
        apikey: CLIENT_API_KEY,
        sort: "objectcount",
        sortorder: "desc"
    }
    
    const response = await axios.get(`${API_ENDPOINT}/classification`,{params})
    const data = formatCategoryResponse(response);
    return data;
})

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryData:(state,action: PayloadAction<Items[]>)=>{
            state.categoryData=action.payload;
        },
        setSlectedCategory:(state, action: PayloadAction<Items>)=>{
            state.selectedCategory= action.payload;
        },
    },extraReducers: builder => {
        builder.addCase(fetchCategoryData.pending, state => {
            state.loading = true;
        })
        // @ts-ignore
        builder.addCase(fetchCategoryData.fulfilled, (state, action: PayloadAction<Items[]>) => {
            state.loading = false;
            state.categoryData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCategoryData.rejected, (state, action) => {
            state.loading = false;
            state.categoryData = [];
            state.error = action.error.message;
        })
    }
})

// Action creators are generated for each case reducer function
export const { setCategoryData,setSlectedCategory } = categorySlice.actions;

export default categorySlice.reducer;