import { useEffect, useState } from "react";
import api from "../util/api";

const AdminPage = () => {
  const [eventList, setEventList] = useState<Event[]>([]);

  interface Event {
    eventId: number;
    eventName: string;
    eventDetail: string;
    eventStartDatetime: string;
    eventEndDatetime: string;
  }
  useEffect(() => {
    const fetchEventList = async () => {
      const response = await api.get("/events");
      setEventList(response.data);
    };
    fetchEventList();
  }, []);

  const handleRegisterCoupon = async (eventId: number) => {
    try {
      const response = await api.post(`/events/${eventId}/initialize-coupons`);
      if (response.status === 204) {
        alert("Coupon initialization completed");
      } else {
        alert("Failed to initialize coupons");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page admin-page">
      <h1 className="admin-page__title">Events</h1>
      <ul className="admin-event-list">
        {eventList.map((event) => (
          <li key={event.eventId}>
            <article className="admin-event-card">
              <h2 className="admin-event-card__title">{event.eventName}</h2>
              {event.eventDetail && (
                <p className="admin-event-card__detail">{event.eventDetail}</p>
              )}
              <p className="admin-event-card__meta">
                {event.eventStartDatetime} ~ {event.eventEndDatetime}
              </p>
              <button
                type="button"
                className="admin-event-card__btn"
                onClick={() => handleRegisterCoupon(event.eventId)}
              >
                Register Coupon
              </button>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
