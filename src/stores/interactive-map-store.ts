import { createStore } from 'zustand';

export type MapState = {};

export type MapActions = {};

export type InteractiveMapStore = MapState & MapActions;

export const defaultInitState: MapState = {};

export const createInteractiveMapStore = (initState: MapState = defaultInitState) => {
  return createStore<InteractiveMapStore>()((set) => ({
    ...initState,
  }));
};
