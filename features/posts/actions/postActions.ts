import { CreatePostRequest } from "../types/type";
import { createPostSchema } from "../schemas/postSchemas";
import { createPost } from "../services/postServices";
import { Post } from "@/types/types";

export interface CreatePostState {
    error: string | null;
    success: boolean;
    post: Post | null;
}

export async function createPostAction(prevState: CreatePostState, formData: FormData): Promise<CreatePostState> {
    const raw = {
        title: formData.get("title"),
        body: formData.get("body"),
    };
    const parsed = createPostSchema.safeParse(raw);
    if (!parsed.success) {
        return { error: parsed.error.message, success: false, post: null };
    }
    const request: CreatePostRequest = { title: parsed.data.title, body: parsed.data.body };
    try {
        const response = await createPost(request);
        return { error: null, success: true, post: response };

    } catch (error) {
        console.error(error);
        return { error: "Lỗi khi tạo bài viết", success: false, post: null };
    }
}