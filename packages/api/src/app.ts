import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db";
import authPlugin from "./plugins/auth";
import redisPlugin from "./plugins/redis";
import socketPlugin from "./plugins/socket";
import postsRoutes from "./modules/posts/posts.routes";
import profilesRoutes from "./modules/profiles/profiles.routes";
import bookingsRoutes from "./modules/bookings/bookings.routes";
import messagesRoutes from "./modules/messages/messages.routes";
import notificationsRoutes from "./modules/notifications/notifications.routes";
import authRoutes from "./modules/auth/auth.routes";
import searchRoutes from "./modules/search/search.routes";
import gigsRoutes from "./modules/gigs/gigs.routes";
import { PrismaClient } from "@bridal-connect/db";
import Redis from "ioredis";
import { Server } from "socket.io";
import { JWT } from "@fastify/jwt";

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
        redis: Redis;
        authenticate: any;
        jwt: JWT;
        io: Server;
    }
}

export async function buildApp() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, { origin: "*" });
    await fastify.register(dbPlugin);
    await fastify.register(authPlugin);
    await fastify.register(redisPlugin);
    await fastify.register(socketPlugin);

    // Status
    fastify.get("/health", async () => ({ status: "ok", version: "0.2.0" }));

    // Modules
    await fastify.register(authRoutes, { prefix: "/auth" });
    await fastify.register(postsRoutes, { prefix: "/posts" });
    await fastify.register(profilesRoutes, { prefix: "/profiles" });
    await fastify.register(bookingsRoutes, { prefix: "/bookings" });
    await fastify.register(messagesRoutes, { prefix: "/messages" });
    await fastify.register(notificationsRoutes, { prefix: "/notifications" });
    await fastify.register(searchRoutes, { prefix: "/search" });
    await fastify.register(gigsRoutes, { prefix: "/gigs" });

    // Legacy/Demo shim
    fastify.get('/auth/demo-user', async () => {
        return fastify.prisma.user.findFirst({
            where: { phone: '9000090000' }
        });
    });

    return fastify;
}
