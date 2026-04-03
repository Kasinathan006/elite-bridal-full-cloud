import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

export default fp(async (fastify) => {
    fastify.register(jwt, {
        secret: process.env.JWT_SECRET || "supersecret",
    });

    fastify.register(cookie, {
        secret: "cookie-secret",
        parseOptions: {},
    });

    fastify.decorate("authenticate", async (request: any, reply: any) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });
});
