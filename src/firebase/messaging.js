import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import { updateFcmToken } from "../api/userApi";

const VAPID_KEY =
  "BGbUSNvyv4eHJgwtZtQv4a-M5-kjL1U6UpqCBHY4E9pxjk9BdQ16UF1KngeyyHg2_lDeLFEuqTaHZSMY3AlEjuc";

export const requestPermissionAndSendToken = async (userId) => {
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const fcmToken = await getToken(messaging, {
    vapidKey: VAPID_KEY,
  });

  if (!fcmToken) return;

  console.log("FCM Token:", fcmToken);

  sessionStorage.setItem("fcmToken", fcmToken);

  await updateFcmToken({
    userId,
    fcmToken,
  });
};

// --------- FOREGROUND MESSAGE HANDLER ----------
let onNotification;

export const registerFcmListener = (callback) => {
  onNotification = callback;
};

export const listenForMessages = () => {
  onMessage(messaging, (payload) => {
    onNotification?.({
      title: payload.notification?.title || "New Notification",
      body: payload.notification?.body || "",
    });
  });
};
