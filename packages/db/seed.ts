import { prisma } from './index'

async function main() {
    console.log('🧼 Re-seeding deep bridal ecosystem data...')

    // Cleanup existing data
    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.postReaction.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.post.deleteMany();
    await prisma.review.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.projectCollaborator.deleteMany();
    await prisma.portfolioPhoto.deleteMany();
    await prisma.projectCard.deleteMany();
    await prisma.availabilitySlot.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.crewMember.deleteMany();
    await prisma.crew.deleteMany();
    await prisma.notification.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    // 1. Create Core Artists
    const artist1 = await prisma.user.create({
        data: {
            phone: '9876543210',
            role: 'ARTIST',
            profile: {
                create: {
                    username: 'lakshmistudio',
                    displayName: 'Lakshmi Bridal Studio',
                    bio: 'Award-winning makeup artist in Chennai specialized in South Indian Traditional Bridal looks.',
                    city: 'Chennai',
                    state: 'Tamil Nadu',
                    priceMin: 15000,
                    priceMax: 45000,
                    isVerified: true,
                    specializations: 'Traditional, Airbrush, HD Makeup',
                    portfolioPhotos: {
                        create: [
                            { url: 'https://images.unsplash.com/photo-1594463750939-ebb6bd206637', caption: 'Classic Red Saree Look', isFeature: true },
                            { url: 'https://images.unsplash.com/photo-1621469533420-251c837824b4', caption: 'HD Bridal Finish' }
                        ]
                    }
                }
            }
        },
        include: { profile: true }
    });

    const artist2 = await prisma.user.create({
        data: {
            phone: '9876543211',
            role: 'ARTIST',
            profile: {
                create: {
                    username: 'saraglam',
                    displayName: 'Sara Glam',
                    bio: 'Modern bridal artist focusing on minimalist and western bridal styles.',
                    city: 'Bangalore',
                    state: 'Karnataka',
                    priceMin: 12000,
                    priceMax: 30000,
                    isVerified: true,
                    specializations: 'Minimalist, Western, Glitter',
                    portfolioPhotos: {
                        create: [
                            { url: 'https://images.unsplash.com/photo-1484860137485-966450003f4e', caption: 'Clean Western Look', isFeature: true }
                        ]
                    }
                }
            }
        },
        include: { profile: true }
    });

    const artist3 = await prisma.user.create({
        data: {
            phone: '9876543212',
            role: 'ARTIST',
            profile: {
                create: {
                    username: 'karthikframes',
                    displayName: 'Karthik Frames',
                    bio: 'Elite bridal photographer capturing emotions in their rawest form.',
                    city: 'Chennai',
                    state: 'Tamil Nadu',
                    priceMin: 60000,
                    priceMax: 200000,
                    isVerified: true,
                    specializations: 'Candid, Cinematic, Traditional',
                    portfolioPhotos: {
                        create: [
                            { url: 'https://images.unsplash.com/photo-1519741497674-611481863552', caption: 'The First Glance', isFeature: true }
                        ]
                    }
                }
            }
        },
        include: { profile: true }
    });

    // 2. Create a Bride (Client)
    const bride = await prisma.user.create({
        data: {
            phone: '9000090000',
            role: 'BRIDE',
            profile: {
                create: {
                    username: 'priya_bride',
                    displayName: 'Priya Sharma',
                    bio: 'Getting married in Dec 2026. Looking for a traditional yet modern crew.',
                    city: 'Chennai',
                    state: 'Tamil Nadu'
                }
            }
        },
        include: { profile: true }
    });

    // 3. Create Projects (Galleries)
    if (artist1.profile && artist2.profile && artist3.profile) {
        const project = await prisma.projectCard.create({
            data: {
                title: 'The Royal Mysore Wedding',
                weddingDate: new Date('2026-12-15'),
                location: 'Mysore Palace',
                style: 'Traditional, Luxury',
                createdById: artist1.profile.id,
                photos: {
                    create: [
                        { url: 'https://images.unsplash.com/photo-1595206133361-b1fe343e5e23', profileId: artist1.profile.id, caption: 'Main Ceremony' }
                    ]
                },
                collaborators: {
                    create: [
                        { profileId: artist1.profile.id, role: 'Lead MUA', status: 'ACCEPTED' },
                        { profileId: artist2.profile.id, role: 'Stylist', status: 'ACCEPTED' },
                        { profileId: artist3.profile.id, role: 'Photographer', status: 'ACCEPTED' }
                    ]
                }
            }
        });
    }

    // 4. Create Bookings & Reviews
    if (artist1.profile && bride.profile) {
        const booking = await prisma.booking.create({
            data: {
                artistProfileId: artist1.profile.id,
                clientId: bride.id,
                date: new Date('2026-06-20'),
                status: 'COMPLETED',
                depositAmount: 5000,
            }
        });

        await prisma.review.create({
            data: {
                bookingId: booking.id,
                reviewerId: bride.profile.id,
                revieweeId: artist1.profile.id,
                rating: 5,
                content: 'Lakshmi did an amazing job for my engagement! Exactly the traditional look I wanted.',
                type: 'CLIENT_REVIEW'
            }
        });
    }

    // 5. Create a Conversation
    const conversation = await prisma.conversation.create({
        data: {
            participants: {
                connect: [{ id: artist1.id }, { id: bride.id }]
            },
            messages: {
                create: [
                    { senderId: bride.id, text: 'Hi Lakshmi, are you available for Dec 15th?' },
                    { senderId: artist1.id, text: 'Hello Priya! Yes, I am currently open for that date. Would you like to discuss the look?' }
                ]
            }
        }
    });

    // 6. Create Posts (LinkedIn-style)
    if (artist1.profile && artist2.profile) {
        const post1 = await prisma.post.create({
            data: {
                authorId: artist1.profile.id,
                content: 'Just finished a beautiful traditional look in Chennai. Special thanks to the team for the coordination! #BridalMakeup #TraditionalLook',
                image: 'https://images.unsplash.com/photo-1594463750939-ebb6bd206637?auto=format&fit=crop&w=800',
            }
        });

        await prisma.comment.create({
            data: {
                postId: post1.id,
                authorId: artist2.profile.id,
                text: 'Absolutely stunning work, Lakshmi! The details in the jewelry complement the makeup perfectly.'
            }
        });

        await prisma.postReaction.create({
            data: {
                postId: post1.id,
                authorId: artist2.profile.id,
                type: 'LIKE'
            }
        });
    }

    console.log('✅ Deep seed completed. 3 Artists, 1 Bride, 1 Project, 1 Completed Booking, 1 Active Chat, 1 Post.');
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
