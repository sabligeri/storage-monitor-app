import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import "bootstrap-icons/font/bootstrap-icons.css";

export default function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwt-response');
    navigate('/login');
  };

  return (
    <header id='headbar'>
      <nav>
        <div id="nav-left">
          <ul>
            <li>
              <Link to="/home">
                <i className="bi bi-house"></i> Home
              </Link>
            </li>
            <li>
              <Link to="/storagelist">
                <i className="bi bi-building"></i> Storage
              </Link>
            </li>
            <li>
              <Link to="/products">
                <i className="bi bi-box-seam"></i> Product
              </Link>
            </li>
            <li>
              <Link to="/production">
                <i className="bi bi-play-circle"></i> Production
              </Link>
            </li>
          </ul>
        </div>
        <div id="nav-right">
          <p onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i> Logout</p>
        </div>
      </nav>
    </header>
  );
}