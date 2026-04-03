import { FastifyInstance } from "fastify";

export default async function searchRoutes(fastify: FastifyInstance) {
    fastify.get("/profiles", async (request) => {
        const query = request.query as any;
        const { q, city, specialization, priceMin, priceMax } = query;

        return fastify.prisma.profile.findMany({
            where: {
                AND: [
                    city ? { city: { contains: city, mode: 'insensitive' } } : {},
                    specialization ? { specializations: { contains: specialization, mode: 'insensitive' } } : {},
                    q ? {
                        OR: [
                            { displayName: { contains: q, mode: 'insensitive' } },
                            { bio: { contains: q, mode: 'insensitive' } },
                            { tagline: { contains: q, mode: 'insensitive' } },
                        ]
                    } : {},
                    priceMin ? { basePrice: { gte: parseFloat(priceMin) } } : {},
                    priceMax ? { basePrice: { lte: parseFloat(priceMax) } } : {},
                ]
            },
            include: {
                portfolioPhotos: {
                    where: { isFeature: true },
                    take: 1
                },
                reviewsReceived: true,
            },
            orderBy: {
                avgRating: 'desc'
            }
        });
    });

    fastify.get("/trending", async () => {
        return fastify.prisma.profile.findMany({
            take: 6,
            orderBy: [
                { followerCount: 'desc' },
                { avgRating: 'desc' }
            ],
            include: {
                portfolioPhotos: { where: { isFeature: true }, take: 1 }
            }
        });
    });
}

