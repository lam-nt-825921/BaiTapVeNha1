"use client";

import { useState } from "react";
import { Comment } from "@/types/types";
import { Button } from "@/components/ui";

export interface CommentCardProps {
    comment: Comment;
    isOwner: boolean;
    onConfirmEdit?: (id: number, newBody: string) => Promise<void> | void;
}

export default function CommentCard({
    comment,
    isOwner,
    onConfirmEdit,
}: CommentCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [draftBody, setDraftBody] = useState(comment.body);

    const handleSave = async () => {
        if (!onConfirmEdit) return;
        await onConfirmEdit(comment.id, draftBody);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setDraftBody(comment.body);
        setIsEditing(false);
    };

    return (
        <article className="rounded-lg border border-gray-200 bg-gray-50/80 px-4 py-3 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900/40">
            {/* Header: author */}
            <div className="mb-2 flex items-baseline justify-between gap-3">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {comment.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.email}
                    </p>
                </div>
                {isOwner && !isEditing && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        You
                    </span>
                )}
            </div>

            {/* Body / Editor */}
            {isEditing ? (
                <div className="space-y-3">
                    <textarea
                        className="min-h-[80px] w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                        value={draftBody}
                        onChange={(e) => setDraftBody(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    {comment.body}
                </p>
            )}

            {/* Actions */}
            {isOwner && !isEditing && (
                <div className="mt-2 flex justify-end">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </Button>
                </div>
            )}
        </article>
    );
}