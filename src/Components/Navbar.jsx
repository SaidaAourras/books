import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/AuthSlice";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const totalItemsInCart = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#c6564b", padding: "10px 20px" }}
    >
      <Link
        className="navbar-brand mx-5"
        to="/"
        style={{ color: "#fff", fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Shopping Cart
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/bookList"
              style={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
            >
              BooksList
            </Link>
          </li>
        </ul>
      </div>

      <div className="collapse navbar-collapse justify-content-end">
        <ul className="navbar-nav ml-auto align-items-center">
          <li className="nav-item m-2">
            <button
              className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
              style={{
                backgroundColor: "#d29372",
                color: "#fff",
                border: "none",
                padding: "5px 15px",
              }}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#cart"
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/cart"
              >
                <FaCartShopping style={{ marginRight: "5px" }} />
                <span
                  className="badge badge-light ml-2"
                  style={{
                    marginLeft: "8px",
                    backgroundColor: "#f5c6a5",
                    color: "#5c2c0e",
                  }}
                >
                  {totalItemsInCart}{" "}
                </span>
              </Link>
            </button>
          </li>

          {isAuthenticated ? (
            <li className="nav-item">
              <button
                className="nav-link btn btn-dark rounded-pill d-flex align-items-center"
                style={{
                  backgroundColor: "#d29372",
                  color: "#fff",
                  border: "none",
                  padding: "5px 15px",
                  fontWeight: "bold",
                }}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </li>
          ) : (
            <li className="nav-item">
              <Link
                className="nav-link btn btn-dark rounded-pill"
                style={{
                  backgroundColor: "#d29372",
                  color: "#fff",
                  border: "none",
                  padding: "5px 15px",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
                to="/login"
              >
                Log In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
