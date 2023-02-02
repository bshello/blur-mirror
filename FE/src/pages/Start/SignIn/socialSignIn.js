import { useEffect } from "react";
import { saveToken } from "../../../redux/reducers/saveToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function SocialSignInRedirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    console.log(location.search);
    const token = location.search;
    console.log(token);

    if (token) {
      dispatch(saveToken(token));
      navigate("/home");
    }
  }, []);
  return <></>;
}

export default SocialSignInRedirect;
