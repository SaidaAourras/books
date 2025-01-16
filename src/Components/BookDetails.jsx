import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/bookReducer";
import { addToCart } from "../Redux/CartSlice";

const BookDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { books, statut } = useSelector((state) => state.books);
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (statut === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, statut]);

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === parseInt(id));
    console.log(typeof id);
    setBook(selectedBook);
  }, [id, books]);

  if (statut === "loading") {
    return <div>Chargement du livre...</div>;
  }

  if (!book) {
    return <div>Ce livre n'existe pas ou l'ID est incorrect.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={book.poster}
            className="img-fluid"
            alt={book.title}
            style={{ width: "100%", height: "600px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{book.title}</h2>
          <p>
            <strong>Auteur:</strong> {book.author}
          </p>
          <p>
            <strong>Prix:</strong> {book.price} €
          </p>
          <p>{book.description}</p>

          <button
            className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
            style={{
              backgroundColor: "#b52506",
              color: "#fff",
              border: "none",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
            onClick={addToCart(book)}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
