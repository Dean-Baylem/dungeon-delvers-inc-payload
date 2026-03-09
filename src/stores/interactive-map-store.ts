import { InteractiveMapPinType } from '@/types/interactiveMap/interactiveMapPinType';
import { createStore } from 'zustand';

export type MapState = {
  mapLoading: boolean;
  newMapPin: boolean;
  mapPinList: Array<InteractiveMapPinType>;
};

export type MapActions = {
  setNewMapPin: (value: boolean) => void;
  handleAddNewPin: (pinData: InteractiveMapPinType) => void;
};

export type InteractiveMapStore = MapState & MapActions;

export const defaultInitState: MapState = {
  mapLoading: true,
  newMapPin: false,
  mapPinList: [],
};

export const createInteractiveMapStore = (initState: MapState = defaultInitState) => {
  return createStore<InteractiveMapStore>()((set) => ({
    ...initState,

    // State Handling Functions
    setNewMapPin: (value: boolean) => {
      set((state) => ({ ...state, newMapPin: value }));
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
        set((state) => ({
          mapPinList: [...state.mapPinList, newPin],
        }));
      } catch (error) {
        console.error('Error Creating Pin');
        alert('Error Creating Pin. Please try again later.');
      }
    },
  }));
};
