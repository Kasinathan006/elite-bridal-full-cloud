export const postsQueue = null;

export async function addPostToFanout(postId: string, authorId: string) {
    console.log(`[MOCK QUEUE] Dispatching fan-out for post ${postId}`);
}
