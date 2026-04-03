import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
    host: process.env.MEILI_HOST || "http://localhost:7700",
    apiKey: process.env.MEILI_MASTER_KEY || "masterKey",
});

export const profileIndex = client.index("profiles");
export const postIndex = client.index("posts");

export async function syncProfileToMeili(profile: any) {
    try {
        await profileIndex.addDocuments([
            {
                id: profile.id,
                displayName: profile.displayName,
                city: profile.city,
                specializations: profile.specializations,
                bio: profile.bio,
            },
        ]);
    } catch (error) {
        console.error("MeiliSearch Profile Sync Failed:", error);
    }
}
