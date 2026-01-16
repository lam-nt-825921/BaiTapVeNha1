"use server";
import { Post } from "@/types/types";
import { CreatePostRequest, PostListQueryParams } from "../types/type";
import { api, buildQueryString } from "../../../lib/api";


export async function getPosts(queryParams: PostListQueryParams = {}) {
    const queryString = buildQueryString(queryParams);
    const response = await api.get<Post[]>(`/posts${queryString}`);
    return response;
}

export async function getPost(id: string) {
    const response = await api.get<Post>(`/posts/${id}`);
    return response;
}

export async function createPost(request: CreatePostRequest) {
    const response = await api.post<Post>(`/posts`, request);
    return response;
}