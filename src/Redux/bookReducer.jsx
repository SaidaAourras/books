import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
  const response = await axios.get("http://localhost:5000/books");
  return response.data;
});
// Add book to server
export const addBookToDb = createAsyncThunk(
  "book/addBookToDb",
  async (book) => {
    const response = await axios.post("http://localhost:5000/books", book);
    return response.data; // Return the new book added
  }
);
export const deleteBookFromDb = createAsyncThunk(
  "book/deleteBookFromDb",
  async (id) => {
    await axios.delete(`http://localhost:5000/books/${id}`);
    return id; // Return the ID of the deleted book
  }
);


const initialState = {
  books: [],
  statut: "idle",
  erreur: null,
};

const BooksReducer = createSlice({
  name: "book",
  initialState,
  reducers: {
    likeBook: (state, action) => {
      const book = state.books.find((book) => book.id === action.payload);
      if (book) {
        book.likes += 1;
      }
    },
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex((b) => b.id === action.payload.id);
      if (index >= 0) {
        state.books[index] = action.payload;
      }
    },
  
    deleteBook: (state, action) => {
      state.books = state.books.filter((b) => b.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.statut = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.statut = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.statut = "failed";
        state.erreur = action.error.message;
      })
      .addCase(deleteBookFromDb.fulfilled, (state, action) => {
        // Filter out the deleted book using the id
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
    }
});

export const { likeBook,addBook,updateBook,deleteBook } = BooksReducer.actions;
export default BooksReducer.reducer;
