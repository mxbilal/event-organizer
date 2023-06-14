import React, { useState } from "react";
import HeaderPage from "../HeaderPage";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

//src
import "./ChangePassword.scss";
import { ChangePasswordCall } from "./action";
import { RefreshToken } from "../auth/RefreshToken";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [password1, setPassword1] = useState("");
  const [password1Eye, setPassword1Eye] = useState(false);
  const [password2, setPassword2] = useState("");
  const [password2Eye, setPassword2Eye] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [oldPasswordEye, setOldPasswordEye] = useState(false);
  const [loader, setLoader] = useState(false);
  const [screen, setScreen] = useState("changePass");
  const [error, setError] = useState(false);
  const [errorContent, setErrorContent] = useState("");

  const ChangePasswordAPI = async () => {
    const response = await ChangePasswordCall(password1, oldPassword);
    if (response === undefined) {
      RefreshToken();
      ChangePasswordAPI();
    } else setScreen("changePass2");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    if (password1 !== password2) {
      setError(true);
      setErrorContent("Your Password didn't match confirm password");
    } else if (
      password1.length < 8 ||
      password2.length < 8 ||
      oldPassword.length < 8
    ) {
      setError(true);
      setErrorContent("password is less then 8");
    } else {
      setError(false);
      ChangePasswordAPI();
    }
    setLoader(false);
  };

  return (
    <>
      <div className="sign-up-main">
        {screen === "changePass" ? (
          <form onSubmit={handleSubmit}>
            <div className="forgot-pass-form">
              <p className="welcome-msg">Change Password</p>
              <p className="desc">
                Enter a new password below to change your password
              </p>
              <TextField
                style={{ marginTop: "48px" }}
                error={error}
                onFocus={() => setError(false)}
                //helperText= 'Please Enter Your Email'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your Password"
                type={!oldPasswordEye ? "password" : "text"}
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {oldPasswordEye ? (
                        <VisibilityIcon
                          onClick={() => setOldPasswordEye(!oldPasswordEye)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => setOldPasswordEye(!oldPasswordEye)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                style={{ marginTop: "24px" }}
                error={error}
                onFocus={() => setError(false)}
                //helperText= 'Please Enter Your Email'
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Enter New Password"
                type={!password1Eye ? "password" : "text"}
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {password1Eye ? (
                        <VisibilityIcon
                          onClick={() => setPassword1Eye(!password1Eye)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => setPassword1Eye(!password1Eye)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                style={{ marginTop: "24px" }}
                error={error}
                onFocus={() => setError(false)}
                //helperText= 'Please Enter Your Email'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm New Password"
                type={!password2Eye ? "password" : "text"}
                variant="outlined"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {password2Eye ? (
                        <VisibilityIcon
                          onClick={() => setPassword2Eye(!password2Eye)}
                        />
                      ) : (
                        <VisibilityOffIcon
                          onClick={() => setPassword2Eye(!password2Eye)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <br />
              {error && (
                <Alert
                className="error-message"
                  variant="outlined"
                  severity="error"
                >
                  {error ? errorContent : ""}
                </Alert>
              )}
              <br />
              <LoadingButton
                type="submit"
                loading={loader}
                variant="contained"
                color="secondary"
              >
                Change Password
              </LoadingButton>
            </div>
            <br />
          </form>
        ) : (
          <>
            <div className="forgot-pass-form-success">
              <svg
                className="done-svg"
                xmlns="http://www.w3.org/2000/svg"
                data-name="Layer 1"
                viewBox="0 0 168 168"
              >
                <path
                  fill="#0bceb2"
                  d="M85,31.16353a56,56,0,1,0,56,56A56.06291,56.06291,0,0,0,85,31.16353Zm0,108a52,52,0,1,1,52-52A52.059,52.059,0,0,1,85,139.16353Z"
                />
                <path
                  fill="#2d4356"
                  d="M115.59766,61.73775,68.27051,108.311,54.44922,93.78463a2.0004,2.0004,0,0,0-2.89844,2.75781l15.22363,16a2.00007,2.00007,0,0,0,1.416.62109h.0332a1.99923,1.99923,0,0,0,1.40234-.57422l48.77637-48a1.99986,1.99986,0,1,0-2.80469-2.85156Z"
                />
                <path
                  fill="#2d4356"
                  d="M150.72131 146.91353H106.26178a64 64 0 1 0-44.52356 0H17.27869a2.017 2.017 0 1 0 0 4H150.72131a2.017 2.017 0 1 0 0-4zM24 86.91353a60 60 0 1 1 60 60A60.06812 60.06812 0 0 1 24 86.91353zM88.5 17.66353a3 3 0 1 0-3-3A3.00344 3.00344 0 0 0 88.5 17.66353zm0-4.5a1.5 1.5 0 1 1-1.5 1.5A1.50148 1.50148 0 0 1 88.5 13.16353zM158.30471 67.91353a2 2 0 1 0 2 2A2.00229 2.00229 0 0 0 158.30471 67.91353zm0 3a1 1 0 1 1 1-1A1.001 1.001 0 0 1 158.30471 70.91353zM130 3.5802a2 2 0 1 0 2 2A2.00229 2.00229 0 0 0 130 3.5802zm0 3a1 1 0 1 1 1-1A1.001 1.001 0 0 1 130 6.5802zM161.33333 15.24687a2 2 0 1 0 2 2A2.00229 2.00229 0 0 0 161.33333 15.24687zm0 3a1 1 0 1 1 1-1A1.001 1.001 0 0 1 161.33333 18.24687zM30.30471 30.5802a2 2 0 1 0-2 2A2.00229 2.00229 0 0 0 30.30471 30.5802zm-3 0a1 1 0 1 1 1 1A1.001 1.001 0 0 1 27.30471 30.5802z"
                />
                <polygon
                  fill="#0bceb2"
                  points="10.888 67.925 12.375 65.969 11.436 65.437 10.481 67.627 10.45 67.627 9.48 65.453 8.525 66 9.996 67.91 9.996 67.941 7.695 67.643 7.695 68.707 10.011 68.41 10.011 68.441 8.525 70.35 9.416 70.914 10.434 68.707 10.465 68.707 11.404 70.898 12.39 70.335 10.888 68.457 10.888 68.425 13.25 68.707 13.25 67.643 10.888 67.956 10.888 67.925"
                />
                <polygon
                  fill="#0bceb2"
                  points="12.162 6.238 11.306 7.337 11.819 7.662 12.405 6.391 12.423 6.391 12.964 7.653 13.532 7.328 12.667 6.247 12.667 6.229 14.027 6.391 14.027 5.778 12.667 5.959 12.667 5.941 13.523 4.814 12.982 4.508 12.433 5.769 12.414 5.769 11.856 4.517 11.306 4.832 12.153 5.932 12.153 5.95 10.828 5.778 10.828 6.391 12.162 6.22 12.162 6.238"
                />
                <polygon
                  fill="#0bceb2"
                  points="65.305 6.294 65.305 5.25 62.988 5.557 62.988 5.526 64.446 3.608 63.525 3.086 62.589 5.235 62.558 5.235 61.607 3.101 60.67 3.639 62.113 5.511 62.113 5.542 59.856 5.25 59.856 6.294 62.128 6.002 62.128 6.033 60.67 7.905 61.545 8.458 62.543 6.294 62.573 6.294 63.494 8.442 64.461 7.89 62.988 6.048 62.988 6.017 65.305 6.294"
                />
                <polygon
                  fill="#0bceb2"
                  points="138.858 35.839 140.116 34.184 139.321 33.734 138.514 35.587 138.487 35.587 137.667 33.747 136.858 34.21 138.103 35.826 138.103 35.852 136.157 35.6 136.157 36.5 138.116 36.249 138.116 36.276 136.858 37.89 137.613 38.367 138.474 36.5 138.5 36.5 139.294 38.354 140.129 37.877 138.858 36.289 138.858 36.262 140.856 36.5 140.856 35.6 138.858 35.865 138.858 35.839"
                />
                <circle cx="2" cy="148.914" r="2" fill="#2d4356" />
                <path
                  fill="#2d4356"
                  d="M11 146.91353H8a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4zM160 146.91353h-3a2 2 0 0 0 0 4h3a2 2 0 0 0 0-4z"
                />
                <circle cx="166" cy="148.914" r="2" fill="#2d4356" />
                <path
                  fill="#0bceb2"
                  d="M118.15387 154.91353h-8.30774a2.00641 2.00641 0 0 0 0 4h8.30774a2.00641 2.00641 0 0 0 0-4zM58.15387 154.91353H49.84613a2.00641 2.00641 0 0 0 0 4h8.30774a2.00641 2.00641 0 0 0 0-4zM104 154.91353H64a2 2 0 0 0 0 4H79.94v2H72a2 2 0 0 0 0 4H97a2 2 0 0 0 0-4H88.06v-2H104a2 2 0 0 0 0-4z"
                />
              </svg>
              <p className="welcome-msg">Password Changed</p>
              <p className="desc">
                Your password has been Successfully changed.
              </p>
              <Button
                style={{ marginTop: "36px" }}
                type="submit"
                variant="contained"
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </div>
            <br />
          </>
        )}
      </div>
    </>
  );
};
export default ChangePassword;
