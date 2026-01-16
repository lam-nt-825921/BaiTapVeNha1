import { api } from "@/lib/api";
import {Album, Photo} from "@/types/types";

export async function getAlbums() {
    const response = await api.get<Album[]>("/albums");
    return response;
}

export async function getAlbum(id: string) {
    const response = await api.get<Album>(`/albums/${id}`);
    return response;
}

export async function createAlbum(album: Album) {
    const response = await api.post<Album>("/albums", album);
    return response;
}

export async function updateAlbum(id: string, album: Album) {
    const response = await api.put<Album>(`/albums/${id}`, album);
    return response;
}

export async function deleteAlbum(id: string) {
    const response = await api.delete<Album>(`/albums/${id}`);
    return response;
}



