"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import styles from './CalendarContainer.module.scss';

export default function CalendarContainer() {
  return (
    <div className={styles.container}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        selectable={true}
        firstDay={1}  
        events={[
          { title: "event 1", date: "2024-06-01" },
          { title: "event 2", date: "2024-05-02" },
        ]}
      />
    </div>
  );
}
