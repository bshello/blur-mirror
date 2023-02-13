import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetch(method, url, sendData) {
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // true는 로딩중
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios({
          method: method,
          url: url,
          data: sendData,
        })
          .then((res) => {
            setResData(res.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (err) {
        setError(err);
        alert(err);
      }
    };
    if (isLoading) {
      fetchData();
    }
  }, [method, url, sendData]);

  return { resData, error, isLoading };
}
