import { PrismaClient } from "@bridal-connect/db";
import Redis from "ioredis";
import { JWT } from "@fastify/jwt";
import { Server } from "socket.io";

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
        redis: Redis;
        authenticate: any;
        jwt: JWT;
        io: Server;
    }
}
