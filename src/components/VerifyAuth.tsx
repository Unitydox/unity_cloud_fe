import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem('user');
    console.log(!user && !location.pathname.startsWith("/user"));
    
    // Check if the current route starts with "/user"
    if (!user && !location.pathname.startsWith("/user")) {
      localStorage.clear();
      navigate("/user/login");
    }
  }, [navigate, location]);

  return (
    <></>
  );
}

export default VerifyAuth;
