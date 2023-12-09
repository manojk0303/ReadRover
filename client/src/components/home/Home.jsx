import FileUpload from "../fileupload/FIleUpload";
import Navbar from "../navbar/Navbar";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Home = () => {
      const navigate = useNavigate();
   useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('jwt');
        if (!token) {
          // Handle the case where the token is not present
          console.error('JWT token not found in localStorage');
          navigate("/register");
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserDetails();
  },[]
  );
    return (
        <div>
            <Navbar />
            <FileUpload />
        </div>
    )
}
export default Home;