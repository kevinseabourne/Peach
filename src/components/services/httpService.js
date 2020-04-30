// /* istanbul ignore file */
import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  if (axios.isCancel(error)) {
    // ignore
  } else if (
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  ) {
    logger.log(error);
    toast("An unexpected error has occurred", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    return Promise.reject(error);
  }
});
