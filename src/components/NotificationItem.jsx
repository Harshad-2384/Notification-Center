import React from "react";
import "./NotificationItem.css";

function timeAgo(date) {
  const ms = Date.now() - date.getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minutes ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function NotificationItem({ notification, onClick }) {
  return (
    <div
      className={`notification-item${notification.read ? " read" : ""}`}
      onClick={() => !notification.read && onClick(notification.id)}
      tabIndex={0}
      role="button"
      aria-pressed={notification.read}
    >
      <div className="notification-item__message">{notification.message}</div>
      <div className="notification-item__meta">
        <span className="notification-item__timestamp">
          {timeAgo(notification.timestamp)}
        </span>
        {!notification.read && (
          <span className="notification-item__dot" title="Unread"></span>
        )}
      </div>
    </div>
  );
}
