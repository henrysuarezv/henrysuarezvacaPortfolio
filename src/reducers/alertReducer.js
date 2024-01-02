const initialProps = {
  showAlert: false,
};

export const AlertReducer = (state = initialProps, action) => {
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        showAlert: action.payload,
      };
    default:
      return state;
  }
};
export default AlertReducer;
