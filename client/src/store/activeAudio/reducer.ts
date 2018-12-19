import { ActiveAudioTypes } from './types';

const initialState = {
  id: null,
  event: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActiveAudioTypes.SET_ACTIVE_AUDIO:
      return { ...state, id: action.payload.id, event: action.payload.event };
    default:
      return state;
  }
};

export { reducer as activeAudioReducer };
