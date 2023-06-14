import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Button, CircularProgress } from "@mui/material";
import parse from "html-react-parser";

//src
import "./EventAgendaDetail.scss";
import { GetAgendaDetail } from "../action";
import { RefreshToken } from "../../auth/RefreshToken";
import { getWeekLong, To12Hours } from "../../parser";

export default function EventAgendaDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = window.location.pathname.split("/");
  console.log("ur", url);
  const evendId = url[2];
  const slug = url[3];
  const agendaId = location.state.id;
  const [agendaDetail, setAgendaDetail] = useState();
  const [loader, setLoader] = useState(true);
  const [viewallCount, setViewallCount] = useState(5);
  const GetAgendaDetailAPI = async () => {
    setLoader(true);
    const response = await GetAgendaDetail(evendId, agendaId);
    if (response === undefined) {
      RefreshToken();
      GetAgendaDetailAPI();
    } else setAgendaDetail(response.data);
    setLoader(false);
  };
  const GetAgendaDetailViewAllAPI = async () => {
    // setLoader(true);
    const response = await GetAgendaDetail(evendId, agendaId);
    if (response === undefined) {
      RefreshToken();
      GetAgendaDetailAPI();
    } else setAgendaDetail(response.data);
    // setLoader(false);
  };
  useEffect(() => {
    GetAgendaDetailAPI();
  }, []);

  const toDateString = (date) => {
    var newDate = new Date(date).toDateString();
    var finalDate =
      getWeekLong(newDate.split(" ")[0]) +
      ", " +
      newDate.split(" ")[1] +
      " " +
      newDate.split(" ")[2];
    return finalDate;
  };

  return (
    <div className="event-detail-main">
      <div className="event-detail-head">
        <ArrowBackOutlinedIcon onClick={() => navigate(-1)} />
        <p>Agenda Detail</p>
      </div>
      {loader && <CircularProgress />}
      {!loader && (
        <div className="event-detail-inside">
          <p className="event-detail-title">{agendaDetail?.title}</p>
          <p className="event-detail-topic">
            <span>Topic: </span>{" "}
            {agendaDetail?.slot_topic ? agendaDetail?.slot_topic : "slot topic"}
          </p>

          <div className="agenda-detail-time-container">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="56"
                height="56"
                rx="8"
                fill="#235EE7"
                fill-opacity="0.08"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M35.8416 11.3835L35.8434 12.7328C40.7404 13.1214 43.9755 16.5001 43.9806 21.6816L44 36.8479C44.0069 42.4972 40.5017 45.973 34.8832 45.982L21.1589 46C15.5754 46.0072 12.0263 42.4486 12.0193 36.7831L12 21.7949C11.993 16.5793 15.1138 13.2096 20.011 12.7544L20.0092 11.4051C20.0075 10.6135 20.5867 10.018 21.359 10.018C22.1313 10.0162 22.7105 10.6099 22.7123 11.4015L22.7141 12.6609L33.1403 12.6465L33.1385 11.3871C33.1367 10.5955 33.7159 10.0018 34.4883 10C35.243 9.9982 35.8398 10.5919 35.8416 11.3835ZM14.7048 22.3508L41.2793 22.3148V21.6852C41.2039 17.8171 39.2871 15.7877 35.8467 15.4855L35.8485 16.8708C35.8485 17.6444 35.2535 18.2579 34.4988 18.2579C33.7266 18.2597 33.1454 17.648 33.1454 16.8744L33.1438 15.4171L22.7176 15.4315L22.7193 16.887C22.7193 17.6624 22.1418 18.2741 21.3695 18.2741C20.5972 18.2759 20.0162 17.666 20.0162 16.8906L20.0145 15.5052C16.5917 15.8525 14.6978 17.8891 14.7031 21.7913L14.7048 22.3508ZM33.7598 30.5277V30.5475C33.7774 31.3752 34.4444 32.003 35.2535 31.985C36.0434 31.9652 36.6736 31.2798 36.656 30.4521C36.6192 29.6605 35.9854 29.0147 35.1973 29.0165C34.39 29.0345 33.758 29.7001 33.7598 30.5277ZM35.2096 38.6056C34.4023 38.5876 33.7511 37.9058 33.7493 37.0783C33.7317 36.2507 34.3794 35.5652 35.1868 35.5454H35.2044C36.0293 35.5454 36.6981 36.2273 36.6981 37.0729C36.6999 37.9184 36.0329 38.6038 35.2096 38.6056ZM26.5282 30.5565C26.5634 31.3842 27.232 32.03 28.0395 31.994C28.8293 31.9562 29.4595 31.2726 29.4243 30.4449C29.405 29.6353 28.7555 29.0057 27.9657 29.0075C27.1584 29.0435 26.5264 29.7289 26.5282 30.5565ZM28.0466 38.5248C27.2391 38.5608 26.5721 37.9148 26.5353 37.0873C26.5353 36.2597 27.1653 35.576 27.9728 35.5382C28.7627 35.5364 29.4139 36.1661 29.4315 36.9739C29.4683 37.8033 28.8364 38.487 28.0466 38.5248ZM19.2966 30.6195C19.3317 31.447 20.0004 32.0948 20.8079 32.057C21.5977 32.021 22.2279 31.3356 22.191 30.5079C22.1734 29.6983 21.524 29.0687 20.7324 29.0705C19.925 29.1065 19.2948 29.7919 19.2966 30.6195ZM20.8149 38.5338C20.0075 38.5716 19.3405 37.9238 19.3036 37.0963C19.3018 36.2687 19.9337 35.5832 20.7411 35.5472C21.531 35.5454 22.1822 36.1751 22.1998 36.9847C22.2366 37.8123 21.6065 38.4978 20.8149 38.5338Z"
                fill="#4C6FFF"
              />
            </svg>
            <div className="agenda-detail-time">
              <p className="agenda-detail-date">
                {toDateString(agendaDetail?.day)}
              </p>
              <p className="agenda-detail-date-time">
                {To12Hours(agendaDetail?.start).split(" ")[0]} -{" "}
                {To12Hours(agendaDetail?.end)}
              </p>
            </div>
          </div>

          <Button
            variant="outlined"
            onClick={() =>
              navigate(`/events/${evendId}/${slug}/questions/`, {
                state: { id: agendaId },
              })
            }
          >
            Ask a Question
          </Button>

          <div className="agenda-detail-speakers">
            <p className="agenda-detail-speaker-head">Speakers</p>
            {agendaDetail.speakers.map(
              (sp, index) =>
                index < viewallCount && (
                  <div className="speaker-card">
                    <img
                      src={sp?.avatar?.download_url}
                      alt="speaker"
                      title="Ruby Rhod"
                      width="44px"
                      height="44px"
                    />
                    <div>
                      <p>{sp.full_name}</p>
                      <p>speaker</p>
                    </div>
                  </div>
                )
            )}
            {agendaDetail.speakers.length > viewallCount && (
              <p
                className="agenda-detai-viewall"
                onClick={() => {
                  setViewallCount(agendaDetail.speakers.length);
                  GetAgendaDetailViewAllAPI();
                }}
              >
                view all
              </p>
            )}
          </div>
          <div className="agenda-detail-desc">
            <p className="agenda-detail-desc-head">Description</p>
            {parse(`${agendaDetail.body}`)}
          </div>
        </div>
      )}
    </div>
  );
}
