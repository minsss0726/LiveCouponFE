import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div>
        <h1>Live Coupon</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
