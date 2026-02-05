import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <Link to="/events" className="layout__brand">
          Live Coupon
        </Link>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
