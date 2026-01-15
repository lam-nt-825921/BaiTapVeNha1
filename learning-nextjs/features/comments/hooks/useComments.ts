import { useEffect, useState, useCallback } from "react";
import { Comment } from "@/types/types";
import { getComments, updateComment as updateCommentApi } from "../services/commentServices";

export function useComments(postId: string) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        let cancelled = false;
        
        const fetchComments = async () => {
            setLoading(true);
            setError(null);
            try {
                const commentsData = await getComments(postId);
                if (!cancelled) {
                    setComments(commentsData);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("Error fetching comments:", error);
                    setError("Failed to load comments. Please try again.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchComments();

        return () => {
            cancelled = true;
        };
    }, [postId]);

    return { comments, loading, error, setComments };
}

export function useUpdateComment() {
    const [updating, setUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const updateComment = useCallback(async (id: number, body: string) => {
        setUpdating(true);
        setUpdateError(null);
        try {
            const updatedComment = await updateCommentApi(id, body);
            return updatedComment;
        } catch (error) {
            console.error("Error updating comment:", error);
            setUpdateError("Failed to update comment. Please try again.");
            throw error;
        } finally {
            setUpdating(false);
        }
    }, []);

    return { updateComment, updating, updateError };
}