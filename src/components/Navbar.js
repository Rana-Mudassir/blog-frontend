import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
