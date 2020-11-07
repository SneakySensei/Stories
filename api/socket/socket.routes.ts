import socketIO from "socket.io";
import {
  getUserIdentity,
  getMatchProfiles,
  getRoomPair,
} from "./socket.service";
import { userIdentity, database, redisUserSchema } from "./socket.schema";
import { CacheService } from "../services/redis.service";
import { SocketService } from "../services/socket.service";

export const socketController = async (socket: socketIO.Socket) => {
  const globalIO = SocketService.getInstance().getIO();
  let user: userIdentity | null = null;
  const cache = await CacheService.getInstance().getCache();
  await socket.use((packet, next) => {
    user = getUserIdentity(
      socket.handshake.query["x-auth-token"]
    ) as userIdentity;
    next();
  });
  await socket.on(
    "waiting-room",
    async (data: { role: "seeker" | "supporter"; [x: string]: string }) => {
      console.log("%o", data);
      cache.select(
        data.role === "seeker" ? database.seekers : database.supporters
      );
      const result = cache.hmset(socket.id, {
        id: socket.id,
        email: user?.email!,
        ...data,
      });
      if (result)
        console.log(
          `${user?.email}::${data.role}::waiting-room - ${socket.id} is waiting.`
        );
      const { seeker, supporter } = await getMatchProfiles();
      if (!seeker || supporter.length == 0) return;
      const { seekerMatch, supporterMatch } = getRoomPair(seeker, supporter);
      globalIO.to(seekerMatch).emit("join-room", {
        supporter: supporterMatch,
      });
      globalIO.to(supporterMatch).emit("join-room", {
        seeker: seekerMatch,
      });
      console.log(`${seekerMatch}::${supporterMatch} - room-match`);
    }
  );
  socket.on("join-room", (data, callback) => {
    socket.join(data);
    callback(true);
  });
  // socket.on("callback-event", (data, callback) => {
  //   callback();
  // });
  // socket.on("data-event", (data) => {});
};
