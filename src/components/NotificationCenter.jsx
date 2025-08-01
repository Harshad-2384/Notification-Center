import React, { useState } from "react";
import NotificationList from "./NotificationList";
import "./NotificationCenter.css";

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);

  return (
    <div className="notification-center__container">
      <button
        className="notification-center__toggle"
        onClick={() => setOpen((prev) => !prev)}
      >
        Notifications
      </button>
      {open && <NotificationList />}
    </div>
  );
}
