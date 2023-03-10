import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCookies } from "react-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>

      {!cookies.access_token ? (
        <Link to="/auth">Login</Link>
      ) : (
        <>
          <Link to="/saved-recipe">Saved Recipe</Link>
          <button
            onClick={() => {
              setCookies("access_token", "");
              window.localStorage.removeItem("userID");
              navigate("/auth");
            }}
          >
            Logged Out
          </button>
        </>
      )}
    </div>
  );
};

export default Navbar;
