import { createPortal } from "react-dom";
import { useEffect } from "react";

function Modal({ children, isOpen, onToggle }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onToggle();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onToggle]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onToggle}
    >
      <div
        className="modal-content bg-white dark:bg-gray-800  rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          onClick={onToggle}
          className="mt-6 w-full bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600  hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          закрыть
        </button>
      </div>
    </div>,
    document.body,
  );
}
export default Modal; // Modal.jsx
