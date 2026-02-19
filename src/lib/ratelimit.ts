import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 2 request per minute
export const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(2, "1 m")
})
