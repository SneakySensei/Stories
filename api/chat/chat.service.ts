import { CacheService } from "../services/redis.service";

export const handleTest = async (key: string, value: any) => {
  const redis = await CacheService.getInstance().getCache();
  const result = redis.hmset(key, { key, value });
  console.log(result);
};
