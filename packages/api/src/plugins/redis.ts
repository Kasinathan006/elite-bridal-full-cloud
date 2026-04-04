import fp from "fastify-plugin";
import Redis from "ioredis";

declare module 'fastify' {
    interface FastifyInstance {
        redis: Redis;
    }
}

export default fp(async (fastify) => {
    let redis: any;
    try {
        redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
            maxRetriesPerRequest: 0,
            connectTimeout: 2000,
            retryStrategy: () => null,
            enableOfflineQueue: false
        });

        redis.on('error', (err: any) => {
            console.warn("[REDIS] Not available:", err.message);
        });
    } catch (e) {
        console.error("[REDIS] Constructor failed:", e);
    }

    // Comprehensive fallback object
    const redisFallback = {
        get: async () => null,
        set: async () => "OK",
        incr: async () => 1,
        expire: async () => 1,
        del: async () => 1,
        quit: async () => { },
        on: () => { }
    };

    fastify.decorate("redis", redis || redisFallback);

    fastify.addHook("onClose", async (server) => {
        if (server.redis && typeof server.redis.quit === 'function') {
            await server.redis.quit();
        }
    });
});
