import React, { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";

export default function Notification({
  title,
  body,
  onClose,
  duration = 5000,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 10);

    // Auto-dismiss after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  if (!title && !body) return null;

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div
        className={`pointer-events-auto w-80 sm:w-96 bg-white border-l-8 border-blue-600 shadow-2xl rounded-xl overflow-hidden transition-all duration-300 transform ${
          isVisible && !isExiting
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {/* Progress bar */}
        <div className="h-1 bg-gray-100 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-shrink origin-left"
            style={{ animation: `shrink ${duration}ms linear` }}
          />
        </div>

        <div className="p-4 flex gap-3">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Bell className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm leading-snug mb-1">
              {title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors group"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
        .animate-shrink {
          animation: shrink linear;
        }
      `}</style>
    </div>
  );
}
