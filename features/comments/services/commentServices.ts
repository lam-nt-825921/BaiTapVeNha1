import { api } from "@/lib/api";
import { Comment } from "@/types/types";

export async function getComments(postId: string) {
    const response = await api.get<Comment[]>(`/comments?postId=${postId}`);
    return response;
}

export async function updateComment(commentId: number, body: string) {
    const response = await api.put<Comment>(`/comments/${commentId}`, { body });
    return response;
}