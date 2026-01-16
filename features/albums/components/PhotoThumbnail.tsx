"use client";
import { Photo } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export interface PhotoThumbnailProps {
    photo: Photo;
    width: number;
    height: number;
    isEditable?: boolean;
    onClick?: (photo: Photo) => void;
    onDelete?: () => void;
    onEdit?: () => void;
}

export default function PhotoThumbnail({ 
    photo, 
    width, 
    height, 
    isEditable, 
    onClick, 
    onDelete, 
    onEdit 
}: PhotoThumbnailProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        // Chỉ trigger onClick nếu không click vào button hoặc overlay
        const target = e.target as HTMLElement;
        if (target.closest('.action-overlay')) return;
        if (onClick) {
            onClick(photo);
        }
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit?.();
    };

    return (
        <div 
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: "relative",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: onClick ? "pointer" : "default",
                transition: "transform 0.2s, box-shadow 0.2s",
                backgroundColor: "white"
            }}
            className="thumbnail-container"
        >
            <div style={{ position: "relative", width: "100%", aspectRatio: "1" }}>
                <Image 
                    src={`https://picsum.photos/${width}/${height}`} 
                    alt={photo.title} 
                    width={width} 
                    height={height}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "filter 0.2s"
                    }}
                />
                
                {/* Hover Overlay với action buttons */}
                {isEditable && isHovered && (
                    <div 
                        className="action-overlay"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.5rem",
                            transition: "opacity 0.2s"
                        }}
                    >
                        <button
                            onClick={handleEdit}
                            style={{
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                borderRadius: "50%",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "18px",
                                transition: "transform 0.2s",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                            aria-label="Edit photo"
                            title="Edit"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={handleDelete}
                            style={{
                                width: "36px",
                                height: "36px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                borderRadius: "50%",
                                backgroundColor: "#f44336",
                                color: "white",
                                cursor: "pointer",
                                fontSize: "18px",
                                transition: "transform 0.2s",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.1)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                            aria-label="Delete photo"
                            title="Delete"
                        >
                            🗑️
                        </button>
                    </div>
                )}
            </div>
            
            <div style={{ padding: "0.75rem" }}>
                <h3 style={{ 
                    margin: 0, 
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>
                    {photo.title}
                </h3>
            </div>
        </div>
    );
}