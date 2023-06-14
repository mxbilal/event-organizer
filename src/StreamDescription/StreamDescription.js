import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MediaLibrary from "./MediaLibrary";
import parse from "html-react-parser";

//src
import "./StreamDescription.scss";
export default function StreamDescription(props) {
  const { desp } = props;
  const [selectedTab, setSelectedTab] = useState("desc");
  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div className="desc-main">
      <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="desc" label="Description" />
        <Tab value="media" label="Media Library" />
      </Tabs>
      {selectedTab === "desc" ? (
        <div className="desc-container">
          {desp.length !== 0 && (
            <>
              <br />
              <p className="desc-heading">LIVE STREAMING</p>
              <br />
              <h3 className="desc-heading-title">
                {desp && desp[0].value.heading_text}
              </h3>
              <br />
              <br />
              <br />
              <div className="desc-para">{parse(`${desp[1].value}`)}</div>
              <br />
            </>
          )}
        </div>
      ) : (
        <MediaLibrary />
      )}
    </div>
  );
}
