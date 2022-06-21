import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const api = "https://reactnd-books-api.udacity.com";
const token = localStorage.getItem("token");
const headers = {
  Accept: "application/json",
  Authorization: token,
};

const initialState = {
  books: [],
  status: "",
};

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
   async () => {
  const response = await axios.get(`${api}/books`, { headers });
  return response.data.books;
});
export const updateShelf = createAsyncThunk(
  "books/updateShelf",
  async (formData) => {
    const response = await axios.put(
      `${api}/books/${formData.book.id}`,
      { book: formData.book, shelf: formData.book.shelf },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);


const books = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBooks.pending]: (state, action) => {
      state.status = "pending";
    },
    [getAllBooks.fulfilled]: (state, action) => {
      state.status = "success";
      state.books = action.payload;
    },
    [getAllBooks.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateShelf.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateShelf.fulfilled]: (state, action) => {
      state.status = "success";
  
    },
    [updateShelf.rejected]: (state, action) => {
      state.status = "failed";
    },

  },
});

export default books.reducer;
