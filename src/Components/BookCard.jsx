import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteBookFromDb,
  likeBook,
  updateLikesFromDb,
} from "../Redux/bookReducer";
import { addToCart } from "../Redux/CartSlice";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaShoppingCart, FaEye } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(updateLikesFromDb(book));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const buttonStyle = {
    backgroundColor: "#b52506",
    color: "#fff",
    border: "none",
    padding: "5px 15px",
    fontWeight: "bold",
  };
  const handleDeleteBook = (id) => {
    dispatch(deleteBookFromDb(id));
  };
  return (
    <div className="card my-3" style={{ width: "18rem" }}>
      <button
        className="btn btn-sm"
        style={{
          backgroundColor: "#b52506",
          color: "#fff",
          border: "none",
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px",
          lineHeight: "1",
        }}
        onClick={() => {
          const isConfirmed = window.confirm(
            `Êtes-vous sûr de vouloir supprimer "${book.title}" ?`
          );
          if (isConfirmed) {
            handleDeleteBook(book.id);
          }
        }}
        aria-label={`Supprimer ${book.title}`}
      >
        <FaXmark />
      </button>
      <img
        src={book.poster || "/images/placeholder.png"}
        className="card-img-top"
        alt={book.title || "Titre inconnu"}
        style={{ width: "100%", height: "450px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <div className="d-flex justify-content-between">
          <button
            className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
            style={buttonStyle}
            onClick={handleLike}
            aria-label={`J'aime ${book.title}`}
          >
            <FaThumbsUp style={{ marginRight: "5px" }} />
            {book.likes || 0}
          </button>

          <button
            className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
            style={buttonStyle}
            onClick={handleAddToCart}
            aria-label={`Ajouter ${book.title} au panier`}
          >
            <FaShoppingCart style={{ marginRight: "5px" }} />
          </button>

          <button
            className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
            style={buttonStyle}
          >
            <Link
              to={`/book/${book.id}`}
              style={{ textDecoration: "none", color: "white" }}
              aria-label={`Voir les détails de ${book.title}`}
            >
              <FaEye style={{ marginRight: "5px" }} />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
