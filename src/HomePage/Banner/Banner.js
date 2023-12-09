import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayBtn from "../../SVG/PlayBtn";

//src
import "./Banner.scss";

const Banner = ({ bannerEvent }) => {
  const [livebtn, setLivebtn] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    var { items } = bannerEvent;
    var currentTime = new Date().getTime();
    var begin = new Date().getTime();
    var end = new Date("2023-10-09").getTime();
    if (currentTime > begin && currentTime < end) {
      setLivebtn(1);
    } else if (currentTime < begin) {
      setLivebtn(2);
    } else {
      setLivebtn(3);
    }
  }, [bannerEvent]);
  // console.log(bannerEvent.items[0].schedule_begin);
  return (
    <>
      <div
        onClick={() => {
          localStorage.setItem("evId", bannerEvent.items[0].id);
          localStorage.setItem("slug", bannerEvent.items[0].meta.slug);
          localStorage.setItem("menu", "participants");
          navigate(
            "/events/" +
              bannerEvent.items[0].id +
              "/" +
              bannerEvent.items[0].meta.slug +
              "/participants/",
            {
              state: { id: bannerEvent.items[0].id },
            }
          );
        }}
        className="homepage-container"
      >
        <img
          className="banner-img"
          src="/assets/dummy/banner.jpg"
          width="100%"
          height="100%"
        />
        <div className="banner-play-btn">
          <PlayBtn />
        </div>
        <div className="details-container">
          <div className="homepage-section-2-text">
            {livebtn === 1 ? (
              <button className="banner-live-now-btn">
                {" "}
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="white" />
                </svg>
                LIVE NOW
              </button>
            ) : livebtn === 2 ? (
              <p className="time">
                {"25 March 2023" +
                  "  " +
                  "06:00 PM" +
                  " - " +
                  "25 March 2023" +
                  "  " +
                  "08:00 PM"}
              </p>
            ) : livebtn === 3 ? (
              <p className="time ">Streamed On 25 March 2023</p>
            ) : (
              ""
            )}
            <p className="heading">{"justin bieber Concert"}</p>
            <p className="para">{"Music Night"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
