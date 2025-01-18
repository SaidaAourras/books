import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
  const response = await axios.get("http://localhost:5000/books");
  return response.data;
});

export const addBookToDb = createAsyncThunk(
  "book/addBookToDb",
  async (book, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:5000/books", book);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Erreur lors de l'ajout du livre"
      );
    }
  }
);

export const deleteBookFromDb = createAsyncThunk(
  "book/deleteBookFromDb",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Erreur lors de la suppression du livre"
      );
    }
  }
);

export const updateBookFromDb = createAsyncThunk(
  "book/updateBookFromDb",
  async (book, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/books/${book.id}`,
        book
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Erreur lors de la mise à jour du livre"
      );
    }
  }
);

export const updateLikesFromDb = createAsyncThunk(
  "book/updateLikesFromDb",
  async (book, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/books/${book.id}`,
        book
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Erreur lors de d'ajouter likes"
      );
    }
  }
);

const initialState = {
  books: [],
  status: "idle",
  error: null,
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
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addBookToDb.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteBookFromDb.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      })
      .addCase(updateBookFromDb.fulfilled, (state, action) => {
        const index = state.books.findIndex((b) => b.id === action.payload.id);
        if (index >= 0) {
          state.books[index] = action.payload; // Update book in state
        }
      })
      .addCase(updateLikesFromDb.fulfilled, (state, action) => {
        const book = state.books.find((book) => book.id === action.payload.id);
        if (book) {
          book.likes += 1;
        }
      });
  },
});

export const { likeBook, addBook, updateBook, deleteBook } =
  BooksReducer.actions;
export default BooksReducer.reducer;
