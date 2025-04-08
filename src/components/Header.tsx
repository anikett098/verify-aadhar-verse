
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-white shadow-md py-4">
      <div className="aadhar-container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-primary font-bold text-xl">A</span>
          </div>
          <h1 className="text-xl font-bold">Aadhar Verification</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/create-update" className="hover:underline">Apply</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
