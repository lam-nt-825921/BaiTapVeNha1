"use client";

import { useState, useEffect } from "react";
import { getAlbums } from "@/features/albums/services/albumServices";
import AlbumsCard from "@/features/albums/components/AlbumsCard";
import { Album } from "@/types/types";
import { Button } from "@/components/ui";

export default function AlbumsPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const reloadData = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getAlbums();
                setAlbums(data);
            } catch (err) {
                setError("Failed to load albums");
                console.error("Error fetching albums:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshKey]);

    if (loading && albums.length === 0) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Albums</h1>
                <div>Loading albums...</div>
            </div>
        );
    }

    if (error && albums.length === 0) {
        return (
            <div style={{ padding: "2rem" }}>
                <h1>Albums</h1>
                <div style={{ color: "red", marginBottom: "1rem" }}>Error: {error}</div>
                <Button onClick={reloadData}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-5 lg:px-6 xl:px-8 2xl:px-12 bg-slate-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Albums ({albums.length})
                </h1>
                <button
                    onClick={reloadData}
                    disabled={loading}
                    className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg bg-white cursor-pointer text-lg text-slate-600 opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 disabled:hover:bg-white disabled:hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-700"
                    aria-label={loading ? "Reloading" : "Reload albums"}
                    title={loading ? "Reloading..." : "Reload"}
                >
                    {loading ? "⟳" : "↻"}
                </button>
            </div>
            
            {albums.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-slate-600 dark:text-slate-400 mb-4">No albums found.</p>
                    <Button onClick={reloadData}>Load Albums</Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {albums.map((album) => (
                        <AlbumsCard key={album.id} album={album} />
                    ))}
                </div>
            )}
        </div>
    );
}
