import { FastifyInstance } from "fastify";

export default async function messagesRoutes(fastify: FastifyInstance) {
    fastify.get("/conversations/:userId", async (request: any) => {
        const { userId } = request.params;
        return fastify.prisma.conversation.findMany({
            where: {
                participants: { some: { id: userId } }
            },
            include: {
                participants: {
                    include: { profile: true }
                },
                messages: {
                    take: 1,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    });

    fastify.get("/:convoId", async (request: any) => {
        const { convoId } = request.params;
        return fastify.prisma.message.findMany({
            where: { conversationId: convoId },
            orderBy: { createdAt: 'asc' }
        });
    });

    fastify.post("/", async (request: any) => {
        const { conversationId, senderId, text } = request.body;
        const message = await fastify.prisma.message.create({
            data: {
                conversationId,
                senderId,
                text
            }
        });

        await fastify.prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });

        return message;
    });
}
