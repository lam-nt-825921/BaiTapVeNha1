"use client";

import {use,  useState, useCallback, useEffect} from "react";
import { getPost } from "@/features/posts/services/postServices";
import { Post } from "@/types/types";


export interface PostDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
    const { id } = use(params);
    const [post, setPost] = useState<Post | null>(null);

    const fetchPost = useCallback(async () => {
        const post = await getPost(id);
        setPost(post);
    }, [id]);

    
    
    return (
        <div>
            <h1>Post Detail</h1>
            <p>{id}</p>
            <p>{post?.title}</p>
            <p>{post?.body}</p>
        </div>
    );
}