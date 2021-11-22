import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setSearchInput,
  setSignedIn,
  setUserData
} from "../features/userSlice";
import "../styling/navbar.css";

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(inputValue));
  };

  return (
    <div className="navbar">
      <h1 className="navbar__header">Redux-Blog</h1>
      {isSignedIn && (
        <div className="blog__search">
          <input
            type="text"
            className="search"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar src={userData?.imageUrl} alt={userData?.name} />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="425088558519-7bao39kv5na0fhtcp6baiuqartncm82u.apps.googleusercontent.com"
            render={(renderProps) => (
              <button onClick={renderProps.onClick} className="logout__button">
                Log out
              </button>
            )}
            buttonText="Logout"
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <h1 className="notSignedIn">User not available</h1>
      )}
    </div>
  );
};

export default Navbar;
