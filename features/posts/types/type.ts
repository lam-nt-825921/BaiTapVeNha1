

// các định dạng thuần xử lý ở frontend
export type PostListOptions = {
    limit?: number;
    sort?: 'asc' | 'desc';
}

// tham số của các định dạng cần gửi đến backend
export type PostListQueryParams = {
    query?: string;
}