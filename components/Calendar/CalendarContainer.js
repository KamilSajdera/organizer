"use client";

import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { updateEventDate } from "@/lib/events";
import styles from "./CalendarContainer.module.scss";

import "@/styles/MyCalendar.css";

import NewEvent from "./NewEvent";
import EventDetails from "./EventDetails";
import ConfirmationArea from "@/ui/ConfirmationArea";

const CalendarContainer = ({ userEvents, userId }) => {
  const calendarRef = useRef(null);
  const [seletedDate, setSelectedDate] = useState(null);
  const [eventDisplayData, setEventDisplayData] = useState();
  const [movedEventData, setMovedEventData] = useState(null);

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
      id: info.event._def.extendedProps._id,
      title: info.event.title,
      description: info.event._def.extendedProps.description,
      all_day: info.event.allDay,
      has_end: info.event._def.hasEnd,
      start: info.event._instance.range.start,
      end: info.event._instance.range.end,
    };

    setEventDisplayData(eventInfo);
  };

  const handleEventDrop = (info) => {
    const data = {
      id: info.event._def.extendedProps._id,
      oldStart: info.oldEvent.startStr,
      oldEnd: info.oldEvent.endStr,
      newStart: info.event.startStr,
      newEnd: info.event.endStr,
      all_day: info.event.allDay,
    };

    setMovedEventData(data);
  };

  const dateFormatOptions = movedEventData?.all_day
    ? { year: "numeric", month: "numeric", day: "numeric" }
    : {
        year: "numeric",
        month: "numeric",
        day: "numeric",

        hour: "numeric",
        minute: "numeric",
      };

  return (
    <>
      {movedEventData && (
        <ConfirmationArea
          onClose={() => setMovedEventData(null)}
          onConfirmation={async () => {
            await updateEventDate(movedEventData);
            setMovedEventData(null);
          }}
        >
          You are going to change the date of your event to{" "}
          <b style={{ color: "#eee" }}>
            {new Date(movedEventData.newStart).toLocaleString(
              "pl-PL",
              dateFormatOptions
            )}
          </b>
          .
        </ConfirmationArea>
      )}
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
          eventDrop={handleEventDrop}
        />
      </div>
    </>
  );
};

export default CalendarContainer;
