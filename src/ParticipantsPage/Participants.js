import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import Popover from "@mui/material/Popover";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
//src
import "./Participants.scss";
import {
  getEventAttendees,
  getFilterAttendees,
  getSortedAttendees,
} from "./action";
import { RefreshToken } from "../auth/RefreshToken";
import SearchIcon from "../SVG/SearchIcon";
const filteMenu = [
  {
    id: 1,
    label: "name",
  },
  {
    id: 2,
    label: "email",
  },
  {
    id: 3,
    label: "country",
  },
  {
    id: 4,
    label: "status",
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));
export default function Participants() {
  const navigate = useNavigate();
  const url = window.location.pathname.split("/");
  const eventId = url[2];
  const slug = url[3];
  // console.log("ul", url);
  // const eventId = localStorage.getItem("evId");
  const [showMenu, SetShowMenu] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(3);
  const [participants, setParticipants] = useState([]);
  const [loader, setLoader] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleChange = (e) => {
    SetShowMenu(e);
  };
  const getEventAttendeesApi = async () => {
    const response = await getEventAttendees(eventId, offset, limit);
    if (response === undefined) {
      RefreshToken();
      getEventAttendeesApi();
    } else setParticipants(response.data.items);
    setLoader(false);
  };
  useEffect(() => {
    getEventAttendeesApi();
  }, [limit]);
  const handleScroll = (e) => {
    const height = e.target.scrollHeight;
    const top = e.target.scrollTop;
    const offset_height = e.target.offsetHeight;
    const scroll_bar_height = height - (height - offset_height);
    const scroll_bottom = Math.floor(height - (scroll_bar_height + top));
    if (scroll_bottom <= 2) {
      limit <= 17 && setLimit(limit + 3);
    }
  };

  // const uniqueArray = (array, key) => {
  //   if (typeof key !== "function") {
  //     const property = key;
  //     key = function (item) {
  //       return item[property];
  //     };
  //   }
  //   return Array.from(
  //     array
  //       .reduce(function (map, item) {
  //         const k = key(item);
  //         if (!map.has(k)) map.set(k, item);
  //         return map;
  //       }, new Map())
  //       .values()
  //   );
  // };
  const getSortedAttendeesAPI = async (sortBy) => {
    const response = await getSortedAttendees(eventId, sortBy);
    if (response === undefined) {
      await RefreshToken();
      getSortedAttendeesAPI(sortBy);
    } else setParticipants(response.data.items);
  };
  const handleFilterMenu = (e) => {
    getSortedAttendeesAPI(e.label);
    // setTags(uniqueArray([{ id: e.id, name: e.label }, ...tags], "id"));
  };
  const handleSearch = async (e) => {
    var filterChar = e.target.value;
    const response = await getFilterAttendees(eventId, filterChar);
    setParticipants(response.data.items);
  };
  return (
    <>
      <div className="participants-main">
        {showMenu && (
          <div className="participants-inside">
            <div className="title-main">
              <div className="title">
                <p>Participants</p>
                {/* <CancelOutlinedIcon onClick={() => SetShowMenu(false)} /> */}
              </div>
            </div>

            <div className="search">
              <TextField
                size="small"
                placeholder="Search Participant"
                onChange={(e) => handleSearch(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  // endAdornment: (
                  //   <InputAdornment position="end">
                  //     <Popover
                  //       id={Boolean(anchorEl) ? "simple-popover" : undefined}
                  //       open={Boolean(anchorEl)}
                  //       anchorEl={anchorEl}
                  //       onClose={() => setAnchorEl(null)}
                  //       anchorOrigin={{
                  //         vertical: "bottom",
                  //         horizontal: "left",
                  //       }}
                  //     >
                  //       {filteMenu.map((menu) => (
                  //         <p
                  //           className="filter-menu"
                  //           onClick={() => {
                  //             handleFilterMenu(menu);
                  //             setAnchorEl(null);
                  //           }}
                  //         >
                  //           {menu.label}
                  //         </p>
                  //       ))}

                  //       {/* <p className="logout" onClick={handleChangePassword}>Change Password</p> */}
                  //     </Popover>
                  //   </InputAdornment>
                  // ),
                }}
                variant="outlined"
              />
              {/* <div className="filter-icon">
                  <FilterAltOutlinedIcon
                    fontSize="medium"
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  />
                </div> */}
              <Popover
                id={Boolean(anchorEl) ? "simple-popover" : undefined}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <p className="filter-menu-head">Sort By</p>
                {filteMenu.map((menu) => (
                  <p
                    className="filter-menu"
                    onClick={() => {
                      handleFilterMenu(menu);
                      setAnchorEl(null);
                    }}
                  >
                    {menu.label}
                  </p>
                ))}
              </Popover>
              <div className="participants-filter">
                <FilterListIcon
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  fontSize="medium"
                />
              </div>
            </div>

            <div
              className="participants-cards-main"
              onScroll={(e) => handleScroll(e)}
            >
              {/* <Paper elevation={0}>
                <div className="participant-profile-tag">
                  {tags &&
                    tags.map((tag) => (
                      <div className="tag" key={tag.id}>
                        <span>{tag.name}</span>
                        <CloseOutlinedIcon
                          fontSize="small"
                          onClick={() =>
                            setTags(tags.filter((item) => item.id !== tag.id))
                          }
                        />
                      </div>
                    ))}
                </div>
              </Paper> */}
              {loader && <CircularProgress />}
              {!loader &&
                participants !== undefined &&
                participants.length !== 0 &&
                participants.map((participant) => (
                  <Paper elevation={0}>
                    <div className="participants-card">
                      <div
                        onClick={() =>
                          navigate(
                            `/events/${eventId}/${slug}/participants/profile/`,
                            {
                              state: participant.people.id,
                            }
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <div className="participants-dp">
                          <StyledBadge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            <Avatar
                              alt="dp"
                              src={
                                participant.people.avatar !== null
                                  ? participant.people.avatar.download_url
                                  : ""
                              }
                            />
                          </StyledBadge>
                        </div>
                        <div className="participants-detail">
                          <p className="user-name">
                            {participant.people.full_name ?? ""}
                          </p>
                          <p className="user-email">
                            {participant?.people?.email}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/events/${eventId}/participants/chat/`)
                        }
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0 12.018C0 5.69654 5.052 0 12.024 0C18.84 0 24 5.58839 24 11.982C24 19.397 17.952 24 12 24C10.032 24 7.848 23.4712 6.096 22.4376C5.484 22.0651 4.968 21.7886 4.308 22.005L1.884 22.7261C1.272 22.9183 0.72 22.4376 0.9 21.7886L1.704 19.0967C1.836 18.7241 1.812 18.3275 1.62 18.015C0.588 16.1161 0 14.037 0 12.018ZM10.44 12.018C10.44 12.8713 11.124 13.5563 11.976 13.5684C12.828 13.5684 13.512 12.8713 13.512 12.03C13.512 11.1768 12.828 10.4917 11.976 10.4917C11.136 10.4797 10.44 11.1768 10.44 12.018ZM15.972 12.03C15.972 12.8713 16.656 13.5684 17.508 13.5684C18.36 13.5684 19.044 12.8713 19.044 12.03C19.044 11.1768 18.36 10.4917 17.508 10.4917C16.656 10.4917 15.972 11.1768 15.972 12.03ZM6.444 13.5684C5.604 13.5684 4.908 12.8713 4.908 12.03C4.908 11.1768 5.592 10.4917 6.444 10.4917C7.296 10.4917 7.98 11.1768 7.98 12.03C7.98 12.8713 7.296 13.5563 6.444 13.5684Z"
                            fill="#A1A9BF"
                          />
                        </svg>
                      </div>
                    </div>
                  </Paper>
                ))}
            </div>
          </div>
        )}
        {/* <SideBar onChange={handleChange} selectedprop={"participants"} /> */}
      </div>
    </>
  );
}
