import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { authUser, setAuthUser } = useAuthContext();

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='))
        ?.split('=')[1]; // Assuming your JWT is stored in a cookie named 'jwt'

      if (!token) {
        setAuthUser(null);
        return;
      }

      try {
        const res = await fetch('/api/auth/validate', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) {
          setAuthUser(null); // Clear authUser if token is invalid
        } else {
          const data = await res.json();
          setAuthUser(data.user); // Assuming the response contains user data
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setAuthUser(null);
      }
    };

    checkAuthToken();
  }, [setAuthUser]);

  return (
    <div className='h-screen'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;


