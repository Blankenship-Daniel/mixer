import { AudioTypes } from './types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case AudioTypes.SET_AUDIO_META:
      return [...state, ...action.payload];
    case AudioTypes.DELETE_AUDIO_META:
      return state.filter(meta => meta.id !== action.payload);
    case AudioTypes.EDIT_AUDIO_META:
      state.forEach(meta => {
        if (meta.id === action.payload.uuid) {
          meta.startTime = action.payload.startTime;
          meta.endTime = action.payload.endTime;
        }
      });
      return state;
    default:
      return state;
  }
};

export { reducer as audioMetaReducer };
