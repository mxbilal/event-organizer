import React, { useState, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Backdrop from "@mui/material/Backdrop";
import CancelIcon from "@mui/icons-material/Cancel";
import { grey } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
//src
import "./Layout.scss";
import { getLivePoll, AddPollAnswer } from "./action";
import { RefreshToken } from "../auth/RefreshToken";

export default function GetLivePoll() {
  const [livePoll, setLivePoll] = useState({});
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:00");

  const getLivePollAPI = async () => {
    const eventId = window.location.pathname.split("/")[2];
    if (eventId !== null) {
      const response = await getLivePoll(eventId);
      // console.log(response);
      if (response === undefined) {
        await RefreshToken();
        getLivePollAPI();
      } else if (response?.status === 200) {
        if (response.data.user_voted) {
          setLivePoll({});
        } else {
          setLivePoll(response.data);
          clearTimer(getDeadTime(response.data.expiration));
        }
      } else {
        setLivePoll({});
      }
    }
  };
  useEffect(() => {
    // getLivePollAPI()
    setInterval(() => {
      getLivePollAPI();
    }, 20000);
  }, []);

  const livePollPercentage = (vote_count, total) => {
    if (total !== 0) return Math.floor((vote_count / total) * 100);
    else return 0;
  };
  const handleRadio = async (pollId, voteId, item_id, user_voted, mutable) => {
    const eventId = window.location.pathname.split("/")[2];
    if (user_voted) {
      // const response = await UpdatePollAnswer(eventId, pollId, voteId, item_id);
      // if (response === undefined) {
      //   await RefreshToken();
      //   handleRadio(pollId, voteId, item_id, user_voted);
      // } else {
      //   const response = await GetPollsListAnswers(eventId, pollId);
      //   var index = pollsList.findIndex((val) => val.id === pollId);
      //   pollsList[index] = response.data;
      //   toast(
      //     <div style={{ display: "flex", gap: "10px" }}>
      //       <CheckCircleIcon color="primary" />
      //       <p>Poll updated successfully</p>
      //     </div>,
      //     {
      //       position: "top-right",
      //       autoClose: 2000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       progress: undefined,
      //     }
      //   );
      // }
    } else {
      // console.log("poll",pollId,voteId," item: ",item_id,user_voted,eventId)
      const response = await AddPollAnswer(eventId, pollId, item_id);
      if (response === undefined) {
        await RefreshToken();
        handleRadio(pollId, voteId, item_id, user_voted);
      } else {
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
        setTimeout(() => {
          setLivePoll({});
        }, 2000);
      }
    }
  };

  // The state for our timer

  // console.log("sstt",timer)

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    // console.log(total,"-",hours,'-',minutes,'-',seconds)
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
      // console.log("timee",(hours > 9 ? hours : '0' + hours) + ':' +
      // (minutes > 9 ? minutes : '0' + minutes) + ':'
      // + (seconds > 9 ? seconds : '0' + seconds))
    } else {
      setLivePoll({});
    }
  };

  const clearTimer = (e) => {
    // console.log("ce",e)
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    // setTimer("00:00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (date) => {
    let deadline = new Date(date);
    return deadline;
  };

  return (
    <>
      {
        Object.keys(livePoll).length > 0 && (
          // {/* <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} */}
          // {/* open={true}> */}
          <div className="live-poll">
            <div className="live-poll-card">
              <div className="live-poll-head">
                <p className="poll-title">Live Poll</p>
                <div className="end-side">
                  <p className="poll-ends-in">
                    Ends in: <span className="ends-timer">{timer}</span>
                  </p>
                  <CancelIcon
                    fontSize="small"
                    color="primary"
                    onClick={() => (livePoll.mutable ? setLivePoll({}) : "")}
                  />
                </div>
                {/* sx={{ color: grey[500] }} */}
              </div>
              <div>
                <p className="live-poll-question">{livePoll.question}</p>
              </div>

              <div>
                <RadioGroup defaultValue="">
                  {livePoll.items.map((ans) => (
                    <div
                      className={`polls-answers-radio ${
                        livePoll.user_voted_item === ans.id ? "gradient" : ""
                      }`}
                    >
                      <FormControlLabel
                        // disabled={livePoll.poll_closed}
                        value={ans.id}
                        control={
                          <Radio
                            onChange={(e) =>
                              handleRadio(
                                livePoll.id,
                                livePoll.user_voted_id,
                                ans.id,
                                livePoll.user_voted,
                                livePoll.mutable
                              )
                            }
                            checkedIcon={<CheckCircleIcon color="primary" />}
                            // size="small"
                          />
                        }
                        label={ans.value}
                      />
                      {livePoll.live_updates && (
                        <p
                          style={{
                            color:
                              livePoll.user_voted_item === ans.id
                                ? "#1976D2"
                                : "black",
                          }}
                        >
                          {livePollPercentage(
                            ans.vote_count,
                            livePoll.vote_count
                          )}
                          %
                        </p>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        )
        // </Backdrop>
      }
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
}
