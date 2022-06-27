export interface Comment {
  _id: string;
  username: string;
  text: string;
}


export interface Track {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: Comment[]
}

export interface TrackState {
  tracks: Track[];
  error: string;
}

export enum TrackActionTypes {
  FETCH_TRACKS = 'FETCH_TRACKS',
  FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTrackAction {
  type: TrackActionTypes.FETCH_TRACKS;
  payload: Track[]
}

interface FetchTrackErrorAction {
  type: TrackActionTypes.FETCH_TRACKS_ERROR;
  payload: string;
}

export type TrackAction = FetchTrackAction | FetchTrackErrorAction;
