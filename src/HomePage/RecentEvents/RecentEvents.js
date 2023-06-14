import React, { useState, useEffect, useContext } from "react";
// import Select from "react-select";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { EventIdContext } from "../../ContextAPI/EventId";
import Popover from "@mui/material/Popover";

//src
import "./RecentEvents.scss";
import { getMonth } from "../../parser";
import {
  getRecentEvents,
  getEventTypes,
  getPeopleSpeakers,
  getFilterRecent,
  getSpeakerProfile,
} from "../action";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";

const RecentEvents = () => {
  // const [eventId,setEventId] = useContext(EventIdContext)
  const [eventTypes, setEventTypes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  // const [eventTypesDefault, setEventTypesDefault] = useState("none");
  const [offset, setOffset] = useState(0);
  const [TotalEvent, setTotalEvent] = useState();
  const [limit, setLimit] = useState(3);
  const [allEvent, setAllEvent] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [zero, setZero] = useState(true);

  const fetchData = async () => {
    setLoader(true);
    try {
      let values = await getRecentEvents({
        offset,
        limit,
        callback: (res) => res,
      });
      setTotalEvent(values.meta.total_count);
      let newArr = [];
      let length = values?.items?.length;
      for (let i = 0; i < length; i++) {
        let id = values?.items[i]?.id;
        let spData = await getPeopleSpeakers({ id, callback: (res) => res });
        newArr.push({ event: values.items[i], speakers: spData });
      }
      setRecentEvents(recentEvents.concat(newArr));
      setAllEvent(newArr);
    } catch (e) {
      console.log("error", e);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchData();
  }, [offset, zero]);
  // useEffect(() => {
  //   getRecentEvents({ offset, limit, callback: (res) => {
  //     setTotalEvent(res.meta.total_count)
  //     setRecentEvents(res)
  //   } });
  // }, [limit]);

  useEffect(() => {
    getEventTypes({
      callback: (res) =>
        setEventTypes(
          res.items.map((type) => ({ value: type.value, label: type.label }))
        ),
    });
    //getPeopleSpeakers({ callback: (res) => setSpeakers(res.items) });
  }, []);

  useEffect(() => {
    if (tags.length === 0) {
      setRecentEvents([]);
      setOffset(0);
      setZero(!zero);
    }
  }, [tags]);

  const getDate = (date) => {
    return new Date(date).getDate();
  };
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
  const handleEventFilter = async (e) => {
    setLoader(true);
    var eventId = e.target.value;
    var label = eventTypes.filter((ev) => ev.value === eventId);
    setTags(
      uniqueArray([{ id: label[0].value, name: label[0].label }, ...tags], "id")
    );
    try {
      let values = await getFilterRecent({
        eventId,
        offset: 0,
        limit: 3,
        callback: (res) => res,
      });
      setTotalEvent(values.meta.total_count);
      let newArr = [];
      let length = values?.items?.length;
      for (let i = 0; i < length; i++) {
        let id = values?.items[i]?.id;
        let spData = await getPeopleSpeakers({ id, callback: (res) => res });
        newArr.push({ event: values.items[i], speakers: spData });
      }
      setRecentEvents(newArr);
    } catch (e) {
      console.log("error", e);
    }
    setLoader(false);
  };

  const getSpeakerProfileAPI = async (id) => {
    const response = await getSpeakerProfile(id);
    console.log(response);
  };
  // getSpeakerProfile(8);
  return (
    <>
      <div className="recents-events-main">
        <div className="recents-events-head">
          <p className="title">Recent Events</p>
          <div className="recents-events-head-option">
            {/* <input
                type="date"
                className="date-pick"
                onKeyDown={(e) => e.preventDefault()}
              /> */}
            {/* <Select
                onChange={(e) => handleEventFilter(e)}
                options={eventTypes}
              /> */}
            <FormControl sx={{ m: 1, minWidth: 220 }}>
              {/* <InputLabel id="demo-simple-select-helper-label">
                Event Types
              </InputLabel> */}
              <Select
                defaultValue="none"
                labelId="demo-simple-select-helper-label"
                //  value={eventTypesDefault}
                onChange={handleEventFilter}
                // label="Event Types"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="none" disabled>
                  Event Type
                </MenuItem>
                {eventTypes.map((types) => (
                  <MenuItem value={types.value}>{types.label}</MenuItem>
                ))}
                {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="recents-events-tags">
          {tags.map((tag, index) => (
            <div className="tag" key={tag.id}>
              <span>{tag.name}</span>
              <svg
                onClick={() => {
                  setTags(tags.filter((item) => item.id !== tag.id));
                }}
                className="recents-events-tags-svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 6.415L17.585 5L12 10.585L6.415 5L5 6.415L10.585 12L5 17.585L6.415 19L12 13.415L17.585 19L19 17.585L13.415 12L19 6.415Z" />
              </svg>
            </div>
          ))}
        </div>
        <div className="recents-events-cards-main">
          {recentEvents.map((data, index) => (
            <div
              className="recents-events-card"
              key={index}
              onClick={() => {
                localStorage.setItem("evId", data.event.id);
                localStorage.setItem("slug", data.event.meta.slug);
                localStorage.setItem("menu", "participants");
                navigate(
                  "/events/" +
                    data.event.id +
                    "/" +
                    data.event.meta.slug +
                    "/participants/",
                  {
                    state: { id: data.event.id },
                  }
                );
              }}
            >
              <img
                className="recents-events-card-img"
                src={data.event.image?.meta?.download_url}
                alt="event-card"
              />
              <div className="recents-event-card-detail">
                <div>
                  <p className="month">{getMonth(data.event.schedule_begin)}</p>
                  <p className="day">{getDate(data.event.schedule_begin)}</p>
                  {data.event.schedule_begin.substring(0, 10) !==
                  data.event.schedule_end.substring(0, 10) ? (
                    <>
                      {" "}
                      <span className="day-line"></span>
                      <p className="month">
                        {getMonth(data.event.schedule_end)}
                      </p>
                      <p className="day">{getDate(data.event.schedule_end)}</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p className="event-heading">{data.event.title}</p>
                  <p className="time">
                    {data.event.schedule_begin.substring(11, 16) +
                      " - " +
                      data.event.schedule_end.substring(11, 16)}
                  </p>

                  <div className="recents-event-speakers">
                    {/* ev.speakers.items.map((sp) => <>{sp.people?.full_name}</> */}
                    {data.speakers.items.map((speaker, index) => (
                      <>
                        {index < 5 && (
                          <div className="speakers-overlay-main">
                            <img
                              src={speaker.people.avatar.download_url}
                              alt="speaker"
                              // title={speaker.people.full_name}
                              width="36px"
                              height="36px"
                              className="speaker-dp"
                              onMouseOver={(e) => setAnchorEl(e.currentTarget)}
                              onMouseLeave={(e) => setAnchorEl(null)}
                            />
                            <div className="speakers-overlay">
                              <div className="speaker-title">
                                <div className="speaker-avatar">
                                  <Avatar
                                    sx={{ width: 56, height: 56 }}
                                    src={speaker.people.avatar.download_url}
                                  />
                                </div>
                                <div className="speaker-name">
                                  <p className="name">
                                    {speaker.people.full_name}
                                  </p>
                                  <p className="type">Speaker</p>
                                </div>
                              </div>
                              <div className="speaker-bio">
                                <p>
                                  Class aptent taciti sociosqu ad litora
                                  torquent per conubia nostra, per inceptos
                                  himenaeos. Curabitur tempus urna at turpis
                                  condimentum lobortis.
                                </p>
                              </div>
                              <div className="speakers-links">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M6.28592 5.9795H8.76192V7.21283C9.11859 6.5035 10.0333 5.86616 11.4073 5.86616C14.0413 5.86616 14.6666 7.27816 14.6666 9.86883V14.6668H11.9999V10.4588C11.9999 8.9835 11.6433 8.1515 10.7353 8.1515C9.47592 8.1515 8.95259 9.04816 8.95259 10.4582V14.6668H6.28592V5.9795ZM1.71325 14.5535H4.37992V5.86616H1.71325V14.5535ZM4.76192 3.0335C4.76202 3.25701 4.71769 3.47832 4.63151 3.68455C4.54533 3.89079 4.41902 4.07784 4.25992 4.23483C3.93752 4.55525 3.50113 4.7346 3.04659 4.7335C2.59285 4.73319 2.15746 4.5543 1.83459 4.2355C1.67606 4.07797 1.55018 3.89071 1.46415 3.68445C1.37812 3.47819 1.33364 3.25698 1.33325 3.0335C1.33325 2.58216 1.51325 2.15016 1.83525 1.8315C2.15784 1.51227 2.59341 1.3333 3.04725 1.3335C3.50192 1.3335 3.93792 1.51283 4.25992 1.8315C4.58125 2.15016 4.76192 2.58216 4.76192 3.0335Z"
                                    fill="#4C6FFF"
                                  />
                                </svg>

                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.04221 16V8.49234H4V5.78922H6.04221V3.4804C6.04221 1.66611 7.24856 0 10.0282 0C11.1537 0 11.9859 0.10488 11.9859 0.10488L11.9203 2.62914C11.9203 2.62914 11.0716 2.6211 10.1454 2.6211C9.14303 2.6211 8.98244 3.07014 8.98244 3.81544V5.78922H12L11.8687 8.49234H8.98244V16H6.04221Z"
                                    fill="#4C6FFF"
                                  />
                                </svg>

                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.7621 3.29122C15.2054 3.53789 14.6074 3.70455 13.9788 3.77989C14.6274 3.39175 15.1127 2.78087 15.3441 2.06122C14.7347 2.42321 14.0677 2.67802 13.3721 2.81456C12.9043 2.31513 12.2848 1.98411 11.6096 1.87287C10.9345 1.76164 10.2415 1.87642 9.63825 2.19939C9.03501 2.52236 8.55527 3.03546 8.27353 3.65902C7.99178 4.28259 7.92378 4.98172 8.08009 5.64789C6.84521 5.58589 5.63717 5.26492 4.53437 4.70582C3.43157 4.14673 2.45865 3.362 1.67876 2.40256C1.41209 2.86256 1.25876 3.39589 1.25876 3.96389C1.25846 4.47522 1.38438 4.97872 1.62534 5.42971C1.86631 5.8807 2.21486 6.26525 2.64009 6.54922C2.14694 6.53353 1.66467 6.40028 1.23342 6.16055V6.20055C1.23337 6.91771 1.48144 7.61281 1.93554 8.16788C2.38964 8.72296 3.0218 9.10384 3.72476 9.24589C3.26728 9.3697 2.78765 9.38793 2.32209 9.29922C2.52042 9.9163 2.90675 10.4559 3.427 10.8425C3.94725 11.2291 4.57537 11.4433 5.22342 11.4552C4.12331 12.3188 2.76468 12.7873 1.36609 12.7852C1.11834 12.7853 0.870807 12.7708 0.624756 12.7419C2.04441 13.6547 3.69698 14.1391 5.38476 14.1372C11.0981 14.1372 14.2214 9.40522 14.2214 5.30122C14.2214 5.16789 14.2181 5.03322 14.2121 4.89989C14.8196 4.46054 15.344 3.91649 15.7608 3.29322L15.7621 3.29122Z"
                                    fill="#4C6FFF"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                    {data.speakers.items.length - 5 > 0 && (
                      <div className="more-rounded-btn">
                        <p>{data.speakers.items.length - 5} more</p>
                      </div>
                    )}
                  </div>
                  <p className="event-desc">{data.event.hero_text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {offset + limit >= TotalEvent ? (
          ""
        ) : (
          <div className="recent-event-load-more">
            <button
              className=""
              disabled={loader}
              onClick={() => {
                setOffset(offset + 3);
              }}
            >
              {loader ? "Loading, Please Wait..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default RecentEvents;
