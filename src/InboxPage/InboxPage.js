import React, { useState } from "react";
import PrivateChat from "./PrivateChat/PrivateChat";
import PublicChat from "./PublicChat/PublicChat";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SideBar from "../SideBar/SideBar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//src
import "./InboxPage.scss";

export default function InboxPage() {
  const eventId = window.location.pathname.split("/")[2];
  const [selectedTab, setSelectedTab] = useState("pub-chat");
  const [showMenu, SetShowMenu] = useState(true);
  const [value, setValue] = useState('pub-chat');

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue)
    setValue(newValue);
  };
  const handleChange = (e) => {
    SetShowMenu(e);
  };

  return (
    <>
      <div className="inbox-main">
        {showMenu && (
          <div className="conversation-main">
            <div className="conversation-title-main">
              <div className="conversation-title">
                <p>conversation</p>
                {/* <CancelOutlinedIcon onClick={() => SetShowMenu(false)} /> */}
              </div>
            </div>
            <div className="chat-tabs">
              <Tabs
                value={value}
                onChange={handleChangeTab}
                textColor="secondary"
                indicatorColor="primary"
              >
                <Tab value="pub-chat" label="Public Chat" />
                <Tab value="pr-chat" label="Private Chat" />
              </Tabs>
            </div>
            <hr />
            {selectedTab === "pr-chat" ? <PrivateChat /> : <PublicChat />}
          </div>
        )}
        {/* <SideBar onChange={handleChange} selectedprop={"inbox"} /> */}
      </div>
    </>
  );
}
