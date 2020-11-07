import { verify } from "jsonwebtoken";
import { promisify } from "util";
import { CacheService } from "../services/redis.service";
import { database, redisUserSchema } from "./socket.schema";
export const getUserIdentity = (token: string) => {
  const identity = verify(token, process.env.JWT_SECRET!);
  return identity;
};

export const getMatchProfiles = async (): Promise<{
  seeker: redisUserSchema;
  supporter: Array<redisUserSchema>;
}> => {
  const cache = CacheService.getInstance().getCache();
  cache.select(database.seekers);
  const seekers = await promisify(cache.keys).bind(cache)("*");
  const lastSeeker = (await promisify(cache.hgetall).bind(cache)(
    seekers[seekers.length - 1]
  )) as unknown;
  cache.select(database.supporters);
  const supporters = await promisify(cache.keys).bind(cache)("*");
  let supporterList: any[] = [];
  const result = supporters.map(async (ele) => {
    supporterList.push(await promisify(cache.hgetall).bind(cache)(ele));
  });
  await Promise.all(result);
  return {
    seeker: lastSeeker! as redisUserSchema,
    supporter: supporterList,
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
