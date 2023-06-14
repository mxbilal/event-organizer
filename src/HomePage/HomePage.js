import React, { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import RecentEvents from "./RecentEvents/RecentEvents";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

//src
import "./HomePage.scss";
import { getBannerEvents } from "./action";
import Layout from "../Layout";
// import { EventIdContext } from "../ContextAPI/EventId";

const HomePage = () => {
  const [bannerEvent, setBannerEvent] = useState([]);
  const [loader, setLoader] = useState(true);
  // const eventId2 = useContext(EventIdContext);
  useEffect(() => {
    getBannerEvents({ callback: (res) => setBannerEvent(res) });
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  return (
    <>
      {loader && <CircularProgress />}
      {!loader && Object.keys(bannerEvent).length > 0 && (
        <>
          {/* <p>{eventId2}</p> */}
          <Banner bannerEvent={bannerEvent} />
          <AboutUs />
          <UpcomingEvents />
          <RecentEvents />
        </>
      )}
    </>
  );
};

export default HomePage;
