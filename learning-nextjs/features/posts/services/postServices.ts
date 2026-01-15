"use server";
import { Post } from "@/types/types";
import { PostListQueryParams } from "../types/type";
import { api, buildQueryString } from "../../../lib/api";


export async function getMockPosts(queryParams: PostListQueryParams = {}) {
    const queryString = buildQueryString(queryParams);
    const response = await api.get<Post[]>(`/posts${queryString}`);
    return response;
}

export async function getPost(id: string) {
    const response = await api.get<Post>(`/posts/${id}`);
    return response;
}