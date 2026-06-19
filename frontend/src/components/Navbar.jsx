import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-5 bg-slate-900 text-white">
      <h1 className="text-2xl font-bold">mailM</h1>

      <ul className="flex items-center space-x-8 text-sm font-medium">
        <li>
          <Link to="/" className="hover:text-blue-400">Home</Link>
        </li>

        

        <li>
          <Link to="/mailDashboard/sent/" className="hover:text-blue-400">sent Dashboard</Link>
        </li>
        <li>
          <Link to="/mailDashboard/recieved/" className="hover:text-blue-400">recieved Dashboard</Link>
        </li>
       
        <li>
          <Link to="/mailTemplate" className="hover:text-blue-400">Template</Link>
        </li>
        <li>
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        </li>
         
         <li>
          <Link to="/mail" className="hover:text-blue-400">Fetch Mail</Link>
        </li>
        <li>
          <Link to="/mailComposer" className="hover:text-blue-400">SendAmail</Link>
        </li>
         

        {!token ? (
          <li>
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;