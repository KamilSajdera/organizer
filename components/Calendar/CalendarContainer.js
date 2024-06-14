"use client";

import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import styles from "./CalendarContainer.module.scss";

import "@/styles/MyCalendar.css";

import NewEvent from "./NewEvent";
import PageHeader from "@/ui/PageHeader";
import EventDetails from "./EventDetails";

const CalendarContainer = ({ userEvents, userId }) => {
  const calendarRef = useRef(null);
  const [seletedDate, setSelectedDate] = useState(null);
  const [eventDisplayData, setEventDisplayData] = useState();

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

  const handleEventClick = (info) => {
    const eventInfo = {
      title: info.event.title,
      description: info.event._def.extendedProps.description,
      all_day: info.event.allDay,
      has_end: info.event._def.hasEnd,
      start: info.event._instance.range.start,
      end: info.event._instance.range.end,
    };

    setEventDisplayData(eventInfo);
  };

  return (
    <>
      <PageHeader title="Calendar" />
      <div className={styles.container}>
        {seletedDate && (
          <NewEvent
            date={seletedDate}
            onClose={() => setSelectedDate(null)}
            userId={userId}
          />
        )}
        {eventDisplayData && (
          <EventDetails
            {...eventDisplayData}
            onClose={() => setEventDisplayData(null)}
          />
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
          events={userEvents}
          slotLabelFormat={{
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
    </>
  );
};

export default CalendarContainer;
