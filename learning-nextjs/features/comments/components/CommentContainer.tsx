import { useState, useCallback, useMemo } from "react";
import CommentCard from "./CommentCard";
import { useComments, useUpdateComment } from "../hooks/useComments";
import { useUserStore } from "@/stores/userStore";
import { Button } from "@/components/ui";

export interface CommentContainerProps {
    postId: string;
}

export default function CommentContainer({ postId }: CommentContainerProps) {
    const { comments, loading, error, setComments } = useComments(postId);
    const { updateComment, updating, updateError } = useUpdateComment();
    const user = useUserStore((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);

    const handleConfirmEdit = useCallback(
        async (id: number, newBody: string) => {
            const updated = await updateComment(id, newBody);
            setComments((prev) =>
                prev.map((comment) =>
                    comment.id === updated.id ? updated : comment
                )
            );
        },
        [setComments, updateComment]
    );

    // Memoize isOwner calculation to avoid recalculating on every render
    const ownerMap = useMemo(() => {
        const userEmail = user?.email;
        if (!userEmail) return new Set<number>();
        return new Set(
            comments
                .filter((c) => c.email === userEmail)
                .map((c) => c.id)
        );
    }, [comments, user?.email]);

    const commentCountLabel =
        comments.length === 0
            ? "No comments yet"
            : comments.length === 1
            ? "1 comment"
            : `${comments.length} comments`;

    return (
        <section className="mt-10 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Comments
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {commentCountLabel}
                    </p>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? "Hide comments" : "Show comments"}
                </Button>
            </div>

            {/* Content */}
            {isOpen && (
                <div className="space-y-4 px-6 py-5 text-sm text-gray-700 dark:text-gray-300">
                    {loading && (
                        <p className="text-gray-500 dark:text-gray-400">
                            Loading comments...
                        </p>
                    )}

                    {error && (
                        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                            Error loading comments: {error}
                        </p>
                    )}

                    {comments.length > 0 ? (
                        <ul className="space-y-3">
                            {comments.map((comment) => (
                                <li key={comment.id}>
                                    <CommentCard
                                        comment={comment}
                                        isOwner={ownerMap.has(comment.id)}
                                        onConfirmEdit={handleConfirmEdit}
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !loading &&
                        !error && (
                            <p className="text-gray-500 dark:text-gray-400">
                                No comments found for this post.
                            </p>
                        )
                    )}

                    {updating && (
                        <p className="text-gray-500 dark:text-gray-400">
                            Updating comment...
                        </p>
                    )}

                    {updateError && (
                        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                            Error updating comment: {updateError}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
