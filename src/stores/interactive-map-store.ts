import { InteractiveHighlightType } from '@/types/interactiveMap/interactiveHighlightType';
import { InteractiveMapPinType } from '@/types/interactiveMap/interactiveMapPinType';
import { createStore } from 'zustand';

export type MapState = {
  // Map States
  mapLoading: boolean;

  // Sidebar States
  sideBarExpanded: boolean;
  sideBarHighlight?: InteractiveHighlightType;

  // Map Pin States
  addPinActive: boolean;
  isCreatingPin: boolean;
  isEditingPin: boolean;
  mapPinList: Array<InteractiveMapPinType>;
};

export type MapActions = {
  // Map State
  setMapLoading: (value: boolean) => void;

  // Sidebar state
  setSideBarExpanded: (value: boolean) => void;
  setSideBarHighlight: (value: InteractiveHighlightType | undefined) => void;

  // Add Pin State
  setAddPinActive: (value: boolean) => void;
  setIsEditingPin: (value: boolean) => void;
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
  sideBarHighlight: undefined,
  addPinActive: false,
  isCreatingPin: false,
  isEditingPin: false,
  mapPinList: [],
};

export const createInteractiveMapStore = (initState: MapState = defaultInitState) => {
  return createStore<InteractiveMapStore>()((set) => ({
    ...initState,

    setMapLoading: (value: boolean) => {
      set((state) => ({ ...state, mapLoading: value }));
    },

    // Sidebar State Handling Functions
    setSideBarExpanded: (value: boolean) => {
      set((state) => ({ ...state, sideBarExpanded: value }));
    },

    setSideBarHighlight: (value: InteractiveHighlightType | undefined) => {
      set((state) => ({ ...state, sideBarHighlight: value }));
    },

    // MAp Pin State Handling Functions
    setAddPinActive: (value: boolean) => {
      set((state) => ({ ...state, addPinActive: value }));
    },

    toggleAddPinActive: () => {
      console.log('Toggle Add Pin Active');
      set((state) => ({ ...state, addPinActive: !state.addPinActive }));
    },

    setIsEditingPin: (value: boolean) => {
      set((state) => ({ ...state, isEditingPin: value }));
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
