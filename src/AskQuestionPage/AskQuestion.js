import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ToastContainer, toast } from "react-toastify";
//src
import "./AskQuestion.scss";
import {
  DeleteQuestion,
  GetQuestionsList,
  POSTQuestion,
  POSTQuestionWithSlot,
} from "./action";
import { RefreshToken } from "../auth/RefreshToken";
import "react-toastify/dist/ReactToastify.css";
import DeleteSvg from "./DeleteSvg";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
// const style = {
//   position: 'absolute',
//   top: '50%',
//   // right: '-6%',
//   transform: 'translate(-50%, -50%)',
//   width: 230,
//   bgcolor: 'background.paper',
//   boxShadow: 14,
//   borderRadius:'10px',
//   p: 4,
// };

const AskQuestion = () => {
  const location = useLocation();
  const slot_id = location.state;
  const [slotId, setSlotId] = useState(slot_id !== null ? slot_id.id : 0);
  const eventId = window.location.pathname.split("/")[2];
  const [questions, setQuestions] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [loader, setLoader] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [hover, setHover] = useState(false);
  const [postQuestion, setPostQuestion] = useState("");
  const [loadbtn, setLoadBtn] = useState(true);
  const [modal, setModal] = useState(false);
  const GetQuestionsAPI = async () => {
    setLoader(true);
    if (eventId !== null) {
      const response = await GetQuestionsList(eventId);
      if (response === undefined) {
        await RefreshToken();
        GetQuestionsAPI();
      } else setQuestions(response.data.items);
    }
    setLoader(false);
  };
  useEffect(() => {
    GetQuestionsAPI();
  }, []);

  const handleDeleteQuestion = async () => {
    // setLoader(true);
    setModal(false);
    setAnchorEl(null);
    const response = await DeleteQuestion(eventId, deleteId);
    if (response === undefined) {
      await RefreshToken();
      handleDeleteQuestion();
    } else {
      GetQuestionsAPI();
      toast(
        <div style={{ display: "flex", gap: "10px" }}>
          <DeleteSvg />
          <p>Question deleted successfully</p>
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

    setLoader(false);
  };
  const PostQuestionAPI = async () => {
    // setLoader(true);
    console.log(slotId);
    if (slotId === 0) {
      const response = await POSTQuestion(eventId, postQuestion);
      if (response === undefined) {
        RefreshToken();
        PostQuestionAPI();
      } else {
        setPostQuestion("");
        GetQuestionsAPI();
      }
    } else {
      const response = await POSTQuestionWithSlot(
        eventId,
        postQuestion,
        slotId
      );
      if (response === undefined) {
        RefreshToken();
        PostQuestionAPI();
      } else {
        setPostQuestion("");
        GetQuestionsAPI();
        setSlotId(0);
      }
    }

    setLoader(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    PostQuestionAPI();
  };

  useEffect(() => {
    if (loadbtn) {
      if (postQuestion.length > 0) setLoadBtn(false);
    } else {
      if (postQuestion.length === 0) setLoadBtn(true);
    }
  }, [postQuestion]);

  const scrollToBottom = (node) => {
    console.log(node);
    console.log(node[0].scrollHeight, " ", node[0].scrollTop);
    node[0].scrollTop = node[0].scrollHeight;
  };
  useEffect(() => {
    const element = document.getElementsByClassName("question-cards-main");
    scrollToBottom(element);
  }, [questions]);
  return (
    <>
      <div className="question-main">
        <div className="question-inside">
          <div className="title-main">
            <div className="title">
              <p>Ask Questions</p>
              {/* <CancelOutlinedIcon onClick={() => SetShowMenu(false)} /> */}
            </div>
          </div>
          <div className="question-cards-main">
            {loader && <CircularProgress />}
            {!loader &&
              questions.map((question) => (
                <>
                  <div
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className="question"
                    key={question.id}
                  >
                    <Popover
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      id={Boolean(anchorEl) ? "simple-popover" : undefined}
                      className="delete-popover"
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={() => setAnchorEl(null)}
                      style={{ borderRadius: "16px" }}
                    >
                      <div
                        className="question-delete-main"
                        onClick={() => setModal(true)}
                      >
                        <p className="question-delete-text">Delete</p>
                        <DeleteSvg />
                      </div>
                    </Popover>
                    {question.writable ? (
                      <p
                        className="dot"
                        questionId={question.id}
                        onClick={(e) => {
                          setDeleteId(
                            e.currentTarget.getAttribute("questionId")
                          );
                          setAnchorEl(e.currentTarget);
                        }}
                      >
                        {hover ? (
                          <svg
                            width="15"
                            height="3"
                            viewBox="0 0 15 3"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <ellipse
                              cx="13.5"
                              cy="1.5"
                              rx="1.5"
                              ry="1.5"
                              transform="rotate(-180 13.5 1.5)"
                              fill="#6B6F7A"
                            />
                            <ellipse
                              cx="7.5"
                              cy="1.5"
                              rx="1.5"
                              ry="1.5"
                              transform="rotate(-180 7.5 1.5)"
                              fill="#6B6F7A"
                            />
                            <ellipse
                              cx="1.5"
                              cy="1.5"
                              rx="1.5"
                              ry="1.5"
                              transform="rotate(-180 1.5 1.5)"
                              fill="#6B6F7A"
                            />
                          </svg>
                        ) : (
                          <span
                            style={{
                              cursor: "none",
                              color: "#F3F4F8",
                              width: "10px",
                            }}
                          >
                            .
                          </span>
                        )}
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="question-text">{question?.question}</p>
                    <div className="answered-time">
                      {question.answered && (
                        <p className="answered">ANSWERED</p>
                      )}{" "}
                      <p>
                        sent @ {question.created_at.split(".")[0].split("T")[1]}
                      </p>
                    </div>
                  </div>
                </>
              ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="ask-question-field">
              <TextField
                multiline
                value={postQuestion}
                onChange={(e) => setPostQuestion(e.target.value)}
                variant="outlined"
                error={() => (postQuestion.length > 999 ? true : false)}
                helperText={
                  postQuestion.length > 999
                    ? "Characters Limit exceeds 1000"
                    : "                             "
                }
                placeholder="Write your question here..."
                inputProps={{ maxLength: 1000 }}
                required
              />
            </div>
            {/* <p className="words-count">{postQuestion.length}</p> */}
            <p className="guideline">
              Please make sure to follow community guidelines while posting a
              question, Thanks!
            </p>
            <LoadingButton
              type="submit"
              className={loadbtn && "disb"}
              // style={{ background: loadbtn && "#EEEEEE", color: loadbtn && "black" }}
              loading={loader}
              variant="contained"
              size="large"
              fullWidth
              disabled={loadbtn}
            >
              Send Question
            </LoadingButton>
          </form>
        </div>
      </div>
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-box">
          <DeleteSvg />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete selected question?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this question.
          </Typography>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              onClick={() => {
                setAnchorEl(null);
                setModal(false);
              }}
              color="primary"
              className="modal-cancel-btn"
            >
              {" "}
              Cancel
            </Typography>
            <Typography
              onClick={() => handleDeleteQuestion()}
              style={{ color: "red" }}
              className="modal-delete-btn"
            >
              Delete
            </Typography>
          </div>
        </Box>
      </Modal>
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
export default AskQuestion;
