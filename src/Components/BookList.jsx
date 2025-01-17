import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "./BookCard";
import { fetchBooks } from "../Redux/bookReducer";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, statut, erreur } = useSelector((state) => state.books);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    dispatch(fetchBooks());
  }, [dispatch, isAuthenticated, navigate]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // filter

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

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

  const categories = ["All", ...new Set(books.map((book) => book.category))];

  return (
    <div className="w-75 mx-auto">
      <div className="mb-4 d-flex align-items-center">
        <label
          htmlFor="category-select"
          className="form-label me-2"
          style={{ fontWeight: "bold" }}
        >
          Filtrer par catégorie:
        </label>
        <select
          id="category-select"
          className="form-select w-auto"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex flex-wrap justify-content-around">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <div>Aucun livre disponible pour cette catégorie.</div>
        )}
      </div>
    </div>
  );
};

export default BookList;
