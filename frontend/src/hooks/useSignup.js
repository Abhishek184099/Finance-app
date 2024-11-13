import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const useSignup = () => {

  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();


  const signup = async ({ userName, password, email }) => {


    let success = await handleInputErrors({ userName, password, email })
    if (!success) {
      return
    }
    try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password,email }),
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        else {
          //localStorage
          localStorage.setItem("user", JSON.stringify(data));
          setAuthUser(data);
          toast.success("User registerd successfully")
          navigate("/")
        }
    } catch (err) {
      toast.error(err.message);
      

    } finally {
      setLoading(false);
    }
  }
  return { loading, signup };
}
export default useSignup;

const handleInputErrors = async ({ userName, password, email }) => {
  if ( !userName || !password || !email) {
    toast.error("Please fill in all fields")
    return false
  }

  if (password.length < 6) {
    toast.error("password must be more than 6 character")
    return false
  }

  return true;
}