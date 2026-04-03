import { FastifyInstance } from "fastify";
import axios from "axios";

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

        // SMS INTEGRATION (Twilio)
        const sid = process.env.TWILIO_ACCOUNT_SID;
        const token = process.env.TWILIO_AUTH_TOKEN;
        const from = process.env.TWILIO_PHONE_NUMBER;

        if (sid && token && from) {
            try {
                const auth = Buffer.from(`${sid}:${token}`).toString('base64');
                const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

                await axios.post(twilioUrl,
                    new URLSearchParams({
                        To: `+91${phone}`,
                        From: from,
                        Body: `Your Elite Bridal verification code is: ${otp}. Valid for 10 minutes. 💍`
                    }).toString(),
                    {
                        headers: {
                            'Authorization': `Basic ${auth}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );
                console.log(`[AUTH] SMS sent to ${phone} via Twilio`);
            } catch (err: any) {
                console.error(`[ERROR] Twilio Failed: ${err.response?.data?.message || err.message}`);
            }
        } else {
            console.log(`[DEBUG] SMS credentials missing. Logging OTP for +91${phone}: ${otp}`);
        }

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
