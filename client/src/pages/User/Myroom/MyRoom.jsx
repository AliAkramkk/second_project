import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/chef/room/${roomCode}`);
  };

  return (
    <>
      <div className="myroom">
        <form onSubmit={handleFormSubmit} className="form">
          <div>
            <label className="block">Enter the room Id</label>
            <input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              type="text"
              required
              placeholder="Enter the Room Id"
            />
          </div>
          <button type="submit">Enter Room</button>
        </form>
      </div>
      ;
    </>
  );
};

export default MyRoom;
