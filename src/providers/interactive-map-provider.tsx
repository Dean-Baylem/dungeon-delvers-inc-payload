'use client';
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import { type InteractiveMapStore, createInteractiveMapStore } from "@/stores/interactive-map-store";

export type InteractiveMapStoreApi = ReturnType<typeof createInteractiveMapStore>

export const InteractiveMapContext = createContext<InteractiveMapStoreApi | undefined>(
    undefined,
);

export interface InteractiveMapProviderProps {
    children: ReactNode
}

export const InteractiveMapProvider = ({
    children,
}: InteractiveMapProviderProps) => {
    const mapRef = useRef<InteractiveMapStoreApi | null>(null);
    if (mapRef.current === null) {
        mapRef.current = createInteractiveMapStore();
    }

    return (
        <InteractiveMapContext.Provider value={mapRef.current}>
            {children}
        </InteractiveMapContext.Provider>
    )
}

export const useInteractiveMapStore = <T,>(
    selector: (map: InteractiveMapStore) => T,
): T => {
    const interactiveMapContext = useContext(InteractiveMapContext);

    if (!interactiveMapContext) {
        throw new Error('useInteractiveMapStore must be used within InteractiveMapProvider');
    }

    return useStore(interactiveMapContext, selector);
}