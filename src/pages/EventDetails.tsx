import api from "../util/api";
import { parseEventDatetime } from "../util/dateParse";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventDetailsPage = () => {
  interface Event {
    eventId: number;
    eventName: string;
    eventDetail: string;
    eventStartDatetime: string;
    eventEndDatetime: string;
  }

  interface Coupon {
    couponId: number;
    couponName: string;
    couponDetail: string;
    couponApplyStartDatetime: string;
    couponApplyEndDatetime: string;
  }

  const { eventId } = useParams();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [event, setEvent] = useState<Event>();
  const [now, setNow] = useState(() => new Date());

  const isWithinEventTime = (): boolean => {
    if (!event) return false;
    const start = parseEventDatetime(event.eventStartDatetime);
    const end = parseEventDatetime(event.eventEndDatetime);
    if (Number.isNaN(start) || Number.isNaN(end)) return false;
    const current = now.getTime();
    return current >= start && current <= end;
  };

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${eventId}`);
        setEvent(response.data as Event);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvent();
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${eventId}/coupons`);
        setCoupons(response.data as Coupon[]);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  const handleIssueCoupon = async (couponId: number) => {
    try {
      const response = await api.post(`/coupons/${couponId}/issue`);
      if (response.status === 200) {
        alert("Coupon issued successfully");
      } else {
        alert("Failed to issue coupon");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while issuing coupon");
    }
  };

  return (
    <div className="page event-detail-page">
      <h1 className="event-detail-page__title">Event Details</h1>
      {event && (
        <section className="event-info" aria-label="이벤트 정보">
          <p className="event-info__row">
            <span className="event-info__label">이벤트 이름</span>
            {event.eventName}
          </p>
          {event.eventDetail && (
            <p className="event-info__row">
              <span className="event-info__label">이벤트 상세</span>
              {event.eventDetail}
            </p>
          )}
          <p className="event-info__row">
            <span className="event-info__label">이벤트 시작</span>
            {event.eventStartDatetime}
          </p>
          <p className="event-info__row">
            <span className="event-info__label">이벤트 종료</span>
            {event.eventEndDatetime}
          </p>
        </section>
      )}
      <h2 className="event-detail-page__section-title">Coupons</h2>
      <ul className="coupon-list">
        {coupons.map((coupon) => (
          <li key={coupon.couponId}>
            <article className="coupon-card">
              <h3 className="coupon-card__title">{coupon.couponName}</h3>
              {coupon.couponDetail && (
                <p className="coupon-card__detail">{coupon.couponDetail}</p>
              )}
              <p className="coupon-card__meta">
                사용 기간: {coupon.couponApplyStartDatetime} ~{" "}
                {coupon.couponApplyEndDatetime}
              </p>
              <button
                type="button"
                className="coupon-card__action"
                onClick={() => handleIssueCoupon(coupon.couponId)}
                disabled={!isWithinEventTime()}
                title={
                  isWithinEventTime()
                    ? "쿠폰 발급받기"
                    : "이벤트 기간(시작~종료 시간)에만 발급 가능합니다"
                }
              >
                {isWithinEventTime() ? "쿠폰 발급" : "이벤트 기간이 아닙니다"}
              </button>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventDetailsPage;
