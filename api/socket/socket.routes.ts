import socketIO from "socket.io";
import {
  getUserIdentity,
  getMatchProfiles,
  getRoomPair,
} from "./socket.service";
import { userIdentity, database, redisUserSchema } from "./socket.schema";
import { CacheService } from "../services/redis.service";

export const socketController = async (socket: socketIO.Socket) => {
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
      const seekerDummy: redisUserSchema = {
        id: "seeker1",
        email: "mail@mail.com",
        role: "seeker",
        "suicide-prevention": true,
        "relationship-advice": true,
        "family-issues": false,
        "substance-abuse": false,
        "gender-sexual-identity": false,
        "anxious-depressive-thoughts": true,
        "academic-issues": false,
      };

      const supportersDummy: Array<redisUserSchema> = [
        {
          id: "supporter1",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": false,
          "relationship-advice": true,
          "family-issues": false,
          "substance-abuse": true,
          "gender-sexual-identity": false,
          "anxious-depressive-thoughts": false,
          "academic-issues": false,
        },
        {
          id: "supporter2",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": false,
          "relationship-advice": false,
          "family-issues": false,
          "substance-abuse": true,
          "gender-sexual-identity": false,
          "anxious-depressive-thoughts": true,
          "academic-issues": false,
        },
        {
          id: "supporter3",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": false,
          "relationship-advice": false,
          "family-issues": true,
          "substance-abuse": false,
          "gender-sexual-identity": true,
          "anxious-depressive-thoughts": false,
          "academic-issues": true,
        },
        {
          id: "supporter4",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": true,
          "relationship-advice": true,
          "family-issues": true,
          "substance-abuse": true,
          "gender-sexual-identity": true,
          "anxious-depressive-thoughts": true,
          "academic-issues": true,
        },
        {
          id: "supporter5",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": true,
          "relationship-advice": true,
          "family-issues": false,
          "substance-abuse": true,
          "gender-sexual-identity": false,
          "anxious-depressive-thoughts": false,
          "academic-issues": false,
        },
        {
          id: "supporter6",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": true,
          "relationship-advice": true,
          "family-issues": false,
          "substance-abuse": true,
          "gender-sexual-identity": false,
          "anxious-depressive-thoughts": false,
          "academic-issues": false,
        },
        {
          id: "supporter7",
          role: "supporter",
          email: "mail@mail.com",
          "suicide-prevention": false,
          "relationship-advice": true,
          "family-issues": false,
          "substance-abuse": true,
          "gender-sexual-identity": true,
          "anxious-depressive-thoughts": false,
          "academic-issues": false,
        },
      ];
      const { seekerMatch, supporterMatch } = getRoomPair(
        seekerDummy,
        supportersDummy
      );
      console.log(seekerMatch, supporterMatch);
    }
  );

  // socket.on("callback-event", (data, callback) => {
  //   callback();
  // });
  // socket.on("data-event", (data) => {});
};
