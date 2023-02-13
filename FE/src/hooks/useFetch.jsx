import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(method, url, sendData) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: method,
      // url: `${API_URL}/start`,
      url: url,
      data: sendData,
    })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        return err;
      });

    return data;
  }, [data, method, url, sendData]);
}
