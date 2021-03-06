import {Track} from "./track";

export interface PlayerState {
  active: null | Track;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum PlayerActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_VOLUME = 'SET_VOLUME',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
}

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface SetActiveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: Track;
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

export type PLayerAction =
  PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetVolumeAction
  | SetCurrentTimeAction;
