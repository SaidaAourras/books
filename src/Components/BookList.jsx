import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "./BookCard";
import { fetchBooks } from "../Redux/bookReducer";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, statut, erreur } = useSelector((state) => state.books);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(fetchBooks());
  }, [dispatch, isAuthenticated, navigate]);

  if (statut === "loading") {
    return <div>Chargement des livres...</div>;
  }

  if (statut === "failed") {
    return <div>Erreur: {erreur}</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>Veuillez vous connecter pour accéder à la liste des livres.</div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-around w-75 mx-auto">
      {books.length > 0 ? (
        books.map((book) => <BookCard key={book.id} book={book} />)
      ) : (
        <div>Aucun livre disponible.</div>
      )}
    </div>
  );
};

export default BookList;
