import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Avatar from "@mui/material/Avatar";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from "@mui/icons-material/Close";
//src
import "./HeaderPage.scss";
import HeadLogo from "./HeadLogo";

const HeaderPage = () => {
  const navigate = useNavigate();
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  const userId = userDetail !== null && userDetail.user.pk;
  const avatar = userDetail !== null && userDetail.user.avatar?.download_url;
  const userName =
    userDetail !== null &&
    userDetail.user.first_name + userDetail.user.last_name;
  const userEmail = userDetail !== null && userDetail.user.email;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openHeader, setOpenHeader] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="header-page-container">
      <div className="header-page-main">
        <HeadLogo />
        <div className="desktop-head">
            <div className="header-page-actions">
              <p>About Us</p>
              <p>Contact Us</p>
              {userId ? (
                <>
                  <div className="header-login">
                    <Avatar alt="dp" src={avatar === null ? "" : avatar} />
                    <div>
                      <p className="userName">{userName}</p>
                      <p className="userEmail">{userEmail}</p>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <p
                          className="logout"
                          onClick={() => {
                            navigate("/password/change");
                            handleClose();
                          }}
                        >
                          Change Password
                        </p>
                        <p className="logout" onClick={handleLogout}>
                          Logout
                        </p>
                      </Popover>
                    </div>
                    <ArrowDropDownIcon onClick={handleClick} />
                  </div>
                </>
              ) : (
                <>
                  <p
                    onClick={() => navigate("/sign-in")}
                    className="black-rounded-btn"
                  >
                    Login
                  </p>
                </>
              )}
            </div>
        </div>

        <div className="mobile-head">
          <div className="mobile-header-side">
            {openHeader ? (
              <CloseIcon
                onClick={() => setOpenHeader(false)}
                fontSize="large"
              />
            ) : (
              <MenuOutlinedIcon
                onClick={() => setOpenHeader(true)}
                fontSize="large"
              />
            )}
          </div>
          
        </div>
        
      </div>
      <div className="mobile-head2">
      {openHeader ? (
            <div className="header-page-actions">
              <p>About Us</p>
              <p>Contact Us</p>
              {userId ? (
                <>
                  <div className="header-login">
                    <Avatar alt="dp" src={avatar === null ? "" : avatar} />
                    <div className="header-popover">
                      <p className="userName">{userName}</p>
                      <p className="userEmail">{userEmail}</p>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <p className="logout" onClick={handleLogout}>
                          Logout
                        </p>
                        <p
                          className="logout"
                          onClick={() => {
                            navigate("/password/change");
                            handleClose();
                            setOpenHeader(false)
                          }}
                        >
                          Change Password
                        </p>
                      </Popover>
                    </div>
                    <ArrowDropDownIcon onClick={handleClick} />
                  </div>
                </>
              ) : (
                <>
                  <p
                    onClick={() => {
                      navigate("/sign-in")
                      setOpenHeader(false)
                    }}
                    className="black-rounded-btn"
                  >
                    Login
                  </p>
                </>
              )}
            </div>
          ) : (
            ""
          )}
      </div>
    </div>
  );
};
export default HeaderPage;
