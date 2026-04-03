import { FastifyInstance } from "fastify";

export default async function authRoutes(fastify: FastifyInstance) {
    // SECURITY: Use Redis for OTP storage to survive restarts and enable distributed rate limiting

    fastify.post("/send-otp", async (request: any, reply) => {
        const { phone } = request.body;
        if (!phone) return reply.status(400).send({ error: "Phone required" });

        // SECURITY: Simple Rate Limiting (max 3 every 5 mins per phone)
        const rateLimitKey = `rl:otp:${phone}`;
        const count = await fastify.redis.incr(rateLimitKey);
        if (count === 1) await fastify.redis.expire(rateLimitKey, 300); // 5 mins

        if (count > 3) {
            return reply.status(429).send({
                success: false,
                error: "Too many attempts. Please try again in 5 minutes."
            });
        }

        // Generate real 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store in Redis with 10 min expiry
        await fastify.redis.set(`otp:${phone}`, otp, "EX", 600);

        // TODO: Integrate MSG91 / Twilio SMS API here
        console.log(`[SECURITY] Anti-Spam Check Passed. OTP for ${phone}: ${otp}`);

        return { success: true, message: "OTP sent" };
    });

    fastify.post("/verify-otp", async (request: any, reply) => {
        const { phone, otp } = request.body;

        const storedOtp = await fastify.redis.get(`otp:${phone}`);

        if (!storedOtp || storedOtp !== otp) {
            return reply.status(401).send({ success: false, error: "Invalid or expired OTP" });
        }

        // OTP verified - delete immediately for one-time use security
        await fastify.redis.del(`otp:${phone}`);

        let user = await fastify.prisma.user.findUnique({
            where: { phone },
            include: { profile: true }
        });

        if (!user) {
            // First time logic, handled gracefully
            user = await fastify.prisma.user.create({
                data: {
                    phone,
                    role: "CLIENT",
                    profile: {
                        create: {
                            username: `client_${Date.now()}`,
                            displayName: `New User`,
                            city: "Unknown"
                        }
                    }
                },
                include: { profile: true }
            });
        }

        const token = fastify.jwt.sign({ userId: user.id, phone, role: user.role });
        return { success: true, token, user };
    });

    fastify.post("/register", async (request: any, reply) => {
        const { phone, profile } = request.body;

        if (!phone || !profile || !profile.displayName || !profile.city) {
            return reply.status(400).send({ success: false, error: "Incomplete registration data" });
        }

        // Ensure user doesn't already exist or update if they do
        const user = await fastify.prisma.user.upsert({
            where: { phone },
            update: {
                role: "ARTIST",
            },
            create: {
                phone,
                role: "ARTIST",
                profile: {
                    create: {
                        username: `artist_${Date.now()}`,
                        displayName: profile.displayName,
                        city: profile.city,
                        specializations: profile.specializations
                    }
                }
            },
            include: { profile: true }
        });

        // Update profile in case the user was already created as CLIENT
        if (user.profile) {
            await fastify.prisma.profile.update({
                where: { id: user.profile.id },
                data: {
                    displayName: profile.displayName,
                    city: profile.city,
                    specializations: profile.specializations
                }
            });
        }

        const token = fastify.jwt.sign({ userId: user.id, phone, role: user.role });
        return { success: true, token, user };
    });
}
