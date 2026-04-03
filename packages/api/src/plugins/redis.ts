import fp from "fastify-plugin";
import Redis from "ioredis";

declare module 'fastify' {
    interface FastifyInstance {
        redis: Redis;
    }
}

export default fp(async (fastify) => {
    const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
        maxRetriesPerRequest: 0,
        lazyConnect: true,
        enableOfflineQueue: false,
        retryStrategy: () => null, // Stop retrying completely
    });

    redis.on('error', (err) => {
        // Silenced for dev stability
    });

    fastify.decorate("redis", redis);

    fastify.addHook("onClose", async (server) => {
        await server.redis.quit();
    });
});
