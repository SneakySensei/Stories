import socketIO from "socket.io";

export const socketController = (socket: socketIO.Socket) => {
  socket.on("callback-event", (data, callback) => {
    callback();
  });
  socket.on("data-event", (data) => {});
};
