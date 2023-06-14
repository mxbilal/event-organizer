import React, { useState, useEffect } from "react";
import FooterPage from "../../FooterPage/FooterPage";
import HeaderPage from "../../HeaderPage";
import SideBar from "../../SideBar";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import { Avatar, Button } from "@mui/material";

//src
import "./ParticipantProfile.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { getAttendeeProfile } from "../action";
import { RefreshToken } from "../../auth/RefreshToken";

export default function ParticipantProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = window.location.pathname.split("/");
  const eventId = url[2];
  const slug = url[3];
  const profileId = location.state;
  const [profileData, setProfileData] = useState();
  const [loader, setLoader] = useState(true);
  const getFilterAttendeesAPI = async () => {
    setLoader(true);
    const response = await getAttendeeProfile(profileId);
    if (response === undefined) {
      RefreshToken();
      getFilterAttendeesAPI();
    } else setProfileData(response.data);
    setLoader(false);
  };
  useEffect(() => {
    getFilterAttendeesAPI();
  }, []);
  const [showMenu, SetShowMenu] = useState(true);
  const handleChange = (e) => {
    SetShowMenu(e);
  };

  return (
    <>
      <div className="participant-profile-main">
        {loader && <CircularProgress />}
        {!loader && (
          <div className="participant-profile-inside">
            <div className="participants-title-main-profile">
              <div className="participants-title-profile">
                <ArrowBackOutlinedIcon onClick={() => navigate(-1)} />
              </div>
              <div>
                <MoreVertOutlinedIcon onClick={() => console.log("side")} />
              </div>
            </div>
            <div className="participant-profile-detail">
              <Avatar
                className="participants-profile-img"
                alt="dp"
                src={
                  profileData !== null && profileData.avatar?.meta.download_url
                }
                sx={{ width: 100, height: 100 }}
              />
              {/* <img
              height="156px"
              width="156px"
              src={profileData !== null && profileData.avatar?.meta.download_url}
              alt="dp"
            /> */}
              <p className="user-name">{profileData.full_name}</p>
              <p className="user-email">{profileData.email}</p>
              <p className="user-desc">{profileData.biography}</p>
            </div>
            <div className="participant-address-detail">
              {profileData?.job_title !== "" && (
                <>
                  <div>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2044 3.51898C10.534 3.51898 9.96373 3.9848 9.80365 4.61265H15.1863C15.0263 3.9848 14.456 3.51898 13.7856 3.51898H11.2044ZM16.7071 4.61264H18.6881C20.7891 4.61264 22.5 6.34428 22.5 8.47085C22.5 8.47085 22.44 9.3711 22.42 10.6248C22.418 10.724 22.3699 10.8212 22.2909 10.88C21.8097 11.2354 21.3694 11.5291 21.3294 11.5493C19.6686 12.6632 17.7386 13.447 15.6826 13.8369C15.5485 13.8632 15.4165 13.7934 15.3484 13.6739C14.7721 12.6754 13.6956 12.0253 12.495 12.0253C11.3024 12.0253 10.2159 12.6683 9.62256 13.6678C9.55353 13.7853 9.42346 13.8531 9.2904 13.8278C7.25138 13.4369 5.32141 12.6541 3.67059 11.5594L2.71011 10.8911C2.63007 10.8405 2.58004 10.7493 2.58004 10.6481C2.55003 10.1316 2.5 8.47085 2.5 8.47085C2.5 6.34428 4.21086 4.61264 6.31191 4.61264H8.28289C8.47299 3.1443 9.7036 2 11.2044 2H13.7856C15.2864 2 16.517 3.1443 16.7071 4.61264ZM22.1598 12.8152L22.1198 12.8355C20.0988 14.1924 17.6676 15.0937 15.1163 15.4684C14.7561 15.519 14.3959 15.2861 14.2959 14.9216C14.0758 14.0912 13.3654 13.5443 12.515 13.5443H12.505H12.485C11.6346 13.5443 10.9242 14.0912 10.7041 14.9216C10.6041 15.2861 10.2439 15.519 9.88369 15.4684C7.33242 15.0937 4.9012 14.1924 2.88019 12.8355C2.87019 12.8254 2.77014 12.7646 2.6901 12.8152C2.60005 12.8659 2.60005 12.9874 2.60005 12.9874L2.67009 18.1519C2.67009 20.2785 4.37094 22 6.47199 22H18.518C20.6191 22 22.3199 20.2785 22.3199 18.1519L22.4 12.9874C22.4 12.9874 22.4 12.8659 22.3099 12.8152C22.2599 12.7849 22.1999 12.795 22.1598 12.8152ZM13.2454 17.0583C13.2454 17.4836 12.9152 17.8177 12.495 17.8177C12.0848 17.8177 11.7446 17.4836 11.7446 17.0583V15.7519C11.7446 15.3367 12.0848 14.9924 12.495 14.9924C12.9152 14.9924 13.2454 15.3367 13.2454 15.7519V17.0583Z" fill="#A1A9BF"/>
                    </svg>
                    <p>{profileData?.job_title}</p>
                  </div>
                  <br />
                </>
              )}
              {profileData?.institution !== "" && (
                <>
                  <div>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.63478 20.7733V17.7156C9.63478 16.9351 10.2722 16.3023 11.0584 16.3023H13.9326C14.3102 16.3023 14.6723 16.4512 14.9393 16.7163C15.2063 16.9813 15.3563 17.3408 15.3563 17.7156V20.7733C15.3539 21.0978 15.4821 21.4099 15.7124 21.6402C15.9427 21.8705 16.2561 22 16.5829 22H18.5438C19.4596 22.0023 20.3388 21.6428 20.9872 21.0008C21.6356 20.3588 22 19.487 22 18.5778V9.86686C22 9.13246 21.6721 8.43584 21.1046 7.96467L14.434 2.67587C13.2737 1.74856 11.6111 1.7785 10.4854 2.74698L3.96701 7.96467C3.37274 8.42195 3.01755 9.12064 3 9.86686V18.5689C3 20.4639 4.54738 22 6.45617 22H8.37229C9.05123 22 9.603 21.4562 9.60792 20.7822L9.63478 20.7733Z" fill="#A1A9BF"/>
                    </svg>
                    <p>{profileData?.institution}</p>
                  </div>
                  <br />
                </>
              )}
              {profileData?.country_code !== "" && (
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 10.3178C4 5.71789 7.84388 2 12.4934 2C17.1561 2 21 5.71789 21 10.3178C21 12.6357 20.157 14.7876 18.7695 16.6116C17.2388 18.6235 15.3522 20.3765 13.2285 21.7524C12.7425 22.0704 12.3039 22.0944 11.7704 21.7524C9.63474 20.3765 7.74809 18.6235 6.2305 16.6116C4.84198 14.7876 4 12.6357 4 10.3178ZM9.69423 10.5768C9.69423 12.1177 10.9517 13.3297 12.4934 13.3297C14.0362 13.3297 15.3058 12.1177 15.3058 10.5768C15.3058 9.0478 14.0362 7.77683 12.4934 7.77683C10.9517 7.77683 9.69423 9.0478 9.69423 10.5768Z" fill="#A1A9BF"/>
                  </svg>
                  <p>{profileData?.country_code}</p>
                </div>
              )}
            </div>
            <div className="participant-option">
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(`/events/${eventId}/${slug}/participants/chat/`)
                }
              >
                Start Chat
              </Button>
              <Button variant="outlined">Block</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
