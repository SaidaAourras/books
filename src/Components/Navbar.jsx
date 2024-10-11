
import { Link } from 'react-router-dom';


const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Mon Site</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/bookList"> BooksList </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link" to="/add"> add </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
