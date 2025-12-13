import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
