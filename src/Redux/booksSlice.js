import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { update } from "../BooksAPI";

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
  return response.data.books;
});


const books = createSlice({
  name: "books",
  initialState,
  reducers: {
    async updateShelf(state, action) {

      const itemIndex = state.books.findIndex(
        (book) => book.id === action.payload.book.id
      );
      if (itemIndex === -1) {
        action.payload.book.shelf = action.payload.shelf;
        state.books.push(action.payload.book);
      } else {
        state.books[itemIndex].shelf = action.payload.shelf;
      }
      await update(action.payload.book, action.payload.shelf);
      getAllBooks()
    },
  },
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

  },
});

export const { updateShelf } = books.actions;

export default books.reducer;
