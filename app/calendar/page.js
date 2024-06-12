import CalendarContainer from "@/components/Calendar/CalendarContainer";

export default function CaledarPage() {
  let events = [
    {
      title: "event 1",
      description: "papaja1",
      start: "2024-06-07T06:20:00",
    },
    {
      title: "event 2",
      description: "papaja2",
      start: "2024-06-08",
    },
    {
      title: "event 3",
      description: "papaja3",
      start: "2024-06-15T10:00:00",
      end: "2024-06-16T13:00:00",
    },
  ];
  return <CalendarContainer userEvents={events} />;
}
