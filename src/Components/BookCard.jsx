import React from 'react';
import { useDispatch } from 'react-redux';
import { likeBook } from '../Redux/bookReducer';
 

const BookCard = (Props) => {
    const dispatch = useDispatch();
    const {book}=Props
    const handelLike = () => {
        dispatch(likeBook(book.id))
    }
  return (

    <div className="card my-3 " style={{ width: '18rem' }}>
    <img src={book.poster} className="card-img-top" alt={book.title} />
    <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <button className="btn btn-outline-info btn-sm "  onClick={handelLike}>
           like ({book.likes})
        </button>
        
    </div>
</div>

  )
}

export default BookCard
