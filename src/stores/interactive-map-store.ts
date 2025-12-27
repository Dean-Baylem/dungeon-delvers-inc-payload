import { createStore } from 'zustand';
import { fetcher } from '@/lib/api/fetcher';
import { FilteredMapRegion } from '@/types/filteredMapRegion';
import { FilteredMapIcons } from '@/types/filteredMapIcons';

export type MapState = {
  isNewIcon: boolean;
  showRegionForm: boolean;
  displayMode: string;
  disabledInteraction: boolean;
  newRegionCoordinates: [number, number][];
  newIconPos: { xPoint: number; yPoint: number };
  newIconForm: boolean;
  storedMapIcons: Array<{
    name: string;
    xPoint: number;
    yPoint: number;
    pinType: string;
    pinSummary: string;
    linkedMap: number;
    id: number
  }>;
  allMapRegions: FilteredMapRegion[];
  editRegion: { id: number; coordinates: Array<{ xPoint: number; yPoint: number }> };
};

export type MapActions = {
  handleSetAllMapRegionData: (newData: FilteredMapRegion[]) => void;
  handleRegionDisplayToggle: () => void;
  handleMapStateChange: (newState: string) => void;
  handleShowRegionForm: (newState: boolean) => void;
  handleCancelNewPinForm: () => void;
  handleSetNewRegionCoordinates: (newPolygon: [number, number][]) => void;
  handleEditRegionState: (newState: {
    id: number;
    coordinates: Array<{ xPoint: number; yPoint: number }>;
  }) => void;
  handleNewIconPosState: (newState: { xPoint: number; yPoint: number }) => void;
  handleNewIconFormState: (newState: boolean) => void;
  handleUpdateStoredMapIcons: (
    newState: Array<{
      name: string;
      xPoint: number;
      yPoint: number;
      pinType: string;
      pinSummary: string;
      linkedMap: number;
      id: number
    }>,
  ) => void;
};

export type InteractiveMapStore = MapState & MapActions;

export const defaultInitState: MapState = {
  showRegionForm: false,
  displayMode: '',
  isNewIcon: false,
  disabledInteraction: false,
  newRegionCoordinates: [],
  newIconPos: { xPoint: 0, yPoint: 0 },
  newIconForm: false,
  allMapRegions: [],
  storedMapIcons: [],
  editRegion: { id: 0, coordinates: [{ xPoint: 0, yPoint: 0 }] },
};

export const createInteractiveMapStore = (initState: MapState = defaultInitState) => {
  return createStore<InteractiveMapStore>()((set) => ({
    ...initState,
    handleMapStateChange: (newState) =>
      set((state) => ({
        displayMode: state.displayMode === newState ? '' : newState,
        newRegionCoordinates: [],
        editRegion: { id: 0, coordinates: [] },
      })),
    handleRegionDisplayToggle: () =>
      set((state) => ({
        displayMode: state.displayMode === 'showRegions' ? '' : 'showRegions',
      })),
    handleSetNewRegionCoordinates: (newPolygon) =>
      set((state) => ({
        newRegionCoordinates: newPolygon,
      })),
    handleCancelNewPinForm: () => set(() => ({ isNewIcon: false, disabledInteraction: false })),
    handleSetAllMapRegionData: (newData) =>
      set(() => ({
        allMapRegions: newData,
      })),
    handleShowRegionForm: (newState) => set(() => ({ showRegionForm: newState })),
    handleEditRegionState: (newState) => set(() => ({ editRegion: newState })),
    handleNewIconFormState: (newState) => set(() => ({ newIconForm: newState })),
    handleNewIconPosState: (newState) => set(() => ({ newIconPos: newState })),
    handleUpdateStoredMapIcons: (newState) => set(() => ({ storedMapIcons: newState })),
  }));
};
