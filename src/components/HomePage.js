import React from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setSignedIn,
  setUserData
} from "../features/userSlice";
import "../styling/home.css";

import { Avatar } from "@material-ui/core";
import Blogs from "./Blogs";

const HomePage = () => {
  const login = (response) => {
    console.log(response);
    dispatch(setSignedIn(true));
    dispatch(setUserData(response.profileObj));
  };
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);

  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
      {!isSignedIn ? (
        <div className="login__message">
          <h1>A Readers favourite place!</h1>
          <p>
            We provide high quality online resource for reading blogs. Just sign
            up and start reading some quality blogs
          </p>
          <GoogleLogin
            clientId="425088558519-7bao39kv5na0fhtcp6baiuqartncm82u.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="login__button"
              >
                Login with Google
              </button>
            )}
            onSuccess={login}
            onFailure={login}
            isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomePage;
