import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import FilterListIcon from "@mui/icons-material/FilterList";
import Popover from "@mui/material/Popover";

//src
import "./LivePollPage.scss";
import {
  AddPollAnswer,
  GetFilterPollsList,
  GetPollsBySearch,
  GetPollsList,
  GetPollsListAnswers,
  UpdatePollAnswer,
} from "./action";
import { RefreshToken } from "../auth/RefreshToken";
import SearchIcon from "../SVG/SearchIcon";

const filteMenu = [
  {
    id: 1,
    label: "active",
  },
  {
    id: 2,
    label: "closed",
  },
];
const LivePollPage = () => {
  const eventId = window.location.pathname.split("/")[2];
  const [expanded, SetExpanded] = useState(true);
  const [pollsList, setPollsList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [load, setLoad] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchData = async () => {
    setLoader(true);
    try {
      let values = await GetPollsList(eventId);
      if (values !== undefined) {
        let newArr = [];
        let length = values.data?.items?.length;
        for (let i = 0; i < length; i++) {
          let pollId = values.data?.items[i]?.id;
          let ans = await GetPollsListAnswers(eventId, pollId);
          newArr.push(ans.data);
          // newArr.push({
          //   questions: values.data.items[i],
          //   answers: ans.data.items,
          // });
        }
        setPollsList(newArr);
        setLoader(false);
      } else {
        RefreshToken();
        fetchData();
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  // const GetPollsListAPI = async() => {
  //   setLoader(true)
  //   var response = await GetPollsList(eventId)
  //   if(response === undefined){
  //     await RefreshToken()
  //     GetPollsListAPI()
  //   }
  //   else setPollsList(response.data.items)
  //   setLoader(false)
  // }
  useEffect(() => {
    fetchData();
  }, []);

  const uniqueArray = (array, key) => {
    if (typeof key !== "function") {
      const property = key;
      key = function (item) {
        return item[property];
      };
    }
    return Array.from(
      array
        .reduce(function (map, item) {
          const k = key(item);
          if (!map.has(k)) map.set(k, item);
          return map;
        }, new Map())
        .values()
    );
  };
  const pollsPercentage = (vote_count, total) => {
    if (total !== 0) return Math.floor((vote_count / total) * 100);
    else return 0;
  };
  const handleRadio = async (pollId, voteId, item_id, user_voted, mutable) => {
    setLoad(true);
    if (user_voted) {
      if (mutable) {
        const response = await UpdatePollAnswer(
          eventId,
          pollId,
          voteId,
          item_id
        );
        if (response === undefined) {
          await RefreshToken();
          handleRadio(pollId, voteId, item_id, user_voted);
        } else {
          const response = await GetPollsListAnswers(eventId, pollId);
          var index = pollsList.findIndex((val) => val.id === pollId);
          pollsList[index] = response.data;
          toast(
            <div style={{ display: "flex", gap: "10px" }}>
              <CheckCircleIcon color="primary" />
              <p>Poll answer updated successfully</p>
            </div>,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      }
    } else {
      const response = await AddPollAnswer(eventId, pollId, item_id);
      if (response === undefined) {
        await RefreshToken();
        handleRadio(pollId, voteId, item_id, user_voted);
      } else {
        const response = await GetPollsListAnswers(eventId, pollId);
        var index = pollsList.findIndex((val) => val.id === pollId);
        pollsList[index] = response.data;
        toast(
          <div style={{ display: "flex", gap: "10px" }}>
            <CheckCircleIcon color="primary" />
            <p>Poll submitted successfully</p>
          </div>,
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        // response !== undefined &&
        // setPollsList(
        //   uniqueArray([response.data,...pollsList],'id')
        // )
        // console.log(pollsList)
      }
    }
    setLoad(false);
    // const response = await
  };

  const GetFilterPollsListAPI = async (filterBy) => {
    setLoader(true);
    try {
      let values = await GetFilterPollsList(eventId, filterBy);
      if (values !== undefined) {
        let newArr = [];
        let length = values.data?.items?.length;
        for (let i = 0; i < length; i++) {
          let pollId = values.data?.items[i]?.id;
          let ans = await GetPollsListAnswers(eventId, pollId);
          newArr.push(ans.data);
        }
        setPollsList(newArr);
        setLoader(false);
      } else {
        RefreshToken();
        GetFilterPollsList(filterBy);
      }
    } catch (e) {
      console.log("error", e);
    }
    setLoader(false);
  };
  const handleFilterMenu = (e) => {
    let filterBy = e.id === 1 ? "open" : "closed";
    GetFilterPollsListAPI(filterBy);
  };
    const handleSearch = async (e) => {
      var searchChar = e.target.value;
      const response = await GetPollsBySearch(eventId, searchChar);
      if (response !== undefined) {
        let newArr = [];
        let length = response.data?.items?.length;
        for (let i = 0; i < length; i++) {
          let pollId = response.data?.items[i]?.id;
          let ans = await GetPollsListAnswers(eventId, pollId);
          newArr.push(ans.data);
        }
        setPollsList(newArr);
        setLoader(false);
      }
    };
  return (
    <>
      <div className="livepoll-main">
        <div className="livepoll-inside">
          <div className="title-main">
            <div className="title">
              <p>Live Poll</p>
              {/* <CancelOutlinedIcon onClick={() => SetShowMenu(false)} /> */}
            </div>
          </div>
          <div className="search">
            <TextField
              size="small"
              placeholder="Search poll"
              onChange={(e) => handleSearch(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
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
            <div className="live-poll-filter">
              <FilterListIcon
                fontSize="medium"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              />
            </div>
          </div>
          <div className="livepoll-cards-main">
            {loader && <CircularProgress />}
            <div className="live-polls-container">
              {!loader &&
                pollsList.map((polls) => (
                  <Paper elevation={0} style={{ backgroundColor: "#F3F4F8" }}>
                    <Accordion defaultExpanded={!polls.poll_closed}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="polls-question-container-head">
                          Live Poll
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="polls-question">{polls.question}</p>
                        <div className="polls-radio-group">
                          <RadioGroup value={polls.user_voted_item}>
                            {/* {load && <CircularProgress/>} */}
                            {polls.items.map((ans) => (
                              <div
                                className={`polls-answers-radio ${
                                  polls.user_voted_item === ans.id
                                    ? "gradient"
                                    : ""
                                }`}
                              >
                                <FormControlLabel
                                  disabled={polls.poll_closed}
                                  value={ans.id}
                                  style={{
                                    color:
                                      polls.user_voted_item === ans.id
                                        ? "black"
                                        : "#6B6F7A",
                                  }}
                                  control={
                                    <Radio
                                      onChange={(e) =>
                                        handleRadio(
                                          polls.id,
                                          polls.user_voted_id,
                                          e.target.value,
                                          polls.user_voted,
                                          polls.mutable
                                        )
                                      }
                                      checkedIcon={
                                        <CheckCircleIcon color="primary" />
                                      }
                                      // size="small"
                                    />
                                  }
                                  label={ans.value}
                                />
                                {polls.live_updates && (
                                  <p
                                    style={{
                                      color:
                                        polls.user_voted_item === ans.id
                                          ? "#1976D2"
                                          : "#6B6F7A",
                                    }}
                                  >
                                    {pollsPercentage(
                                      ans.vote_count,
                                      polls.vote_count
                                    )}
                                    %
                                  </p>
                                )}
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                ))}
            </div>
          </div>
        </div>
        {/* <SideBar onChange={handleChange} selectedprop={"polls"} /> */}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="colored"
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default LivePollPage;
