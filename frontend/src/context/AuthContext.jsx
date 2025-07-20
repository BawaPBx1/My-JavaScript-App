import { useState, useEffect, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return setUser(null);

    try {
      const decodedUser = jwtDecode(token);

      // ⏰ Optional: check expiry
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp < currentTime) {
        console.warn("⏳ Token expired");
        localStorage.removeItem("token");
        return setUser(null);
      }

      setUser(decodedUser);
    } catch (err) {
      console.error("Failed to decode token:", err.message);
      setUser(null);
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { useState, useEffect, createContext } from "react";
// import jwtDecode from "jwt-decode";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('token');
//     // storedUser ? setUser(JSON.parse(storedUser)) : setUser(null);
//     storedUser ? setUser(storedUser) : setUser(null);
//   }, [])
  
//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }