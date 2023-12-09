import e1 from "../assets/e1.jpg";
import e2 from "../assets/e2.jpg";
import e3 from "../assets/e3.jpg";

import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";

export const dummyEvents = () => {
  return [
    {
      id: 1,
      total: 3,
      event: {
        title: "Musical Night",
        hero_text: "Join the party",
        image: e1,
        schedule_begin: "2023-12-10T08:00",
        schedule_end: "2023-12-11T09:00",
      },
      speakers: [
        {
          id: 21,
          url: p1,
          full_name: "Devid",
        },
      ],
    },
    {
      id: 2,
      total: 3,
      event: {
        title: "Musical Night",
        hero_text: "Join the party",
        image: e2,
        schedule_begin: "2023-12-10T08:00",
        schedule_end: "2023-12-11T09:00",
      },
      speakers: [
        {
          id: 22,
          url: p2,
          full_name: "Devid",
        },
        {
          id: 24,
          url: p3,
          full_name: "John",
        },
      ],
    },
    {
      id: 3,
      total: 3,
      event: {
        title: "Musical Night",
        hero_text: "Join the party",
        image: e3,
        schedule_begin: "2023-12-10T08:00",
        schedule_end: "2023-12-11T09:00",
      },
      speakers: [
        {
          id: 23,
          url: p3,
          full_name: "Devid",
        },
      ],
    },
  ];
};
