"use client";
import { Photo } from "@/types/types";
import Image from "next/image";
import DropdownMenu from "./DropdownMenu";

export interface PhotoDisplayProps {
    photo: Photo;
    width?: number;
    height?: number;
    currentPhotoIndex: number;
    totalPhotos: number;
    onNext?: () => void;
    onPrevious?: () => void;
    isEditable?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
    onBack?: () => void; // Handler để quay lại danh sách
}

export default function PhotoDisplay({ 
    photo, 
    width = 800, 
    height = 600, 
    currentPhotoIndex, 
    totalPhotos, 
    onNext, 
    onPrevious, 
    isEditable = false, 
    onDelete, 
    onEdit,
    onBack 
}: PhotoDisplayProps) {
    
    // Menu items cho dropdown
    const menuItems = isEditable ? [
        { label: "Edit", onClick: () => onEdit?.(), variant: "default" as const },
        { label: "Delete", onClick: () => onDelete?.(), variant: "danger" as const }
    ] : [];

    return (
        <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            padding: "1rem",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5"
        }}>
            {/* Header với icon buttons */}
            <div style={{ 
                width: "100%", 
                maxWidth: `${width}px`,
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                marginBottom: "0.5rem",
                padding: "0.5rem"
            }}>
                <button
                    onClick={onBack}
                    style={{
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        backgroundColor: "white",
                        cursor: "pointer",
                        fontSize: "18px",
                        color: "#666",
                        transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f0f0f0";
                        e.currentTarget.style.borderColor = "#999";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.borderColor = "#ddd";
                    }}
                    aria-label="Back to photos"
                >
                    ←
                </button>
                
                {isEditable && menuItems.length > 0 && (
                    <DropdownMenu items={menuItems} />
                )}
            </div>

            {/* Image Container với navigation overlays */}
            <div style={{ 
                position: "relative", 
                width: "100%", 
                maxWidth: `${width}px`,
                marginBottom: "0.5rem"
            }}>
                {/* Previous Button (left side) */}
                {totalPhotos > 1 && onPrevious && (
                    <button
                        onClick={onPrevious}
                        style={{
                            position: "absolute",
                            left: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "20px",
                            zIndex: 10,
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                        }}
                        aria-label="Previous photo"
                    >
                        ‹
                    </button>
                )}

                <Image 
                    src={`https://picsum.photos/${width}/${height}`} 
                    alt={photo.title} 
                    width={width} 
                    height={height}
                    style={{ 
                        width: "100%", 
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                    priority
                />

                {/* Next Button (right side) */}
                {totalPhotos > 1 && onNext && (
                    <button
                        onClick={onNext}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "none",
                            borderRadius: "50%",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "20px",
                            zIndex: 10,
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.7)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.5)";
                            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                        }}
                        aria-label="Next photo"
                    >
                        ›
                    </button>
                )}
            </div>

            {/* Photo Info */}
            <div style={{ 
                width: "100%", 
                maxWidth: `${width}px`,
                textAlign: "center",
                padding: "0 0.5rem"
            }}>
                <h2 style={{ marginBottom: "0.25rem", fontSize: "1.2rem" }}>{photo.title}</h2>
                <p style={{ color: "#666", fontSize: "0.85rem" }}>
                    {currentPhotoIndex} / {totalPhotos}
                </p>
            </div>
        </div>
    );
}