import { PostListOptions } from "../types/type";
import {Post} from "@/types/types"

export function processPostList(posts: Post[], options: PostListOptions) : Post[] {
    let returnedPosts = [...posts] as Post[];
    if (options.limit) {
        returnedPosts = returnedPosts.slice(0, options.limit);
    }
    if (options.sort) {
        returnedPosts = returnedPosts.sort((a, b) => {
            if (options.sort === 'asc') {
                return a.id - b.id;
            }
            return b.id - a.id;
        });
    }
    return returnedPosts;
}