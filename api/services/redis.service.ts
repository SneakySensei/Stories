import { errors } from "../error/error.constant";
import redis from "redis";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

export class CacheService {
  private static instance: CacheService;
  private cache: null | redis.RedisClient = null;
  private constructor() {}

  public initalize = async (): Promise<void> => {
    try {
      this.cache = redis.createClient({
        password: process.env.REDIS_PASSWORD,
        port: +process.env.REDIS_PORT!,
        host: process.env.REDIS_HOST,
      });
      this.cache.on("connect", () => {
        console.info(`Connected to Redis on Port ${process.env.REDIS_PORT}`);
      });
    } catch (err) {
      console.error("Could not connect to Redis");
      console.error("RedisError\n%o", { error: err });
      throw errors.INTERNAL_SERVER_ERROR;
    }
  };

  public static getInstance = (): CacheService => {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
      return CacheService.instance!;
    }
    return CacheService.instance!;
  };
  public getCache = (): redis.RedisClient => {
    return this.cache!;
  };
}
