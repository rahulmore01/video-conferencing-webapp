const { Server } = require("socket.io");

const io = new Server(8000, {
  cors: true,
});
// created mappings
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

// created a websocket connection
io.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  // listening emited client data
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
  // listening to peer offer and emiting a new event
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });
  // listening negotiation needed offer

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
