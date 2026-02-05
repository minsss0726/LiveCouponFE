import api from "../util/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EventListPage = () => {
  interface Event {
    eventId: number;
    eventName: string;
    eventDetail: string;
    eventStartDatetime: string;
    eventEndDatetime: string;
  }

  const [eventList, setEventList] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventList = async () => {
      const response = await api.get("/events");
      setEventList(response.data);
    };
    fetchEventList();
  }, []);

  const handleEventClick = (eventId: number) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <div className="page">
      <h1 className="page__title">Event List</h1>
      <ul className="event-list">
        {eventList.map((event) => (
          <li key={event.eventId}>
            <article
              className="event-card"
              onClick={() => handleEventClick(event.eventId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleEventClick(event.eventId);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <h2 className="event-card__title">{event.eventName}</h2>
              {event.eventDetail && (
                <p className="event-card__detail">{event.eventDetail}</p>
              )}
              <p className="event-card__meta">
                {event.eventStartDatetime} ~ {event.eventEndDatetime}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventListPage;
