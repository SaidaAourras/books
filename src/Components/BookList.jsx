import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BookCard from './BookCard';
import { fetchBooks } from '../Redux/bookReducer';

const BookList = () => {
    const dispatch = useDispatch();
 const {books,statut,erreur} = useSelector((state)=>state.books);

 useEffect(() => {
    dispatch(fetchBooks());
}, [dispatch]);
if (statut === 'loading') {
    return <div>Loading...</div>;
}

if (statut === 'failed') {
    return <div>Error: {erreur}</div>;
}
  return (
      <div className="d-flex flex-wrap justify-content-around w-75 mx-auto">
      {books.map((book) => (
       <BookCard key={book.id} book={book}/>
    ))}
    </div>
  )
}

export default BookList
