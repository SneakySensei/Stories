import socketIO from "socket.io";
import {
  getUserIdentity,
  getMatchProfiles,
  getRoomPair,
  isToxic,
  disconnect,
  banUser,
  isBanned,
} from "./socket.service";
import { userIdentity, database, redisUserSchema } from "./socket.schema";
import { CacheService } from "../services/redis.service";
import { SocketService } from "../services/socket.service";

export const socketController = async (socket: socketIO.Socket) => {
  try {
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
      async (
        data: { role: "seeker" | "supporter"; [x: string]: string },
        callback
      ) => {
        if (await isBanned(user?.email!)) {
          callback(true);
          return;
        }
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
        const { seeker, supporters } = await getMatchProfiles();
        if (!seeker || supporters.length === 0) return;
        const { seekerMatch, supporterMatch } = getRoomPair(seeker, supporters);
        globalIO.to(seekerMatch).emit("join-room", {
          supporter: supporterMatch,
        });
        globalIO.to(supporterMatch).emit("join-room", {
          seeker: seekerMatch,
        });
        console.log(`${seekerMatch}::${supporterMatch} - room-match`);
        callback(false);
      }
    );
    await socket.on("join-room", (data, callback) => {
      socket.join(data);
      callback(true);
    });
    await socket.on("send-to-supporter", (data: { message: string }) => {
      console.log("sent-from-seeker::", data.message);
      socket.to(socket.id).broadcast.emit("sent-from-seeker", data);
    });
    await socket.on("send-to-seeker", async (data: { message: string }) => {
      const toxic = await isToxic(data.message);
      console.log("sent-from-supporter::", data.message);
      socket
        .to(socket.id)
        .broadcast.emit("sent-from-supporter", { ...data, isToxic: toxic });
    });
    await socket.on("close-room", async (data) => {
      console.log(`close-room::${socket.id}::${data.otherUser}`);
      socket.to(data.otherUser).emit("close-room");
      await disconnect(socket.id, data.otherUser);
    });
    await socket.on("ban-user", async (data: { supporter: string }) => {
      await banUser(data.supporter);
    });
    // socket.on("callback-event", (data, callback) => {
    //   callback();
    // });
    // socket.on("data-event", (data) => {});
  } catch (err) {
    console.log("%o", err);
  }
};
