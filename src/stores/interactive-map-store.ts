import { InteractiveMapPinType } from '@/types/interactiveMap/interactiveMapPinType';
import { createStore } from 'zustand';

export type MapState = {
  mapLoading: boolean;
  sideBarExpanded: boolean;
  addPinActive: boolean;
  isCreatingPin: boolean;
  mapPinList: Array<InteractiveMapPinType>;
};

export type MapActions = {
  // Sidebar state
  setSideBarExpanded: (value: boolean) => void;

  // Add Pin State
  setAddPinActive: (value: boolean) => void;
  toggleAddPinActive: () => void;

  // Pin CRUD
  setMapPinList: (value: Array<InteractiveMapPinType>) => void;
  setIsCreatingPin: (value: boolean) => void;
  handleAddNewPin: (pinData: InteractiveMapPinType) => void;
};

export type InteractiveMapStore = MapState & MapActions;

export const defaultInitState: MapState = {
  mapLoading: true,
  sideBarExpanded: false,
  addPinActive: false,
  isCreatingPin: false,
  mapPinList: [],
};

export const createInteractiveMapStore = (initState: MapState = defaultInitState) => {
  return createStore<InteractiveMapStore>()((set) => ({
    ...initState,

    // State Handling Functions
    setSideBarExpanded: (value: boolean) => {
      set((state) => ({ ...state, sideBarExpanded: value }));
    },

    // State Handling Functions
    setAddPinActive: (value: boolean) => {
      set((state) => ({ ...state, addPinActive: value }));
    },

    toggleAddPinActive: () => {
      console.log('Toggle Add Pin Active');
      set((state) => ({ ...state, addPinActive: !state.addPinActive }));
    },

    setMapPinList: (value: Array<InteractiveMapPinType>) => {
      set((state) => ({ ...state, mapPinList: value }));
    },

    setIsCreatingPin: (value: boolean) => {
      set((state) => ({ ...state, isCreatingPin: value }));
    },

    // Pin Related Functions
    handleAddNewPin: async (pinData: InteractiveMapPinType) => {
      console.log('Adding New Pin');
      console.log(pinData);
      try {
        const response = await fetch('/api/maps/pins', {
          method: 'POST',
          body: JSON.stringify(pinData),
        });
        const newPin = await response.json();

        if (!response.ok) throw new Error('Error Creating Pin');

        set((state) => ({
          mapPinList: [...state.mapPinList, newPin],
        }));
      } catch (error) {
        console.error('Error Creating Pin');
        alert('Error Creating Pin. Please try again later.');
      } finally {
        set((state) => ({ ...state, isCreatingPin: false }));
      }
    },
  }));
};
