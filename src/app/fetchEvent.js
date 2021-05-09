import axios from "axios";
import { urlBase } from "../features/constants/Url";

export const fetchEvent = (id, action) => (dispatch) => {
  const url = `${urlBase}${id}`;

  axios
    .get(url)
    .then((res) => dispatch(action(res.data)))
    .catch((error) => console.error("Error: ", error));
};
