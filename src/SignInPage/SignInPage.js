import React, { useContext, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import setAuthToken from "../auth/SetAuthToken";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

//src
import "./SignInPage.scss";
import { SignIn } from "./action";

export default function SignInPage() {
  // const [eventId,setEventId] = useContext(EventIdContext)
  const navigate = useNavigate();
  const location = useLocation();
  const [credientials, setCredientials] = useState({
    email: "",
    password: "",
  });
  const evId = localStorage.getItem("evId");
  const evSlug = localStorage.getItem("slug");
  const [rememberMe, setRememberMe] = useState("false");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [passwordEye, setPasswordEye] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const response = await SignIn(credientials);
    if (response && response.access_token) {
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("rf_token", response.refresh_token);
      localStorage.setItem("userDetail", JSON.stringify(response));
      setAuthToken(response.access_token);
      evId !== null
        ? navigate("/events/" + evId + "/" + evSlug + "/participants/")
        : navigate("/");
      window.location.reload();
    } else {
      setError("invalid credientials!");
    }
    setLoader(false);
  };
  const handleChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="sign-in-main">
        <form onSubmit={handleSubmit}>
          <div className="sign-in-form">
            <p className="welcome-msg">Welcome Back</p>
            <p className="desc">
              Enter your credientials to access your account
            </p>
            <TextField
              style={{ marginTop: "50px" }}
              error={error ? true : false}
              //helperText= 'Please Enter Your Email'
              value={credientials.email}
              onFocus={() => setError("")}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your email address"
              type="email"
              name="email"
              variant="outlined"
              required
            />
            <TextField
              style={{ marginTop: "24px", borderRadius: "8px" }}
              error={error ? true : false}
              onFocus={() => setError("")}
              //helperText= 'Please Enter Your Email'
              value={credientials.password}
              onChange={(e) => handleChange(e)}
              name="password"
              //inputProps={{ pattern: "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"}}
              placeholder="Enter your Password"
              type={!passwordEye ? "password" : "text"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {passwordEye ? (
                      <VisibilityIcon
                        onClick={() => setPasswordEye(!passwordEye)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setPasswordEye(!passwordEye)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              required
            />
            <br />
            {error ? (
              <Alert
              className="error-message"
                style={{  }}
                variant="outlined"
                severity="error"
              >
                {error}
              </Alert>
            ) : (
              ""
            )}
            <div className="sign-in-option">
              <FormControlLabel
                control={
                  <Checkbox
                    value={rememberMe}
                    onChange={(e) => setRememberMe(e)}
                  />
                }
                label="Remember Me"
              />
              <p
                className="forgot-pass"
                onClick={() => navigate("/password/forgot")}
              >
                Forgot Password?
              </p>
            </div>
            <LoadingButton
              type="submit"
              loading={loader}
              variant="contained"
              color="secondary"
            >
              Sign In
            </LoadingButton>
          </div>
          <br />
        </form>
      </div>
    </>
  );
}
