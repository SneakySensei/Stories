import { verify } from "jsonwebtoken";
import { promisify } from "util";
import { CacheService } from "../services/redis.service";
import { database, redisUserSchema } from "./socket.schema";
import * as toxicity from "@tensorflow-models/toxicity";

export const getUserIdentity = (token: string) => {
  const identity = verify(token, process.env.JWT_SECRET!);
  return identity;
};

export const getMatchProfiles = async (): Promise<{
  seeker: redisUserSchema | null;
  supporters: Array<redisUserSchema>;
}> => {
  const cache = CacheService.getInstance().getCache();
  cache.select(database.seekers);
  const seekers = await promisify(cache.keys).bind(cache)("*");
  if (seekers.length === 0) {
    return {
      seeker: null,
      supporters: [],
    };
  }
  const lastSeeker = (await promisify(cache.hgetall).bind(cache)(
    seekers[seekers.length - 1]
  )) as unknown;
  cache.select(database.supporters);
  const supporters = await promisify(cache.keys).bind(cache)("*");
  if (supporters.length === 0) {
    return {
      seeker: null,
      supporters: [],
    };
  }
  let supporterList: any[] = [];
  const result = supporters.map(async (ele) => {
    supporterList.push(await promisify(cache.hgetall).bind(cache)(ele));
  });
  await Promise.all(result);
  return {
    seeker: lastSeeker! as redisUserSchema,
    supporters: supporterList,
  };
};

export const getRoomPair = (
  seeker: redisUserSchema,
  supporters: Array<redisUserSchema>
): { seekerMatch: string; supporterMatch: string } => {
  let compatibilities: number[] = [];
  supporters.forEach((supporter, index) => {
    let score = 0;
    if (supporter["suicide-prevention"] && seeker["suicide-prevention"])
      score += 1;
    if (supporter["relationship-advice"] && seeker["relationship-advice"])
      score += 1;
    if (supporter["family-issues"] && seeker["family-issues"]) score += 1;
    if (supporter["substance-abuse"] && seeker["substance-abuse"]) score += 1;
    if (supporter["gender-sexual-identity"] && seeker["gender-sexual-identity"])
      score += 1;
    if (
      supporter["anxious-depressive-thoughts"] &&
      seeker["anxious-depressive-thoughts"]
    )
      score += 1;
    if (supporter["academic-issues"] && seeker["academic-issues"]) score += 1;
    compatibilities.push(score);
  });
  const maxCompatibility = Math.max(...compatibilities);
  const maxCompatibilityIndex = compatibilities.findIndex(
    (e) => e === maxCompatibility
  );
  return {
    seekerMatch: seeker.id,
    supporterMatch: supporters[maxCompatibilityIndex].id,
  };
};

export const isToxic = async (message: string): Promise<boolean> => {
  const model = await toxicity.load(0.4, [
    "identity_attack",
    "insult",
    "obscene",
    "severe_toxicity",
    "sexual_explicit",
    "threat",
    "toxicity",
  ]);
  const predictions = await model.classify([`${message}`]);
  let flag = false;
  predictions.forEach((e) => {
    if (e.results[0].match === true) {
      flag = true;
      return;
    }
  });
  return flag;
};
