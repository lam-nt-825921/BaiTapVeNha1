import { api } from "@/lib/api";
import { Photo } from "@/types/types";
import { editPhotoRequest, createPhotoRequest } from "@/features/albums/types/types";

export async function getPhotos(albumId: string) {
    const response = await api.get<Photo[]>(`/photos?albumId=${albumId}`);
    return response;
}

export async function getPhoto(id: string) {
    const response = await api.get<Photo>(`/photos/${id}`);
    return response;
}

export async function createPhoto(photo: createPhotoRequest) {
    const response = await api.post<Photo>("/photos", photo);
    return response;
}

export async function updatePhoto(id: string, photo: editPhotoRequest) {
    const response = await api.put<Photo>(`/photos/${id}`, photo);
    return response;
}

export async function deletePhoto(id: string) {
    const response = await api.delete<Photo>(`/photos/${id}`);
    return response;
}