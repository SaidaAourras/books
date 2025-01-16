import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import BookList from "./Components/BookList";
import { useSelector } from "react-redux";
import Login from "./Components/LoginComponent";
import Cart from "./Components/Cart";
import BookDetail from "./Components/BookDetails";

function App() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/bookList"
          element={isAuthenticated ? <BookList /> : <Navigate to="/login" />}
        />
        <Route
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
        />

        <Route path="/book/:id" element={<BookDetail />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/bookList" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
