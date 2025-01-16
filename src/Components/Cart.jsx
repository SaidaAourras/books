import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../Redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return <div className="text-center my-5">Votre panier est vide.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Mon Panier</h2>
      <div className="row">
        {items.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card shadow-sm" style={{ width: "100%" }}>
              <img
                src={item.poster}
                className="card-img-top"
                alt={item.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Prix: {item.price} €</p>
                <p className="card-text">Quantité: {item.quantity}</p>
                <button
                  className="btn btn-danger w-100 mt-2"
                  onClick={() => handleRemoveFromCart(item)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <h4>Total: {totalAmount} €</h4>
        <div>
          <button
            className="btn btn-primary mr-2"
            onClick={() => navigate("/checkout")}
          >
            Passer à la caisse
          </button>
          <button className="btn btn-secondary" onClick={handleClearCart}>
            Vider le panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
