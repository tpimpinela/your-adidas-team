import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";

const NotFound = () => {
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <>
      <h2>The specified route does not exist.</h2>
      <Button onClick={handleOnClick}>Go to the homepage</Button>
    </>
  );
};

export default NotFound;
