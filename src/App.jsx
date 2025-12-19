import { useEffect, useState } from "react";
import {
  requestPermissionAndSendToken,
  listenForMessages,
  registerFcmListener,
} from "./firebase/messaging";
import Notification from "./components/Notification";
import HomePage from "./pages/HomePage";

function App() {
  const [notification, setNotification] = useState(null);
  const userId = "68d62ee720e7c07c3b3993d8";
  useEffect(() => {
    requestPermissionAndSendToken(userId);

    registerFcmListener((data) => {
      setNotification(data);

      setTimeout(() => {
        setNotification(null);
      }, 4000);
    });

    listenForMessages();
  }, [userId]);

  return (
    <>
      {notification && (
        <Notification title={notification.title} body={notification.body} />
      )}

      <HomePage />
    </>
  );
}

export default App;
