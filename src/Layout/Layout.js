import React, { useEffect, useState } from "react";
import HeaderPage from "../HeaderPage";
import SideBar from "../SideBar";
import FooterPage from "../FooterPage";
import parse from "html-react-parser";
import CircularProgress from "@mui/material/CircularProgress";
import StreamDescription from "../StreamDescription";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

//src
import "./Layout.scss";
import { EventDesp, EventStream } from "./action";
import { RefreshToken } from "../auth/RefreshToken";
import GetLivePoll from "./GetLivePoll";

const Layout = ({ children }) => {
  const [url, setUrl] = useState("/");
  const [count, setCount] = useState(1);
  const [stream, setStream] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showMenu, SetShowMenu] = useState(true);
  const login = localStorage.getItem("token") !== null ? true : false;
  const url1 = window.location.pathname.split("/");

  const eventId = url1.length > 2 ? url1[2] : null;
  const [eventDesp, setEventDesp] = useState([]);

  const EventStreamAPI = async () => {
    setLoader(true);
    const response = await EventStream(eventId);
    if (response === undefined) {
      await RefreshToken();
      EventStreamAPI();
    } else setStream(response);
    setLoader(false);
  };
  const EventDespAPI = async () => {
    setLoader(true);
    const response = await EventDesp(eventId);
    if (response === undefined) {
      await RefreshToken();
      EventDespAPI();
    } else setEventDesp(response.data.body);
    setLoader(false);
  };
  useEffect(() => {
    if (eventId !== null && login) {
      EventStreamAPI();
      EventDespAPI();
    }
  }, [eventId]);

  setInterval(() => {
    setUrl(window.location.pathname);
    clearInterval();
  }, 500);

  function handleChange(newValue) {
    SetShowMenu(newValue);
  }

  // setInterval(() => {
  //   setTimeout(() => {
  //     console.log("II")
  //   }, 3000);
  //   clearInterval()
  //   // if(eventId !== null && login){ getLivePollAPI() }
  // },1000);

  if (
    url === "/" ||
    url.includes("password") ||
    url.includes("/sign-in") ||
    url.includes("/user")
  ) {
    return (
      <>
        <HeaderPage />
        <div style={{ width: "100%" }}>{children}</div>
        <FooterPage />
      </>
    );
  } else
    return (
      <>
        <HeaderPage />
        <div className="layout-main">
          {/* {loader && <CircularProgress />} */}
          {!loader && login && (
            <div className="stream-container">
              <div className="layout-event-stream">
                {stream?.meta?.total_count !== 0 &&
                stream?.items[0] !== undefined ? (
                  <div className="container">
                    {parse(
                      `<iframe className="responsive-iframe" src=${stream?.items[0].embed_code} allowfullscreen frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true"></iframe>`
                    )}
                  </div>
                ) : (
                  <div className="no-video-container">
                    <div className="content">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                      >
                        <g data-name="Layer 57">
                          <path d="M16,31A15,15,0,1,1,31,16,15,15,0,0,1,16,31ZM16,3A13,13,0,1,0,29,16,13,13,0,0,0,16,3Z" />
                          <path d="M16 24a2 2 0 1 1 2-2A2 2 0 0 1 16 24zm0-2zM16 18a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v9A1 1 0 0 1 16 18z" />
                        </g>
                      </svg>
                      <p>This video is currently not available.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div
            style={{ width: showMenu ? "35%" : "4%" }}
            className="mobile-layout"
          >
            {showMenu && (
              <div className="layout-children">
                <GetLivePoll />
                <svg
                  className="cross-btn"
                  onClick={() => SetShowMenu(false)}
                  width="30"
                  height="30"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="18"
                    fill="#282828"
                    fill-opacity="0.08"
                  />
                  <path
                    d="M25 12.415L23.585 11L18 16.585L12.415 11L11 12.415L16.585 18L11 23.585L12.415 25L18 19.415L23.585 25L25 23.585L19.415 18L25 12.415Z"
                    fill="black"
                  />
                </svg>

                {children}
              </div>
            )}
            {login && (
              <SideBar
                selectedprop={localStorage.getItem("menu")}
                onChange={handleChange}
                showMenu={showMenu}
              />
            )}
          </div>
        </div>
        <div className="description-container">
          <StreamDescription desp={eventDesp} />
        </div>
        <FooterPage />
      </>
    );
};

export default Layout;
