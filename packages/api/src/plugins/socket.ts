import fp from "fastify-plugin";
import { Server } from "socket.io";

declare module 'fastify' {
    interface FastifyInstance {
        io: Server;
    }
}

export default fp(async (fastify) => {
    const io = new Server(fastify.server, {
        cors: { origin: "*" },
    });

    fastify.decorate("io", io);

    io.on("connection", (socket) => {
        console.log(`[SOCKET] Peer connected: ${socket.id}`);

        socket.on("join-room", (userId) => {
            socket.join(userId);
            console.log(`[SOCKET] User ${userId} joined their secure room`);
        });

        socket.on("disconnect", () => {
            console.log(`[SOCKET] Peer disconnected: ${socket.id}`);
        });
    });

    fastify.addHook("onClose", async () => {
        io.close();
    });
});
