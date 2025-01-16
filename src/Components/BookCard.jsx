import React from "react";
import { useDispatch } from "react-redux";
import { likeBook } from "../Redux/bookReducer";
import { addToCart } from "../Redux/CartSlice";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaShoppingCart, FaEye } from "react-icons/fa";

const BookCard = (Props) => {
  const dispatch = useDispatch();
  const { book } = Props;
  const handelLike = () => {
    dispatch(likeBook(book.id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };
  return (
    <div className="card my-3 " style={{ width: "18rem" }}>
      <img
        src={book.poster}
        className="card-img-top"
        alt={book.title}
        style={{ width: "100%", height: "450px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.author}</p>
        <div className="d-flex justify-content-between">
          <button
            className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
            style={{
              backgroundColor: "#b52506",
              color: "#fff",
              border: "none",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
            onClick={handelLike}
          >
            <FaThumbsUp style={{ marginRight: "5px" }} />
            {book.likes}
          </button>

          <button
            className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
            style={{
              backgroundColor: "#b52506",
              color: "#fff",
              border: "none",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
            onClick={handleAddToCart}
          >
            <FaShoppingCart style={{ marginRight: "5px" }} />
          </button>

          <Link style={{ textDecoration: "none" }} to={`/book/${book.id}`}>
            <button
              className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
              style={{
                backgroundColor: "#b52506",
                color: "#fff",
                border: "none",
                padding: "5px 15px",
                fontWeight: "bold",
              }}
            >
              <FaEye style={{ marginRight: "5px" }} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
