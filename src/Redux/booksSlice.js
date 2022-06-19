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

export const getAllBooks = createAsyncThunk("books/getAllBooks", async () => {
  const response = await axios.get(`${api}/books`, { headers });
  return response.data;
});
export const updateShelf = createAsyncThunk(
  "books/updateShelf",
  async (formData) => {
    await axios.put(
      `${api}/books/${formData.book.id}`,
      { book: formData.book, shelf: formData.book.shelf },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      }
    );
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
      state.books = action.payload.books;
    },
    [getAllBooks.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateShelf.pending]: (state, action) => {
      state.status = "pending";
    },
    [updateShelf.fulfilled]: (state, action) => {
      state.status = "success";
      console.log(action.payload);
      // state.books.map(item => item.id === action.payload.book.id ? action.payload : item)
    },
    [updateShelf.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default books.reducer;
