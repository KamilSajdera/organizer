"use client";

import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import styles from "./CalendarContainer.module.scss";

import "@/styles/MyCalendar.css";

import NewEvent from "./NewEvent";

const MyCalendar = () => {
  const calendarRef = useRef(null);
  const [seletedDate, setSelectedDate] = useState(null);

  const handlePrevYear = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.prevYear();
  };

  const handleNextYear = () => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.nextYear();
  };

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    setSelectedDate(clickedDate);
  };

  return (
    <div className={styles.container}>
      {seletedDate && (
        <NewEvent date={seletedDate} onClose={() => setSelectedDate(null)} />
      )}
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next myPrevYear myNextYear",
          center: "title",
          right: "today dayGridMonth,timeGridWeek,timeGridDay",
        }}
        customButtons={{
          myPrevYear: {
            text: "Prev Year",
            click: handlePrevYear,
          },
          myNextYear: {
            text: "Next Year",
            click: handleNextYear,
          },
        }}
        editable={true}
        selectable={false}
        firstDay={1}
        events={[
          { title: "event 1 o okreslonym dzialaniu", date: "2024-06-01" },
          { title: "event 2", date: "2024-06-02" },
          { title: "event 3", date: "2024-06-02" },
          { title: "event 4", date: "2024-06-12" },
          { title: "event 5", date: "2024-06-22" },
          { title: "event 6", date: "2024-06-02" },
          { title: "event 7", date: "2024-06-02" },
        ]}
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default MyCalendar;
