import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//src1
import "./SideBar.scss";

const SideBar = (props) => {
  const navigate = useNavigate();
  const showMenu = props.showMenu;
  const url = window.location.pathname.split("/");
  const eventId = url[2];
  const slug = url[3];
  const action = url[4];
  const [selected, setSelected] = useState(props.selectedprop);
  const handleChange = (to) => {
    props.onChange(true);
    navigate(to);
  };
  useEffect(() => {
    if (selected !== action) setSelected(action);
  }, [selected, action]);
  return (
    <div
      style={{ width: showMenu ? "15%" : "100%" }}
      className="sidebar-container"
    >
      <div
        className="sidebar-icon"
        onClick={() => {
          handleChange(`/events/${eventId}/${slug}/inbox/`);
          localStorage.setItem("menu", "inbox");
          setSelected("inbox");
        }}
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
            fill={
              selected === "inbox" && action === "inbox" && showMenu
                ? "#4C6FFF"
                : "#A1A9BF"
            }
          />
        </svg>
        {selected === "inbox" && <p className="sidebar-icon-text">Chat</p>}
      </div>
      <div
        className="sidebar-icon"
        onClick={() => {
          handleChange(`/events/${eventId}/${slug}/polls/`);
          localStorage.setItem("menu", "polls");
          setSelected("polls");
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.863 0H16.1359C19.877 0 21.989 2.1219 22 5.86301V16.137C22 19.877 19.877 22 16.1359 22H5.863C2.1219 22 0 19.877 0 16.137V5.86301C0 2.1219 2.1219 0 5.863 0ZM11.0539 17.446C11.528 17.446 11.9229 17.094 11.9669 16.621V5.41201C12.0109 5.07101 11.847 4.72891 11.55 4.54301C11.2409 4.35601 10.8669 4.35601 10.571 4.54301C10.2729 4.72891 10.109 5.07101 10.1409 5.41201V16.621C10.197 17.094 10.5919 17.446 11.0539 17.446ZM16.115 17.446C16.577 17.446 16.9719 17.094 17.028 16.621V13.013C17.0599 12.6599 16.896 12.331 16.5979 12.144C16.302 11.957 15.928 11.957 15.62 12.144C15.3219 12.331 15.158 12.6599 15.202 13.013V16.621C15.246 17.094 15.6409 17.446 16.115 17.446ZM6.8409 16.621C6.7969 17.094 6.402 17.446 5.9279 17.446C5.4549 17.446 5.0589 17.094 5.016 16.621V9.01998C4.983 8.67791 5.1469 8.33801 5.445 8.15101C5.7409 7.96401 6.116 7.96401 6.413 8.15101C6.7089 8.33801 6.875 8.67791 6.8409 9.01998V16.621Z"
            fill={
              selected === "polls" && action === "polls" && showMenu
                ? "#4C6FFF"
                : "#A1A9BF"
            }
          />
        </svg>
        {selected === "polls" && <p className="sidebar-icon-text">Polls</p>}
      </div>
      <div
        className="sidebar-icon"
        onClick={() => {
          handleChange(`/events/${eventId}/${slug}/agenda/`);
          localStorage.setItem("menu", "agenda");
          setSelected("agenda");
        }}
      >
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.3911 0.922346L16.3923 1.82189C19.759 2.08096 21.9831 4.33343 21.9867 7.7877L22 17.8986C22.0048 21.6648 19.5949 23.982 15.7322 23.988L6.29674 24C2.45812 24.0048 0.0181092 21.6324 0.0132814 17.8554L8.1303e-06 7.86326C-0.00481965 4.38621 2.14075 2.13973 5.50754 1.83629L5.50633 0.936734C5.50513 0.408999 5.90334 0.0120027 6.43431 0.0120027C6.96527 0.0108027 7.36349 0.406599 7.3647 0.934334L7.36591 1.77391L14.5339 1.76433L14.5327 0.924747C14.5315 0.397011 14.9297 0.00120272 15.4607 2.72126e-06C15.9796 -0.00119728 16.3899 0.394611 16.3911 0.922346ZM1.85958 8.23388L20.1295 8.2099V7.7901C20.0777 5.2114 18.7599 3.85847 16.3946 3.65698L16.3959 4.58051C16.3959 5.09626 15.9868 5.50524 15.4679 5.50524C14.937 5.50644 14.5375 5.09864 14.5375 4.58291L14.5364 3.6114L7.36832 3.62099L7.36953 4.59131C7.36953 5.10824 6.97252 5.51604 6.44155 5.51604C5.91059 5.51724 5.51115 5.11065 5.51115 4.59371L5.50996 3.67017C3.15682 3.90165 1.85475 5.25937 1.85837 7.86086L1.85958 8.23388ZM14.9599 13.6852V13.6984C14.972 14.2501 15.4305 14.6687 15.9868 14.6567C16.5298 14.6435 16.9631 14.1865 16.951 13.6348C16.9257 13.107 16.49 12.6764 15.9482 12.6776C15.3931 12.6896 14.9586 13.1334 14.9599 13.6852ZM15.9566 19.0704C15.4016 19.0584 14.9539 18.6038 14.9527 18.0522C14.9406 17.5004 15.3858 17.0435 15.941 17.0303H15.953C16.5202 17.0303 16.98 17.4848 16.98 18.0486C16.9812 18.6122 16.5226 19.0692 15.9566 19.0704ZM9.98812 13.7044C10.0123 14.2561 10.472 14.6867 11.0271 14.6627C11.5702 14.6375 12.0034 14.1817 11.9792 13.63C11.9659 13.0902 11.5194 12.6704 10.9764 12.6716C10.4214 12.6956 9.98689 13.1526 9.98812 13.7044ZM11.032 19.0165C10.4769 19.0405 10.0183 18.6098 9.993 18.0582C9.993 17.5064 10.4262 17.0507 10.9813 17.0255C11.5243 17.0243 11.972 17.444 11.9841 17.9826C12.0094 18.5356 11.5751 18.9913 11.032 19.0165ZM5.0164 13.7464C5.04054 14.298 5.5003 14.7299 6.0554 14.7047C6.59843 14.6807 7.03165 14.2237 7.0063 13.672C6.99424 13.1322 6.54775 12.7124 6.0035 12.7136C5.44841 12.7376 5.01519 13.1946 5.0164 13.7464ZM6.06023 19.0225C5.50513 19.0477 5.04656 18.6158 5.02123 18.0642C5.02002 17.5124 5.45444 17.0555 6.00954 17.0315C6.55257 17.0303 7.00027 17.45 7.01234 17.9898C7.03767 18.5416 6.60446 18.9985 6.06023 19.0225Z"
            fill={
              selected === "agenda" && action === "agenda" && showMenu
                ? "#4C6FFF"
                : "#A1A9BF"
            }
          />
        </svg>
        {selected === "agenda" && <p className="sidebar-icon-text">Agenda</p>}
      </div>
      <div
        className="sidebar-icon"
        onClick={() => {
          handleChange(`/events/${eventId}/${slug}/questions/`);
          localStorage.setItem("menu", "questions");
          setSelected("questions");
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.6 0 12 0ZM13.35 19.5H10.35V16.5H13.35V19.5ZM16.5 12.15C15.9 12.75 15.3 13.05 14.7 13.2C13.8 13.8 13.5 13.5 13.5 15H10.5C10.5 12 12.3 11.1 13.5 10.5C13.95 10.35 14.25 10.2 14.55 9.9C14.7 9.75 15 9.45 14.7 8.85C14.4 8.1 13.5 7.35 12.15 7.35C10.05 7.35 9.75 9.15 9.6 9.6L6.6 9.15C6.75 7.5 8.1 4.35 12 4.35C14.4 4.35 16.5 5.7 17.4 7.65C18 9.3 17.7 10.95 16.5 12.15Z"
            fill={
              selected === "questions" && action === "questions" && showMenu
                ? "#4C6FFF"
                : "#A1A9BF"
            }
          />
        </svg>
        {selected === "questions" && (
          <p className="sidebar-icon-text">Questions</p>
        )}
      </div>
      <div
        className="sidebar-icon"
        onClick={() => {
          handleChange(`events/${eventId}/${slug}/participants/`);
          localStorage.setItem("menu", "participants");
          setSelected("participants");
        }}
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
            d="M14.6549 6.34988C14.6549 9.87493 12.0587 12.6997 8.81921 12.6997C5.58085 12.6997 2.98358 9.87493 2.98358 6.34988C2.98358 2.82487 5.58085 0 8.81921 0C12.0587 0 14.6549 2.82487 14.6549 6.34988ZM0 19.8899C0 16.6267 4.06264 15.8103 8.81921 15.8103C13.6017 15.8103 17.6385 16.6548 17.6385 19.9205C17.6385 23.1836 13.5757 24 8.81921 24C4.0368 24 0 23.1555 0 19.8899ZM17.0081 6.465C17.0081 8.26008 16.5126 9.93507 15.6437 11.3264C15.5533 11.4695 15.6331 11.6624 15.7905 11.6931C16.0089 11.7327 16.2331 11.7569 16.4621 11.7621C18.7401 11.8272 20.7843 10.2315 21.349 7.82824C22.1862 4.26235 19.7298 1.06057 16.6007 1.06057C16.2613 1.06057 15.9361 1.09891 15.6191 1.16917C15.5757 1.17939 15.5286 1.20239 15.5052 1.24328C15.4746 1.29565 15.4969 1.36337 15.5275 1.40809C16.468 2.84288 17.0081 4.58941 17.0081 6.465ZM20.7808 14.2697C22.3119 14.5955 23.3181 15.2587 23.7349 16.2259C24.0884 17.018 24.0884 17.9379 23.7349 18.73C23.0974 20.2273 21.0402 20.7091 20.2407 20.8329C20.0751 20.8585 19.9423 20.7052 19.96 20.5237C20.3686 16.374 17.1197 14.4064 16.279 13.9541C16.2437 13.9324 16.2355 13.9017 16.239 13.8813C16.2414 13.8685 16.2567 13.8481 16.2837 13.8443C18.1025 13.806 20.0586 14.0781 20.7808 14.2697Z"
            fill={
              selected === "participants" &&
              action === "participants" &&
              showMenu
                ? "#4C6FFF"
                : "#A1A9BF"
            }
          />
        </svg>
        {selected === "participants" && (
          <p className="sidebar-icon-text">Participants</p>
        )}
      </div>
    </div>
  );
};

export default SideBar;