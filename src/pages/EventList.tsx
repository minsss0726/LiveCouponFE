import api from "../util/api";
import { useState, useEffect } from "react";

const EventListPage = () => {
  interface Event {
    eventId: number;
    eventName: string;
    eventDetail: string;
    eventStartDatetime: string;
    eventEndDatetime: string;
  }
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEventList = async () => {
      const response = await api.get("/events");
      setEventList(response.data);
    };
    fetchEventList();
  }, []);

  return (
    <div>
      <h1>Event List</h1>
      <ul>
        {eventList.map((event) => (
          <li key={event.eventId}>{event.eventName}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
