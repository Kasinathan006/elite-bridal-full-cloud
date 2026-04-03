import { FastifyInstance } from "fastify";
import { addPostToFanout } from "../../queues/posts.queue";

export default async function postsRoutes(fastify: FastifyInstance) {
    fastify.get("/", async () => {
        return fastify.prisma.post.findMany({
            include: {
                author: { include: { portfolioPhotos: { take: 1 } } },
                comments: { include: { author: true } },
                reactions: true
            },
            orderBy: { createdAt: 'desc' }
        });
    });

    fastify.post("/", async (request: any) => {
        const { authorId, content, image } = request.body;
        const post = await fastify.prisma.post.create({
            data: { authorId, content, image }
        });

        // Add to fan-out queue (background fail-safe)
        try {
            await addPostToFanout(post.id, authorId);
        } catch (queueErr) {
            fastify.log.error(`Queue Fanout Failed: ${queueErr.message}`);
        }

        return post;
    });

    fastify.post("/:id/react", async (request: any) => {
        const { id } = request.params;
        const { authorId, type } = request.body;
        return fastify.prisma.postReaction.upsert({
            where: { postId_authorId: { postId: id, authorId } },
            create: { postId: id, authorId, type },
            update: { type }
        });
    });

    fastify.post("/:id/comment", async (request: any) => {
        const { id } = request.params;
        const { authorId, text } = request.body;
        return fastify.prisma.comment.create({
            data: { postId: id, authorId, text }
        });
    });
}
