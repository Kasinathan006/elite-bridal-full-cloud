import { FastifyInstance } from "fastify";

export default async function bookingsRoutes(fastify: FastifyInstance) {
    // Create new Inquiry
    fastify.post("/", async (request: any) => {
        const { artistProfileId, clientId, date, eventType, budget, message } = request.body;
        return fastify.prisma.booking.create({
            data: {
                artistProfileId,
                clientId,
                date: new Date(date),
                eventType,
                budget: parseFloat(budget),
                message,
                status: 'INQUIRY'
            }
        });
    });

    // Artist accepts/rejects
    fastify.patch("/:id/status", async (request: any) => {
        const { id } = request.params;
        const { status } = request.body; // ACCEPTED, REJECTED, CANCELLED
        return fastify.prisma.booking.update({
            where: { id },
            data: { status }
        });
    });

    // Client pays deposit (Simulated Razorpay logic)
    fastify.post("/:id/pay-deposit", async (request: any) => {
        const { id } = request.params;
        const booking = await fastify.prisma.booking.findUnique({ where: { id } });
        if (!booking) throw new Error("Booking not found");

        const depositAmount = (booking.budget || 0) * 0.30; // 30% Deposit

        // Razorpay Order ID Creation would go here
        // For now, we simulate success
        return fastify.prisma.booking.update({
            where: { id },
            data: {
                status: 'DEPOSIT_PAID',
                depositPaid: depositAmount
            }
        });
    });

    // Final Completion
    fastify.patch("/:id/complete", async (request: any) => {
        const { id } = request.params;
        return fastify.prisma.booking.update({
            where: { id },
            data: { status: 'COMPLETED' }
        });
    });

    // CRM / Kanban fetch
    fastify.get("/crm/:profileId", async (request: any) => {
        const { profileId } = request.params;
        const bookings = await fastify.prisma.booking.findMany({
            where: { artistProfileId: profileId },
            include: { client: true },
            orderBy: { date: 'asc' }
        });

        // Group by status for Kanban view
        return {
            inquiries: bookings.filter(b => b.status === 'INQUIRY'),
            active: bookings.filter(b => b.status === 'ACCEPTED' || b.status === 'DEPOSIT_PAID'),
            completed: bookings.filter(b => b.status === 'COMPLETED')
        };
    });
}

