import { FastifyInstance } from "fastify";

export default async function profilesRoutes(fastify: FastifyInstance) {
    fastify.get("/", async (request) => {
        const query = request.query as any;
        return fastify.prisma.profile.findMany({
            where: {
                city: query.city ? { contains: query.city } : undefined,
                specializations: query.tag ? { contains: query.tag } : undefined,
            },
            include: {
                portfolioPhotos: {
                    where: { isFeature: true },
                    take: 1
                }
            }
        });
    });

    fastify.get("/:id", async (request: any) => {
        const { id } = request.params;
        return fastify.prisma.profile.findUnique({
            where: { id },
            include: {
                portfolioPhotos: true,
                user: true,
                reviewsReceived: { include: { reviewer: true } },
                collabProjects: { include: { projectCard: { include: { photos: true } } } }
            }
        });
    });

    fastify.get("/username/:username", async (request: any, reply) => {
        const { username } = request.params;
        const profile = await fastify.prisma.profile.findUnique({
            where: { username },
            include: {
                portfolioPhotos: true,
                user: true,
                reviewsReceived: { include: { reviewer: true } },
                followedBy: true,
                following: true,
                posts: {
                    take: 10,
                    orderBy: { createdAt: 'desc' },
                    include: { reactions: true, comments: true }
                }
            }
        });
        if (!profile) return reply.status(404).send({ error: "Profile not found" });
        return profile;
    });

    fastify.post("/:id/follow", async (request: any) => {
        const { id } = request.params;
        const { followerId } = request.body;

        const existing = await fastify.prisma.follow.findUnique({
            where: { followerId_followingId: { followerId, followingId: id } }
        });

        if (existing) {
            await fastify.prisma.follow.delete({
                where: { followerId_followingId: { followerId, followingId: id } }
            });
            return { following: false };
        } else {
            await fastify.prisma.follow.create({
                data: { followerId, followingId: id }
            });
            return { following: true };
        }
    });

    // Crews
    fastify.post("/crews", async (request: any) => {
        const { name, leadProfileId } = request.body;
        return fastify.prisma.crew.create({
            data: {
                name,
                leadProfileId,
                members: {
                    create: { profileId: leadProfileId, role: 'Lead Artist', status: 'ACCEPTED' }
                }
            }
        });
    });

    fastify.get("/crews/:id", async (request: any) => {
        const { id } = request.params;
        return fastify.prisma.crew.findUnique({
            where: { id },
            include: {
                members: { include: { profile: true } },
                leadProfile: true
            }
        });
    });
}
