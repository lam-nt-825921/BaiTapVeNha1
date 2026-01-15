/**
 * API Client chung cho toàn bộ ứng dụng
 * Base URL lấy từ .env: NEXT_PUBLIC_API_URL
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://jsonplaceholder.typicode.com";

// ========================================
// TYPES
// ========================================
type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    headers?: Record<string, string>;
    cache?: RequestCache;
    revalidate?: number;
    tags?: string[];
};

export type ApiError = {
    message: string;
    status: number;
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Build query string từ object params
 * { search: "hello", page: 2 } → "?search=hello&page=2"
 */
export function buildQueryString(params: Record<string, unknown>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
}

// ========================================
// API CLIENT
// ========================================

/**
 * Wrapper cho fetch API
 * - Tự động thêm base URL
 * - Tự động thêm headers
 * - Tự động handle errors
 * - Tự động parse JSON
 */
export async function apiClient<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const {
        method = "GET",
        body,
        headers = {},
        cache,
        revalidate,
        tags,
    } = options;

    const url = `${API_URL}${endpoint}`;

    const fetchOptions: RequestInit & { next?: { revalidate?: number; tags?: string[] } } = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    // Body cho POST, PUT, PATCH
    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    // Cache options
    if (cache) {
        fetchOptions.cache = cache;
    }

    // Next.js specific options
    if (revalidate !== undefined || tags) {
        fetchOptions.next = {};
        if (revalidate !== undefined) {
            fetchOptions.next.revalidate = revalidate;
        }
        if (tags) {
            fetchOptions.next.tags = tags;
        }
    }

    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
        const error: ApiError = {
            message: `API Error: ${res.statusText}`,
            status: res.status,
        };
        throw error;
    }

    // Handle empty response (204 No Content)
    if (res.status === 204) {
        return {} as T;
    }

    return res.json();
}

// ========================================
// SHORTHAND METHODS
// ========================================

export const api = {
    /**
     * GET request
     * @example api.get<Post[]>("/posts")
     * @example api.get<Post>("/posts/1", { revalidate: 60 })
     */
    get: <T>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
        apiClient<T>(endpoint, { ...options, method: "GET" }),

    /**
     * POST request
     * @example api.post<Post>("/posts", { title: "New Post" })
     */
    post: <T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
        apiClient<T>(endpoint, { ...options, method: "POST", body }),

    /**
     * PUT request (replace entire resource)
     * @example api.put<Post>("/posts/1", { title: "Updated", body: "..." })
     */
    put: <T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
        apiClient<T>(endpoint, { ...options, method: "PUT", body }),

    /**
     * PATCH request (partial update)
     * @example api.patch<Post>("/posts/1", { title: "Updated Title" })
     */
    patch: <T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, "method" | "body">) =>
        apiClient<T>(endpoint, { ...options, method: "PATCH", body }),

    /**
     * DELETE request
     * @example api.delete("/posts/1")
     */
    delete: <T>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) =>
        apiClient<T>(endpoint, { ...options, method: "DELETE" }),
};

