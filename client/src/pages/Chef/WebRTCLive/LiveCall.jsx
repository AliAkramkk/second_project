import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../context/authReducer";

const LiveCall = () => {
  const token = useSelector(selectCurrentToken);
  const [room, setRoom] = useState();

  return <div>LiveCall</div>;
};

export default LiveCall;
