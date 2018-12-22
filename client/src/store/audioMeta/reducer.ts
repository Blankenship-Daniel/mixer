import { AudioTypes } from './types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case AudioTypes.SET_AUDIO_META:
      return [...state, ...action.payload];
    case AudioTypes.DELETE_AUDIO_META:
      return state.filter(meta => meta.id !== action.payload);
    case AudioTypes.EDIT_AUDIO_META:
      return state.map(meta =>
        meta.id === action.payload.id ? { ...meta, ...action.payload } : meta,
      );
    default:
      return state;
  }
};

export { reducer as audioMetaReducer };
