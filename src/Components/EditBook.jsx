import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBookFromDb } from "../Redux/bookReducer";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { books } = useSelector((state) => state.books);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    poster: "",
    category: "",
    likes: 0,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const selectedBook = books.find((book) => book.id === id);
    if (selectedBook) {
      setFormData({
        title: selectedBook.title || "",
        author: selectedBook.author || "",
        price: selectedBook.price || "",
        poster: selectedBook.poster || "",
        category: selectedBook.category || "",
        likes: selectedBook.likes || 0,
      });
    }
  }, [id, books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || "" : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Le titre est obligatoire.";
    if (!formData.author) newErrors.author = "L'auteur est obligatoire.";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Le prix doit être un nombre positif.";
    }
    if (!formData.poster || !formData.poster.startsWith("http")) {
      newErrors.poster = "L'image doit être une URL valide.";
    }
    if (!formData.category)
      newErrors.category = "La catégorie est obligatoire.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedBook = { ...formData, id };
    dispatch(updateBookFromDb(updatedBook));
    navigate("/bookList");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Modifier un Livre</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Auteur</label>
          <input
            type="text"
            name="author"
            className={`form-control ${errors.author ? "is-invalid" : ""}`}
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && (
            <div className="invalid-feedback">{errors.author}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Prix</label>
          <input
            type="number"
            name="price"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Image (URL)</label>
          <input
            type="text"
            name="poster"
            className={`form-control ${errors.poster ? "is-invalid" : ""}`}
            value={formData.poster}
            onChange={handleChange}
          />
          {errors.poster && (
            <div className="invalid-feedback">{errors.poster}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select
            name="category"
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Choisir une catégorie</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Historical Fiction">Historical Fiction</option>
            <option value="Classic Literature">Classic Literature</option>
            <option value="Romance">Romance</option>
            <option value="Adventure">Adventure</option>
            <option value="Dystopian">Dystopian</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#f5c6a5",
            color: "#c6564b",
            border: "none",
            padding: "5px 15px",
            fontWeight: "bold",
          }}
        >
          Sauvegarder
        </button>
      </form>
    </div>
  );
};

export default EditBook;
