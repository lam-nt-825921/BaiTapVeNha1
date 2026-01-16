
export type editPhotoRequest = {
    title?: string;
    url?: string;
    thumbnailUrl?: string;
}

export type createPhotoRequest = {
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}
