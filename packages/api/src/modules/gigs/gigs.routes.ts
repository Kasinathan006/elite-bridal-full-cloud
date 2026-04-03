import { FastifyInstance } from "fastify";

export default async function gigsRoutes(fastify: FastifyInstance) {
    // Post a new wedding gig
    fastify.post("/", async (request: any) => {
        const { creatorId, title, description, location, date, budget } = request.body;
        return fastify.prisma.gig.create({
            data: {
                creatorId,
                title,
                description,
                location,
                date: new Date(date),
                budget: parseFloat(budget),
                status: 'OPEN'
            }
        });
    });

    // List all open gigs (Job Board)
    fastify.get("/", async () => {
        return fastify.prisma.gig.findMany({
            where: { status: 'OPEN' },
            include: { creator: true },
            orderBy: { createdAt: 'desc' }
        });
    });

    // My posted gigs
    fastify.get("/my/:userId", async (request: any) => {
        const { userId } = request.params;
        return fastify.prisma.gig.findMany({
            where: { creatorId: userId },
            orderBy: { date: 'asc' }
        });
    });

    // Update Gig status
    fastify.patch("/:id/status", async (request: any) => {
        const { id } = request.params;
        const { status } = request.body;
        return fastify.prisma.gig.update({
            where: { id },
            data: { status }
        });
    });
}
