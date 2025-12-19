import React, { useEffect, useState } from "react";
import {
  Bell,
  Copy,
  Send,
  CheckCircle,
  XCircle,
  Smartphone,
  Code,
  Layers,
} from "lucide-react";
import BellIcon from "../assets/mail.png";
import axios from "axios";

const Section = ({ title, icon: Icon, children }) => (
  <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      {Icon && <Icon className="w-6 h-6 text-blue-600" />}
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-600 space-y-4 leading-relaxed">{children}</div>
  </section>
);

const CodeBlock = ({ children }) => (
  <pre className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 text-xs md:text-sm rounded-xl p-4 md:p-6 overflow-x-auto shadow-inner">
    <code className="font-mono">{children}</code>
  </pre>
);

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const HomePage = () => {
  const [fcmToken, setFcmToken] = useState(null);
  const [title, setTitle] = useState("Test Push Notification");
  const [body, setBody] = useState("This is a test push notification");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setFcmToken(sessionStorage.getItem("fcmToken"));
  }, []);

  const copyToken = async () => {
    await navigator.clipboard.writeText(fcmToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendTestNotification = async () => {
    if (!fcmToken) {
      setStatus({ type: "error", message: "FCM token not found" });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      await axios.post(
        "https://salmara.uur.co.in:4170/api/user/sendTestNotification",
        {
          fcmToken,
          title,
          body,
        }
      );

      setStatus({
        type: "success",
        message: "Notification sent successfully! Check your device.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to send notification",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        {/* Hero Header */}
        <header className="text-center mb-12 md:mb-16">
          <div className="flex justify-center items-center mb-6">
            <img src={BellIcon} alt="" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Firebase Push Notifications
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Complete guide to implementing push notifications with Firebase
            Cloud Messaging (FCM) in React
          </p>
        </header>

        <div className="grid gap-6 md:gap-8">
          {/* Overview */}
          <Section title="Overview" icon={Layers}>
            <p>
              This application uses{" "}
              <span className="font-semibold text-gray-900">
                Firebase Cloud Messaging (FCM)
              </span>{" "}
              to deliver real-time push notifications to users across all
              platforms.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl mb-2">🔔</div>
                <div className="font-semibold text-gray-900">Foreground</div>
                <div className="text-sm text-gray-600">
                  App is open and active
                </div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <div className="text-2xl mb-2">🌙</div>
                <div className="font-semibold text-gray-900">Background</div>
                <div className="text-sm text-gray-600">
                  App is open but inactive
                </div>
              </div>
              <div className="bg-indigo-50 rounded-xl p-4">
                <div className="text-2xl mb-2">🚫</div>
                <div className="font-semibold text-gray-900">Closed</div>
                <div className="text-sm text-gray-600">
                  Service Worker handles it
                </div>
              </div>
            </div>
          </Section>

          {/* Your FCM Token */}
          <Section title="Your FCM Token" icon={Smartphone}>
            {fcmToken ? (
              <div className="space-y-4">
                <p className="text-sm">
                  Use this token to send notifications to your device:
                </p>
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 break-all text-sm font-mono text-gray-700">
                  {fcmToken}
                </div>
                <button
                  onClick={copyToken}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all transform hover:scale-105 active:scale-95"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Token
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-900 mb-1">
                    Token Not Found
                  </div>
                  <div className="text-sm text-red-700">
                    Please allow notification permission to generate your FCM
                    token.
                  </div>
                </div>
              </div>
            )}
          </Section>

          {/* Test Notification */}
          <Section title="Send Test Notification" icon={Send}>
            <div className="space-y-5 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Notification Title
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="Enter notification title..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Notification Body
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Enter notification message..."
                />
              </div>

              <button
                onClick={sendTestNotification}
                disabled={loading || !fcmToken}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <Send className="w-4 h-4" />
                {loading ? "Sending..." : "Send Test Notification"}
              </button>

              {status && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 ${
                    status.type === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm font-medium ${
                      status.type === "success"
                        ? "text-green-900"
                        : "text-red-900"
                    }`}
                  >
                    {status.message}
                  </p>
                </div>
              )}
            </div>
          </Section>

          {/* Folder Structure */}
          <Section title="Folder Structure" icon={Code}>
            <p className="mb-4">
              Clean and organized project structure for easy maintenance:
            </p>
            <CodeBlock>
              {`public/
 └─ firebase-messaging-sw.js

src/
 ├─ firebase/
 │   ├─ firebase.js
 │   └─ messaging.js
 ├─ api/
 │   └─ userApi.js
 ├─ components/
 │   └─ Notification.jsx
 ├─ pages/
 │   └─ HomePage.jsx
 ├─ App.jsx
 └─ main.jsx`}
            </CodeBlock>
          </Section>

          {/* Backend Integration */}
          <Section title="Backend Integration" icon={Code}>
            <p className="mb-4">
              Trigger notifications from your backend using this API endpoint:
            </p>
            <CodeBlock>
              {`curl --location 'https://localhost:4170/api/user/sendTestNotification' \\
--header 'Content-Type: application/json' \\
--data '{
  "fcmToken": "<USER_FCM_TOKEN>",
  "title": "Test Push Notification",
  "body": "This is a test push notification from backend API"
}'`}
            </CodeBlock>
          </Section>

          {/* Important Notes */}
          <Section title="Important Notes" icon={Bell}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <span className="font-semibold">HTTPS Required:</span> FCM
                  only works on HTTPS or localhost
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <span className="font-semibold">Service Worker:</span> Must be
                  in the public root directory
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <span className="font-semibold">VAPID Key:</span> Must match
                  Firebase project settings
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <span className="font-semibold">Security:</span> Never expose
                  Admin SDK keys on frontend
                </p>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <Badge color="blue">React</Badge>
            <Badge color="purple">Firebase</Badge>
            <Badge color="green">Tailwind CSS</Badge>
          </div>

          <p className="text-sm text-gray-500">
            Built by{" "}
            <span className="font-medium text-gray-700">aqcodes12</span> 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
