
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="aadhar-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Aadhar Verification</h3>
            <p className="text-gray-600">
              Secure identity verification for all citizens with advanced video eKYC technology.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/create-update" className="text-gray-600 hover:text-primary">Apply for Aadhar</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Check Status</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Help & Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
            <p className="text-gray-600">Email: support@aadharverify.gov.in</p>
            <p className="text-gray-600">Toll-Free: 1800-XXX-XXXX</p>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Aadhar Verification. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
