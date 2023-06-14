import React,{useState} from "react";
import FooterPage from "../../FooterPage/FooterPage";
import HeaderPage from "../../HeaderPage";
import SideBar from "../../SideBar";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useNavigate } from "react-router-dom";

//src
import "./ParticipantChat.scss";

export default function ParticipantChat() {
  const navigate = useNavigate();

  return (
    <>
      <div className="participant-chat-main">
        <div className="participant-chat-inside">
          <div className="participants-title-main">
            <div className="participants-title">
              <ArrowBackOutlinedIcon
                onClick={() => navigate(-1)}
              />
              <div className="participant-head">
                
                <img
                  src="./assets/dp.png"
                  alt="dp"
                  title="Ruby Rhod"
                  width="50px"
                  height="50px"
                />
                {/* <img src="./assets/dot.png" width='20px' height='20px' /> */}
                <div>
                  <div>
                    <p>Lydia Vaccaro</p>
                    <p> Online</p>
                  </div>
                  <p>lydiavaccaro@example.com</p>
                </div>
              </div>
              <MoreVertOutlinedIcon onClick={() => console.log("side")} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
