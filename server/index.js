const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});
// created mappings
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, roomno } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    // new event emitted so that new room channel can be accessed with it
    io.to(roomno).emit("user:joined", { email, id: socket.id });
    socket.join(roomno);

    // allowing user to join, sent data again to client
    io.to(socket.id).emit("room:join", data);
  });
});
