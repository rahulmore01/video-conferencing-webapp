import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [email, setEmail] = useState("");
  const [roomno, setRoomno] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      // emiting the emial and room data to server with socket instance
      socket.emit("room:join", { email, roomno });
      // console.log({
      //   email,
      //   roomno,
      // });
    },
    [email, roomno, socket]
  );
  const handleJoinRoom = useCallback(
    (data) => {
      const { email, roomno } = data;
      navigate(`/room/${roomno}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      // cleanup to remove listers
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);
  return (
    <div>
      Lobby
      <div>
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="room no">room number</label>
          <input
            type="text"
            id="roomno"
            value={roomno}
            onChange={(e) => setRoomno(e.target.value)}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
