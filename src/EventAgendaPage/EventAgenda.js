import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
// import { SocialShimmer } from 'react-content-shimmer'
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

//src
import "./EventAgenda.scss";
import { GetAgendaFilter, GetAgendDays, GetEventAgenda } from "./action";
import { RefreshToken } from "../auth/RefreshToken";
import { To12Hours } from "../parser";

export default function EventAgenda() {
  const navigate = useNavigate();
  const eventId = window.location.pathname.split("/")[2];
  const [showMenu, SetShowMenu] = useState(true);
  const [agendaEvents, setAgendaEvents] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(true);
  const [agendaDays, setAgendaDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const GetEventAgendaAPI = async () => {
    const response = await GetEventAgenda(eventId);
    const response1 = await GetAgendDays(eventId);
    if (response === undefined || response1 === undefined) {
      RefreshToken();
      GetEventAgendaAPI();
    } else {
      setAgendaEvents(response.data.items);
      setAgendaDays(response1.data.items);
    }
    setLoader(false);
    setLoading(false);
    // const response = GetEventAgenda()
  };
  useEffect(() => {
    GetEventAgendaAPI();
  }, []);

  const GetAgendaFilterAPI = async (day_id) => {
    setLoading(true);
    const response = await GetAgendaFilter(eventId, day_id);
    if (response === undefined) {
      await RefreshToken();
      GetAgendaFilterAPI();
    } else setAgendaEvents(response.data.items);
    setLoading(false);
  };
  const handleFilterDay = (day_id) => {
    var selected = document.getElementsByClassName("agenda-date");
    for (var i = 0; i < selected.length; i++) {
      if (selected[i].attributes.dayId.nodeValue == day_id) {
        setSelectedDate(day_id);
        selected[i].style.backgroundColor = "#4C6FFF";
        selected[i].style.color = "#FFF";
      } else {
        selected[i].style.color = "#4C2C22";
        selected[i].style.backgroundColor = "transparent";
      }
    }
    GetAgendaFilterAPI(day_id);
  };

  const getTodayEvent = (date) => {
    var currentDate = new Date();
    currentDate =
      currentDate.getFullYear() +
      "-" +
      month[currentDate.getMonth()] +
      "-" +
      (currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate());
    return date === currentDate ? true : false;
  };

  return (
    <>
      <>
        <div className="event-agenda-main">
          <div className="event-agenda-inside">
            <div className="title-main">
              <div className="title">
                <p>Event Agenda</p>
                {/* <CancelOutlinedIcon onClick={()=>SetShowMenu(false)} /> */}
              </div>
            </div>
            <div className="event-agenda-calendar">
              {loader && <CircularProgress />}
              {!loader &&
                agendaDays.map((day) => (
                  <div className="agenda-calendar-inside" key={day.id}>
                    <p className="agenda-day">
                      {new Date(day.date).toDateString().split(" ")[0]}
                    </p>
                    <p
                      dayId={day.id}
                      className={`agenda-date ${
                        getTodayEvent(day.date) ? "agenda-today" : ""
                      }`}
                      onClick={() => handleFilterDay(day.id)}
                    >
                      {day.date.split("-")[2]}
                    </p>
                  </div>
                ))}
            </div>
            <div className="event-agenda-cards-main">
              {loading && <CircularProgress />}
              {!loading &&
                agendaEvents.map((event) => (
                  <Paper
                    elevation={0}
                    style={{ backgroundColor: "#F3F4F8", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`${event.title.replace(/ /g, "-")}/`, {
                        state: { id: event.id },
                      })
                    }
                  >
                    <div className="event-agenda-card">
                      <div className="agenda-time">
                        {To12Hours(event.start)}
                      </div>
                      <div className="event-agenda">
                        <p className="title">{event.title}</p>
                        {event?.slot_topic && (
                          <p className="sub-title">
                            <span>Topic: </span> {event?.slot_topic}
                          </p>
                        )}
                        <p className="para-text">
                          Class aptent taciti sociosqu ad litora torquent per
                          conubia nostra, per ...
                        </p>
                        <div className="event-agenda-speakers">
                          {event.speakers.map((sp) => (
                            <img
                              src={sp?.avatar?.download_url}
                              alt="speaker"
                              title="Ruby Rhod"
                              width="36px"
                              height="36px"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Paper>
                ))}
            </div>
          </div>
          {/* <SideBar onChange={handleChange} selectedprop={"agenda"} /> */}
        </div>
      </>
    </>
  );
}
