import { useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

const useToast = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const ToastContainer: React.FC = () => {
    return toast ? <Toast message={toast.message} type={toast.type} /> : null;
  };

  return { showToast, ToastContainer };
};

export { useToast };
