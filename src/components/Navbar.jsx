import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          LuisFer ICE CREAM Shop
        </Link>
        <div>
          <Link className="btn btn-outline-primary mx-1" to="/Products">Products</Link>
          <Link className="btn btn-outline-success mx-1" to="/Ingredients">Ingredients</Link>
          <Link className="btn btn-outline-secondary mx-1" to="/Sales">Sales</Link>
          <Link className="btn btn-outline-dark mx-1" to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}
