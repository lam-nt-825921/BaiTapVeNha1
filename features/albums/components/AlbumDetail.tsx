"use client";

import { Album, Photo } from "@/types/types";
import PhotoThumbnail from "./PhotoThumbnail";
import PhotoDisplay from "./PhotoDisplay";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { deletePhoto, updatePhoto } from "@/features/albums/services/photoServices";
import DropdownMenu from "./DropdownMenu";

export interface AlbumDetailProps {
    album: Album;
    photos: Photo[];
    isEditable?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onPhotoUpdate?: () => void; // Callback để reload photos sau khi update/delete
}

export default function AlbumDetail({ album, photos, isEditable = false, onDelete, onEdit, onPhotoUpdate }: AlbumDetailProps) {
    const router = useRouter();
    const [isDisplayPhoto, setIsDisplayPhoto] = useState(false);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

    // Tìm photo hiện tại dựa vào index
    const selectedPhoto = photos[selectedPhotoIndex] || null;

    // Handler để mở PhotoDisplay
    const handleThumbnailClick = useCallback((photo: Photo) => {
        const index = photos.findIndex(p => p.id === photo.id);
        if (index !== -1) {
            setSelectedPhotoIndex(index);
            setIsDisplayPhoto(true);
        }
    }, [photos]);

    // Handler để quay lại danh sách thumbnails
    const handleBack = useCallback(() => {
        setIsDisplayPhoto(false);
    }, []);

    // Handler để chuyển sang photo tiếp theo
    const handleNext = useCallback(() => {
        setSelectedPhotoIndex(prev => {
            if (prev < photos.length - 1) {
                return prev + 1;
            }
            return 0; // Quay về đầu nếu ở cuối
        });
    }, [photos.length]);

    // Handler để chuyển về photo trước
    const handlePrevious = useCallback(() => {
        setSelectedPhotoIndex(prev => {
            if (prev > 0) {
                return prev - 1;
            }
            return photos.length - 1; // Quay về cuối nếu ở đầu
        });
    }, [photos.length]);

    // Handler để xóa photo
    const handlePhotoDelete = useCallback(async () => {
        if (!selectedPhoto || !isEditable) return;
        
        if (!confirm(`Are you sure you want to delete "${selectedPhoto.title}"?`)) {
            return;
        }

        try {
            await deletePhoto(selectedPhoto.id.toString());
            onPhotoUpdate?.(); // Notify parent để reload
            
            // Nếu còn photos, hiển thị photo tiếp theo hoặc quay lại danh sách
            if (photos.length > 1) {
                const newIndex = selectedPhotoIndex >= photos.length - 1 
                    ? photos.length - 2 
                    : selectedPhotoIndex;
                setSelectedPhotoIndex(newIndex);
            } else {
                setIsDisplayPhoto(false);
            }
        } catch (error) {
            console.error("Failed to delete photo:", error);
            alert("Failed to delete photo");
        }
    }, [selectedPhoto, isEditable, selectedPhotoIndex, photos.length, onPhotoUpdate]);

    // Handler để edit photo
    const handlePhotoEdit = useCallback(async () => {
        if (!selectedPhoto || !isEditable) return;
        
        const newTitle = prompt("Enter new title:", selectedPhoto.title);
        if (!newTitle || newTitle === selectedPhoto.title) return;

        try {
            await updatePhoto(selectedPhoto.id.toString(), { title: newTitle });
            onPhotoUpdate?.(); // Notify parent để reload
        } catch (error) {
            console.error("Failed to update photo:", error);
            alert("Failed to update photo");
        }
    }, [selectedPhoto, isEditable, onPhotoUpdate]);

    // Nếu đang hiển thị PhotoDisplay
    if (isDisplayPhoto && selectedPhoto) {
        return (
            <div>
                <PhotoDisplay 
                    photo={selectedPhoto} 
                    width={800} 
                    height={600} 
                    currentPhotoIndex={selectedPhotoIndex + 1} 
                    totalPhotos={photos.length}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                    isEditable={isEditable}
                    onDelete={handlePhotoDelete}
                    onEdit={handlePhotoEdit}
                    onBack={handleBack}
                />
            </div>
        );
    }

    // Menu items cho album dropdown
    const albumMenuItems = isEditable ? [
        { label: "Edit Album", onClick: () => onEdit?.(), variant: "default" as const },
        { label: "Delete Album", onClick: () => onDelete?.(), variant: "danger" as const }
    ] : [];

    // Hiển thị danh sách thumbnails
    return (
        <div className="py-6">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg bg-white cursor-pointer text-lg text-slate-600 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                    aria-label="Back to albums"
                >
                    ←
                </button>
                
                {isEditable && albumMenuItems.length > 0 && (
                    <DropdownMenu items={albumMenuItems} />
                )}
            </div>
            
            <h1 className="mb-2 text-2xl font-semibold text-slate-900 dark:text-white">{album.title}</h1>
            <p className="text-slate-600 mb-6 text-sm dark:text-slate-400">
                {photos.length} photo{photos.length !== 1 ? 's' : ''}
            </p>
            
            {photos.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                    No photos in this album.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
                    {photos.map((photo) => (
                        <PhotoThumbnail 
                            key={photo.id} 
                            photo={photo} 
                            width={200} 
                            height={200} 
                            onClick={handleThumbnailClick}
                            isEditable={isEditable}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}