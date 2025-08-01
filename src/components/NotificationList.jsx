import React, { useState } from "react";
import NotificationItem from "./NotificationItem";
import "./NotificationList.css";

const sampleNotifications = [
  {
    id: 1,
    message: "New message from Alice",
    timestamp: new Date(),
    read: false,
  },
  {
    id: 2,
    message: "Your order has shipped",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: false,
  },
  {
    id: 3,
    message: "Password changed successfully",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
    read: true,
  },
];

function groupByDate(notifs) {
  const groups = { Today: [], Yesterday: [], Earlier: [] };
  const now = new Date();
  for (const notif of notifs) {
    const notifDate = notif.timestamp;
    const diff = (now - notifDate) / 1000 / 60 / 60 / 24;
    if (diff < 1) groups["Today"].push(notif);
    else if (diff < 2) groups["Yesterday"].push(notif);
    else groups["Earlier"].push(notif);
  }
  return groups;
}

export default function NotificationList() {
  const [notifications, setNotifications] = useState(sampleNotifications);

  function markAllAsRead() {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  }
  function markAsRead(id) {
    setNotifications((ns) =>
      ns.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  const groups = groupByDate(notifications);

  return (
    <div className="notification-list__panel">
      <div className="notification-list__header">
        <span>Notifications</span>
        <button onClick={markAllAsRead}>Mark All as Read</button>
      </div>
      {Object.entries(groups).map(
        ([dateLabel, items]) =>
          items.length > 0 && (
            <div key={dateLabel}>
              <div className="notification-list__date">{dateLabel}</div>
              {items.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onClick={markAsRead}
                />
              ))}
            </div>
          )
      )}
      {notifications.length === 0 && (
        <div className="notification-list__empty">No notifications</div>
      )}
    </div>
  );
}
