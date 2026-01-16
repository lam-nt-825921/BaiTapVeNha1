"use client";

import { useState, useRef, useEffect } from "react";

export interface DropdownMenuItem {
    label: string;
    onClick: () => void;
    variant?: "default" | "danger";
}

export interface DropdownMenuProps {
    items: DropdownMenuItem[];
    trigger?: React.ReactNode;
}

export default function DropdownMenu({ items, trigger }: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={menuRef} style={{ position: "relative", display: "inline-block" }}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    borderRadius: "4px",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#666",
                    transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f0f0f0";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                }}
                aria-label="Menu"
            >
                {trigger || "⋯"}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        marginTop: "4px",
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        minWidth: "150px",
                        zIndex: 1000,
                        overflow: "hidden"
                    }}
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                            style={{
                                width: "100%",
                                padding: "10px 16px",
                                textAlign: "left",
                                border: "none",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                fontSize: "14px",
                                color: item.variant === "danger" ? "#f44336" : "#333",
                                transition: "background-color 0.2s",
                                borderBottom: index < items.length - 1 ? "1px solid #f0f0f0" : "none"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#f5f5f5";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
