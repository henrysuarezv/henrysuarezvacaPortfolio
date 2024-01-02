import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { requestWaiterRequest } from "../api/requestWaiter";

const RequestContext = createContext();

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const RequestProvider = ({ children }) => {
  const [waiter, setWaiter] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors([]);
      setWaiter(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [errors, waiter]);

  const requestWaiter = async (waiter) => {
    try {
      const res = await requestWaiterRequest(waiter);
      if (res.status === 200) {
        setWaiter(true);
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  return (
    <RequestContext.Provider
      value={{
        requestWaiter,
        errors,
        waiter,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export default RequestContext;
