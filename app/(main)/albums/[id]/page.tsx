"use client";
import AlbumDetail from "@/features/albums/components/AlbumDetail";
import { use, useEffect, useState, useCallback } from "react";
import {getAlbum} from "@/features/albums/services/albumServices";
import {getPhotos} from "@/features/albums/services/photoServices";
import { Album, Photo } from "@/types/types";
import { Button } from "@/components/ui";

export interface AlbumDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function AlbumDetailPage({ params }: AlbumDetailPageProps) {
    const { id } = use(params);
    const [album, setAlbum] = useState<Album | null>(null);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Refresh key để trigger reload khi click nút
    const [refreshKey, setRefreshKey] = useState(0);

    // Function để reload data - có thể gọi từ button hoặc nơi khác
    const reloadData = useCallback(() => {
        setRefreshKey(prev => prev + 1); // Trigger reload bằng cách update refreshKey
    }, []);

    // Handler để reload photos sau khi update/delete
    const handlePhotoUpdate = useCallback(() => {
        setRefreshKey(prev => prev + 1); // Trigger reload
    }, []);

    useEffect(() => {
        // Tạo async function bên trong effect
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch cả hai dữ liệu song song
                const [albumData, photosData] = await Promise.all([
                    getAlbum(id),
                    getPhotos(id)
                ]);
                
                setAlbum(albumData);
                setPhotos(photosData);
            } catch (err) {
                setError("Failed to load album data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Effect sẽ chạy lại khi id thay đổi HOẶC refreshKey thay đổi (khi click reload)
    }, [id, refreshKey]);

    if (loading && !album) {
        return (
            <div>
                <div>Loading album...</div>
                <Button onClick={reloadData} disabled={loading}>
                    Reload
                </Button>
            </div>
        );
    }

    if (error || !album) {
        return (
            <div>
                <div>Error: {error || "Album not found"}</div>
                <Button onClick={reloadData}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-5 lg:px-6 xl:px-8 2xl:px-12 bg-slate-100 min-h-screen">
            <AlbumDetail 
                album={album} 
                photos={photos}
                onPhotoUpdate={handlePhotoUpdate}
            />
        </div>
    );
}