
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { likeBook } from '../Components/LikeBook';


export const fetchBooks = createAsyncThunk(
    'book/fetchBooks',
    async () => {
        const response = await axios.get('http://localhost:4000/books'); // Remplace l'URL par celle de ton API
        return response.data;
    }
);


const initialState = {
    books: [],
    statut: 'idle',
    erreur: null,
};

const BooksReducer = createSlice({
    name: 'book',
    initialState,
    reducers: {
        likeBook: (state, action) => {
            const book = state.books.find(book => book.id === action.payload);
            if (book) {
                book.likes += 1; // Incrémente le nombre de likes
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.statut = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.statut = 'succeeded';
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.statut = 'failed';
                state.erreur = action.error.message;
            });
    },
});


export const { likeBook } = BooksReducer.actions;
export default BooksReducer.reducer;
