import { Album } from "@/types/types";
import { useState, useCallback, useEffect } from "react";


export function useAlbums() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAlbums = useCallback(async () => {
        setLoading(true);
        setError(null);
    }, []);

    
}