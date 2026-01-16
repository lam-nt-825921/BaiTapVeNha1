"use client";
import { Album } from "@/types/types";
import Link from "next/link";

export interface AlbumsCardProps {
    album: Album;
}

export default function AlbumsCard({ album }: AlbumsCardProps) {
    return (
        <div 
            className="border-2 border-gray-300 rounded-md p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer bg-white"
            style={{ minHeight: "120px" }}
        >
            <Link href={`/albums/${album.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "500" }}>
                    {album.title}
                </h2>
                <p style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
                    Album #{album.id}
                </p>
            </Link>
        </div>
    );
}