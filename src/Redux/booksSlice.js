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
      let updatedBooks = [...state.books];
      if (itemIndex === -1) {
        action.payload.book.shelf = action.payload.shelf;
        updatedBooks.push(action.payload.book);
        state.books = updatedBooks;
      } else {
        updatedBooks[itemIndex].shelf = action.payload.shelf;
        state.books = updatedBooks;
      }
      await update(action.payload.book, action.payload.shelf);

      if (window.location.pathname === "/") window.location.reload();
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
