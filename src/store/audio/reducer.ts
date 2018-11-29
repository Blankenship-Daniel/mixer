import { AudioTypes } from './types';

const reducer = (state = [], action) => {
  switch (action.type) {
    case AudioTypes.SET_AUDIO_META:
      return [...state, action.meta];
    case AudioTypes.DELETE_AUDIO_META:
      return state.filter(meta => meta.uuid !== action.uuid);
    default:
      return state;
  }
};

export { reducer as audioMetaReducer };
