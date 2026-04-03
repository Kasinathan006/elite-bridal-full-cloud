import { FastifyInstance } from "fastify";

export default async function notificationsRoutes(fastify: FastifyInstance) {
    fastify.get("/:userId", async (request: any) => {
        const { userId } = request.params;
        return fastify.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    });

    fastify.patch("/:id/read", async (request: any) => {
        const { id } = request.params;
        return fastify.prisma.notification.update({
            where: { id },
            data: { isRead: true }
        });
    });
}
