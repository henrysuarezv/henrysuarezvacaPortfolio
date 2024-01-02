import { useSelector } from "react-redux";

export const AlertSelector = () => {
  return useSelector((state) => state.alerts);
};

export default AlertSelector;
