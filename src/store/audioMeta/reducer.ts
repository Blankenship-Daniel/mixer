import { AudioTypes } from './types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case AudioTypes.SET_AUDIO_META:
      return [...state, ...action.payload];
    case AudioTypes.DELETE_AUDIO_META:
      return state.filter(meta => meta.id !== action.payload);
    default:
      return state;
  }
};

export { reducer as audioMetaReducer };
